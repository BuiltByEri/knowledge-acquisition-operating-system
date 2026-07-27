#!/usr/bin/env node
// Validates the expected KAOS 1.0.0 release skill set and selected
// lifecycle metadata. This is not a general-purpose YAML parser or JSON
// Schema validation engine.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const skillsDir = path.join(root, "skills");

const expectedSkills = [
  { id: "source-boundary-audit", name: "Source Boundary Audit", next: "acquisition-strategy", approval: false },
  { id: "acquisition-strategy", name: "Acquisition Strategy", next: "knowledge-inventory", approval: false },
  { id: "knowledge-inventory", name: "Knowledge Inventory", next: "baseline-reconciliation", approval: false },
  { id: "baseline-reconciliation", name: "Baseline Reconciliation", next: "editorial-triage", approval: false },
  { id: "editorial-triage", name: "Editorial Triage", next: "canonical-readiness-review", approval: false },
  { id: "canonical-readiness-review", name: "Canonical Readiness Review", next: "implementation-planning", approval: true, gate: "gate.canonical-readiness-review.canonical-approval" },
  { id: "implementation-planning", name: "Implementation Planning", next: "implementation-approval", approval: false },
  { id: "implementation-approval", name: "Implementation Approval", next: "structured-data-implementation", approval: true, gate: "gate.implementation-approval.implementation-authorization" },
  { id: "structured-data-implementation", name: "Structured Data Implementation", next: "post-implementation-review", approval: false },
  { id: "post-implementation-review", name: "Post-Implementation Review", next: "source-certification", approval: false },
  { id: "source-certification", name: "Source Certification", next: "source-completion", approval: true, gate: "gate.source-certification.certification-approval" },
  { id: "source-completion", name: "Source Completion", next: null, approval: false }
];

const requiredSections = [
  "Purpose",
  "When to Use",
  "Prerequisites",
  "Inputs",
  "Required Reading",
  "Repository Expectations",
  "Execution Steps",
  "Validation Requirements",
  "Success Criteria",
  "Outputs",
  "Status Values",
  "Decision Values",
  "Decision Gates",
  "Guardrails",
  "Common Failure Modes",
  "Artifacts Produced",
  "Exit Criteria",
  "Related Skills",
  "Version History"
];

const expectedStatusValues = ["Not Started", "In Progress", "Ready", "Blocked", "Completed"];
const expectedDecisionValues = ["Approved", "Approved With Notes", "Rejected", "Human Review Required", "Not Applicable"];
const problems = [];
const producedArtifacts = new Map();
const transitionEdges = new Set();

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function readSkill(skillId) {
  const file = path.join(skillsDir, skillId, "SKILL.md");
  if (!fs.existsSync(file)) {
    problems.push(`Missing skill file: ${path.relative(root, file)}`);
    return null;
  }
  const text = fs.readFileSync(file, "utf8");
  const frontmatter = text.match(/^---\n([\s\S]*?)\n---\n/);
  if (!frontmatter) {
    problems.push(`Missing YAML front matter: ${path.relative(root, file)}`);
    return null;
  }
  return { file, text, yaml: frontmatter[1] };
}

function scalar(yaml, key) {
  const match = yaml.match(new RegExp(`^\\s*${key}:\\s*(?:"([^"]*)"|(null)|([^\\n#]+))`, "m"));
  if (!match) return undefined;
  if (match[2] === "null") return null;
  return (match[1] ?? match[3]).trim();
}

function inlineScalar(yaml, key) {
  const match = yaml.match(new RegExp(`\\b${key}:\\s*(?:"([^"]*)"|(null)|([^,}\\n]+))`, "m"));
  if (!match) return undefined;
  if (match[2] === "null") return null;
  return (match[1] ?? match[3]).trim();
}

function listLine(yaml, key) {
  const match = yaml.match(new RegExp(`^\\s*${key}:\\s*\\[([^\\]]*)\\]`, "m"));
  if (!match) return [];
  return match[1]
    .split(",")
    .map((item) => item.trim().replace(/^"|"$/g, ""))
    .filter(Boolean);
}

function blockBetween(yaml, start, end) {
  const match = yaml.match(new RegExp(`^\\s*${start}:\\n([\\s\\S]*?)^\\s*${end}:`, "m"));
  return match ? match[1] : "";
}

function artifactIds(block) {
  return [...block.matchAll(/artifact_id:\s*"([^"]+)"/g)].map((match) => match[1]);
}

function conditionalRoutes(yaml) {
  return [...blockBetween(yaml, "conditional_next_skills", "extensions").matchAll(/\{([^}]+)\}/g)].map((match) => match[1]);
}

