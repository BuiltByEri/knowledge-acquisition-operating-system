---
kaos_core_document:
  name: "KAOS Skill Specification"
  id: "kaos-skill-specification"
  version: "1.0.0"
  document_type: "core-specification"
  owner: "KAOS Core"
  status: "Approved"
  last_updated: "2026-07-26"
  approved_by: "Product Review"
  compatible_kaos_versions:
    - ">=1.0.0 <2.0.0"
---

# KAOS Skill Specification

Specification version: `1.0.0`

Status: `Approved`

Owner: `KAOS Core`

## 1. Purpose and Scope

The KAOS Skill Specification defines the mandatory contract that every Knowledge Acquisition Operating System skill must implement.

KAOS skills are executable methodology. They convert repeatable knowledge acquisition work into reusable, versioned instructions that can be coordinated by an orchestrator and audited through artifacts. Skills are not general documentation, one-off prompts, source-specific reports, or repository workflow scripts.

KAOS is implementation-agnostic. It does not require a specific database, AI model, programming language, cloud provider, vector store, or orchestration platform.

This specification applies to the KAOS Skill Library stages:

1. Source Boundary Audit (`source-boundary-audit`)
2. Acquisition Strategy (`acquisition-strategy`)
3. Knowledge Inventory (`knowledge-inventory`)
4. Baseline Reconciliation (`baseline-reconciliation`)
5. Editorial Triage (`editorial-triage`)
6. Canonical Readiness Review (`canonical-readiness-review`)
7. Implementation Planning (`implementation-planning`)
8. Implementation Approval (`implementation-approval`)
9. Structured Data Implementation (`structured-data-implementation`)
10. Post-Implementation Review (`post-implementation-review`)
11. Source Certification (`source-certification`)
12. Source Completion (`source-completion`)

Operational repository actions such as commit, push, merge, and review requests are not KAOS lifecycle stages.

## 2. Non-Goals

This specification does not:

- Define source-specific execution.
- Replace skill instructions.
- Replace artifact templates.
- Replace source profiles or manifests.
- Define repository workflow execution.
- Require graph storage for provenance.
- Claim full automation.

## 3. Architecture

KAOS uses this public structure:

```text
core/
skills/
docs/
artifact-templates/
source-profiles/
orchestrator/
examples/
schemas/
scripts/
tests/
```

Core owns the lifecycle, metadata contract, status and decision model, artifact ownership rules, approval-gate semantics, validation expectations, and compatibility rules.

## 4. Required Skill Metadata

Every skill must begin with a machine-readable YAML block:

```yaml
---
kaos_skill:
  name: ""
  id: ""
  version: ""
  specification_version: ""
  compatible_kaos_versions: []
  skill_state: ""
  automation_readiness: ""
  capability: ""
  lifecycle_stage:
    stage_id: ""
    stage_name: ""
  owner: ""
  description: ""
  depends_on_skills: []
  prerequisites: []
  consumes: []
  produces: []
  requires_approval: false
  approval_gate: null
  permitted_status_values: []
  permitted_decision_values: []
  next_skill: null
  conditional_next_skills: []
  extensions: {}
---
```

`skill_state` describes the reusable skill definition. It must not be used as acquisition status.

Approved public skills use `skill_state: "Approved"`. Future candidate or draft skills must use the appropriate pre-release state until Product Review approves them.

## 5. Status and Decision Model

Approved KAOS status values:

- `Not Started`
- `In Progress`
- `Ready`
- `Blocked`
- `Completed`

Approved KAOS decision values:

- `Approved`
- `Approved With Notes`
- `Rejected`
- `Human Review Required`
- `Not Applicable`

Status answers where work is. Decision answers what was judged. Record-level outcomes and candidate-level outcomes must remain separate.

## 6. Approval Gates

KAOS v1.0.0 approval gates exist only for:

- `gate.canonical-readiness-review.canonical-approval`
- `gate.implementation-approval.implementation-authorization`
- `gate.source-certification.certification-approval`

AI may assist with review preparation. Human approval gates remain authoritative.

## 7. Artifact Ownership

Every artifact must have exactly one producing skill. Downstream skills may consume artifacts but must not rewrite upstream decisions or silently alter ownership.

Terminal artifacts may have no downstream consumer.

## 8. Manifest Behavior

The active source manifest records lifecycle state, governance decisions, artifact references, transition notes, and blocker notes for one source acquisition.

A skill may update only the manifest fields it owns for the current stage, including current stage state, status, decision, produced artifact reference, next route, backward route, blocker reason, and transition reason. A skill must not overwrite fields owned by another stage or alter upstream decisions through manifest updates.

Manifest state must correspond to produced artifacts. If a skill stops, fails, or routes backward, the manifest must not falsely advance the lifecycle. Backward routing must record the destination stage and reason.

KAOS does not require a specific manifest storage format, database, or orchestration platform.

## 9. Stop-Condition Semantics

A stop condition prevents a skill from producing an authoritative completion outcome for the next downstream stage. It must identify the blocking condition, preserve completed analysis, avoid unauthorized downstream routing, and route backward or to human review where the skill contract defines that route.

A stop condition must not silently advance status. It must not be treated as an approval denial unless the governing approval skill explicitly records that decision.

KAOS distinguishes these concepts:

- Stop condition: work cannot safely produce an authoritative downstream outcome.
- Approval denial: an approval gate rejects or withholds required authority.
- Remediation requirement: reviewed work needs correction before the lifecycle proceeds.
- Execution error: a technical or operational failure interrupts execution.

These concepts do not create additional lifecycle stages.

## 10. Required Human-Readable Sections

Every skill must include these sections in order:

1. Purpose
2. When to Use
3. Prerequisites
4. Inputs
5. Required Reading
6. Repository Expectations
7. Execution Steps
8. Validation Requirements
9. Success Criteria
10. Outputs
11. Status Values
12. Decision Values
13. Decision Gates
14. Guardrails
15. Common Failure Modes
16. Artifacts Produced
17. Exit Criteria
18. Related Skills
19. Version History

## 11. Lifecycle Rules

The default lifecycle is:

```text
source-boundary-audit
-> acquisition-strategy
-> knowledge-inventory
-> baseline-reconciliation
-> editorial-triage
-> canonical-readiness-review
-> implementation-planning
-> implementation-approval
-> structured-data-implementation
-> post-implementation-review
-> source-certification
-> source-completion
```

Canonical Readiness Review is conditional. If no proposed canonical entities exist, Editorial Triage may route directly to Implementation Planning when approved work remains.

Source Completion is terminal inside the KAOS Skill Library.

## 12. Version-History Rules

Every released skill version requires a Version History entry. Status changes that affect the published artifact must be recorded. Wording-only corrections may follow the documented versioning policy, while material changes require the appropriate semantic version increment.

Historical version rows must not be rewritten to disguise prior states. Public `0.9.0` candidate history must remain distinct from any approved public `1.0.0` release history.

## 13. Design Principles

The design principles in `docs/DESIGN_PRINCIPLES.md` are normative for this release. In particular:

- AI accelerates; humans decide.
- Canonical knowledge is governed.
- Provenance is preserved.
- Source conflict is preserved, not silently flattened.
- Acquisition is repeatable.
- Approval boundaries are explicit.
- Downstream outputs must be reproducible.
- The framework is implementation-agnostic.

## 14. Version History

| Version | State | Notes |
|---|---|---|
| 1.0.0 | Approved | Initial public KAOS release. |
| 0.9.0 | Under Review | Initial public KAOS candidate derived through controlled generalization of the approved private methodology. |