function routeNext(route) {
  const match = route.match(/next_skill:\s*(?:"([^"]+)"|(null))/);
  if (!match) return undefined;
  return match[2] === "null" ? null : match[1];
}

function hasConditionalRoute(routes, { condition, decision, status, next }) {
  const nextPattern = next === null
    ? /next_skill:\s*null/
    : new RegExp(`next_skill:\\s*"${escapeRegExp(next)}"`);
  return routes.some((route) => (
    condition.test(route) &&
    route.includes(`decision_value: "${decision}"`) &&
    route.includes(`status_value: "${status}"`) &&
    nextPattern.test(route)
  ));
}

function addTransition(from, to) {
  if (to) transitionEdges.add(`${from}->${to}`);
}

function checkSections(skill) {
  const headings = [...skill.text.matchAll(/^##\s+\d+\.\s+(.+)$/gm)].map((match) => match[1].trim());
  requiredSections.forEach((section, index) => {
    if (headings[index] !== section) {
      problems.push(`${path.relative(root, skill.file)} section ${index + 1} expected "${section}" but found "${headings[index] ?? "missing"}"`);
    }
  });
}

function checkTransition(skill, expected) {
  const next = scalar(skill.yaml, "next_skill");
  if (next !== expected.next) {
    problems.push(`${expected.id} next_skill expected ${expected.next ?? "null"} but found ${next ?? "missing"}`);
  }
  addTransition(expected.id, next);
  for (const route of conditionalRoutes(skill.yaml)) {
    addTransition(expected.id, routeNext(route));
  }
}

function checkApproval(skill, expected) {
  const approval = scalar(skill.yaml, "requires_approval") === "true";
  if (approval !== expected.approval) {
    problems.push(`${expected.id} approval flag expected ${expected.approval} but found ${approval}`);
  }
  const gate = scalar(skill.yaml, "gate_id");
  if (expected.gate && gate !== expected.gate) {
    problems.push(`${expected.id} gate expected ${expected.gate} but found ${gate ?? "missing"}`);
  }
  if (!expected.gate && gate) {
    problems.push(`${expected.id} declares unexpected gate ${gate}`);
  }
}

function checkArtifacts(skill, expected) {
  const produces = artifactIds(blockBetween(skill.yaml, "produces", "requires_approval"));
  for (const artifact of produces.filter((id) => id.startsWith("artifact."))) {
    const existing = producedArtifacts.get(artifact);
    if (existing) {
      problems.push(`${artifact} produced by both ${existing} and ${expected.id}`);
    }
    producedArtifacts.set(artifact, expected.id);
  }
}

function checkVocabulary(skill, expected) {
  const statuses = listLine(skill.yaml, "permitted_status_values");
  const decisions = listLine(skill.yaml, "permitted_decision_values");
  if (statuses.join("|") !== expectedStatusValues.join("|")) {
    problems.push(`${expected.id} status values differ from KAOS Core`);
  }
  if (decisions.join("|") !== expectedDecisionValues.join("|")) {
    problems.push(`${expected.id} decision values differ from KAOS Core`);
  }
}

function checkNoChangeRoutes(skill, expected) {
  const routes = conditionalRoutes(skill.yaml);

  if (expected.id === "knowledge-inventory") {
    if (routes.some((route) => /No knowledge objects exist/.test(route) && /next_skill:\s*"source-completion"/.test(route))) {
      problems.push("knowledge-inventory empty-inventory route must not bypass Source Certification");
    }
    if (!hasConditionalRoute(routes, {
      condition: /No knowledge objects exist/,
      decision: "Not Applicable",
      status: "Completed",
      next: "source-certification"
    })) {
      problems.push("knowledge-inventory must route empty inventories to source-certification");
    }
  }

  if (expected.id === "implementation-approval") {
    if (routes.some((route) => /No production implementation is intentionally authorized/.test(route) && /next_skill:\s*null/.test(route))) {
      problems.push("implementation-approval intentional no-implementation route must not terminate");
    }
    if (!hasConditionalRoute(routes, {
      condition: /No production implementation is intentionally authorized/,
      decision: "Not Applicable",
      status: "Completed",
      next: "post-implementation-review"
    })) {
      problems.push("implementation-approval must route intentional no-implementation outcomes to post-implementation-review");
    }
  }

  if (expected.id === "post-implementation-review") {
    if (!/depends_on_skills:\s*\["implementation-approval",\s*"structured-data-implementation"\]/.test(skill.yaml)) {
      problems.push("post-implementation-review must support implementation-approval and structured-data-implementation inputs");
    }
    if (!/artifact_id:\s*"artifact\.structured_data_implementation_report"[^}\n]*required:\s*false/.test(skill.yaml)) {
      problems.push("post-implementation-review must not require structured_data_implementation_report for authorized no-change scope");
    }
  }

  if (expected.id === "source-certification") {
    if (!/depends_on_skills:\s*\["knowledge-inventory",\s*"post-implementation-review"\]/.test(skill.yaml)) {
      problems.push("source-certification must support empty-inventory and post-implementation-review entry paths");
    }
    if (!/artifact_id:\s*"artifact\.acquisition_strategy"[^}\n]*required:\s*true/.test(skill.yaml)) {
      problems.push("source-certification must require acquisition_strategy for empty-inventory certification");
    }
    if (!/artifact_id:\s*"artifact\.post_implementation_review"[^}\n]*required:\s*false/.test(skill.yaml)) {
      problems.push("source-certification must not require post_implementation_review for empty-inventory certification");
    }
    if (!/empty[- ]inventory/i.test(skill.text) || !/no implementation required/i.test(skill.text)) {
      problems.push("source-certification must distinguish empty inventory and no implementation required from missing evidence");
    }
  }
}

const existingSkillIds = fs
  .readdirSync(skillsDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();
const expectedIds = expectedSkills.map((skill) => skill.id).sort();
if (existingSkillIds.join("|") !== expectedIds.join("|")) {
  problems.push(`Skill directory set differs. Expected ${expectedIds.join(", ")} but found ${existingSkillIds.join(", ")}`);
}

for (const expected of expectedSkills) {
  const skill = readSkill(expected.id);
  if (!skill) continue;

  if (!skill.yaml.includes("kaos_skill:")) problems.push(`${expected.id} front matter missing kaos_skill root`);
  if (scalar(skill.yaml, "id") !== expected.id) problems.push(`${expected.id} metadata id mismatch`);
  if (scalar(skill.yaml, "name") !== expected.name) problems.push(`${expected.id} metadata name mismatch`);
  if (scalar(skill.yaml, "version") !== "1.0.0") problems.push(`${expected.id} version must be 1.0.0`);
  if (scalar(skill.yaml, "specification_version") !== "1.0.0") problems.push(`${expected.id} specification_version must be 1.0.0`);
  if (scalar(skill.yaml, "skill_state") !== "Approved") problems.push(`${expected.id} skill_state must be Approved`);
  if (inlineScalar(skill.yaml, "stage_id") !== expected.id) problems.push(`${expected.id} stage_id mismatch`);
  if (inlineScalar(skill.yaml, "stage_name") !== expected.name) problems.push(`${expected.id} stage_name mismatch`);
  if (!skill.yaml.includes("compatible_kaos_versions: [\">=1.0.0 <2.0.0\"]")) problems.push(`${expected.id} compatible_kaos_versions mismatch`);

  checkTransition(skill, expected);
  checkApproval(skill, expected);
  checkArtifacts(skill, expected);
  checkVocabulary(skill, expected);
  checkNoChangeRoutes(skill, expected);
  checkSections(skill);
}

const expectedProducedArtifacts = new Set([
  "artifact.source_boundary_audit",
  "artifact.acquisition_strategy",
  "artifact.knowledge_inventory",
  "artifact.baseline_reconciliation",
  "artifact.editorial_triage",
  "artifact.canonical_readiness_review",
  "artifact.implementation_plan",
  "artifact.implementation_approval",
  "artifact.structured_data_implementation_report",
  "artifact.post_implementation_review",
  "artifact.source_certification",
  "artifact.source_completion"
]);

for (const artifact of expectedProducedArtifacts) {
  if (!producedArtifacts.has(artifact)) {
    problems.push(`Missing produced artifact ${artifact}`);
  }
}

if (!fs.existsSync(path.join(root, "core", "KAOS_SKILL_SPECIFICATION.md"))) {
  problems.push("Missing core specification");
}

const requiredPaths = [
  ["knowledge-inventory", "source-certification", "source-completion"],
  ["implementation-approval", "post-implementation-review", "source-certification", "source-completion"],
  ["implementation-approval", "structured-data-implementation", "post-implementation-review", "source-certification", "source-completion"]
];

for (const pathParts of requiredPaths) {
  for (let i = 0; i < pathParts.length - 1; i += 1) {
    const edge = `${pathParts[i]}->${pathParts[i + 1]}`;
    if (!transitionEdges.has(edge)) {
      problems.push(`Missing lifecycle route edge ${edge}`);
    }
  }
}

if (problems.length) {
  console.error("KAOS skill validation failed:");
  for (const problem of problems) console.error(`- ${problem}`);
  process.exit(1);
}

console.log(`KAOS skill validation passed for ${expectedSkills.length} skills.`);
