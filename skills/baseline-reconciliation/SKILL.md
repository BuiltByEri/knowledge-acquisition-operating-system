---
kaos_skill:
  name: "Baseline Reconciliation"
  id: "baseline-reconciliation"
  version: "1.0.0"
  specification_version: "1.0.0"
  compatible_kaos_versions: [">=1.0.0 <2.0.0"]
  skill_state: "Approved"
  automation_readiness: "assisted"
  capability: "baseline-reconciliation"
  lifecycle_stage: { stage_id: "baseline-reconciliation", stage_name: "Baseline Reconciliation" }
  owner: "KAOS Core"
  description: "Compare captured knowledge objects against the governed baseline to identify existing matches, gaps, duplicates, variants, source overlap, and reconciliation risks."
  depends_on_skills: ["knowledge-inventory"]
  prerequisites:
    - { artifact_id: "artifact.knowledge_inventory", required: true }
  consumes:
    - { artifact_id: "manifest.active_source_acquisition", type: "source_manifest", required: true, source: "active source manifest" }
    - { artifact_id: "artifact.knowledge_inventory", type: "artifact", required: true, source: "artifacts/{SOURCE_CODE}_KNOWLEDGE_INVENTORY.md" }
    - { artifact_id: "repository.governed_baseline", type: "structured_data", required: true, source: "current governed baseline" }
  produces:
    - { artifact_id: "artifact.baseline_reconciliation", type: "artifact", required: true, destination: "artifacts/{SOURCE_CODE}_BASELINE_RECONCILIATION.md" }
    - { artifact_id: "manifest.baseline_reconciliation_state", type: "source_manifest", required: true, destination: "active source manifest" }
  requires_approval: false
  approval_gate: null
  permitted_status_values: ["Not Started", "In Progress", "Ready", "Blocked", "Completed"]
  permitted_decision_values: ["Approved", "Approved With Notes", "Rejected", "Human Review Required", "Not Applicable"]
  next_skill: "editorial-triage"
  conditional_next_skills:
    - { condition: "Knowledge Inventory is missing or contradictory.", decision_value: "Human Review Required", status_value: "Blocked", next_skill: "knowledge-inventory", reason: "Reconciliation requires a valid inventory." }
    - { condition: "Baseline state is unavailable or too stale for comparison.", decision_value: "Human Review Required", status_value: "Blocked", next_skill: null, reason: "A current baseline is required." }
  extensions: {}
---

# Baseline Reconciliation

## 1. Purpose
Compare captured knowledge objects with the existing governed baseline.

## 2. When to Use
Use after Knowledge Inventory is complete.

## 3. Prerequisites
Knowledge Inventory and current baseline context must be available.

## 4. Inputs
Inputs include inventory artifact, governed baseline data, aliases, identifiers, duplicate signals, and source overlap notes.

## 5. Required Reading
Read KAOS Core, Knowledge Inventory, Acquisition Strategy, and relevant baseline documentation.

## 6. Repository Expectations
The repository contains governed baseline data for comparison. This skill does not modify it.

## 7. Execution Steps
Compare inventory objects to baseline entities and source records, identify matches, gaps, duplicate candidates, variants, overlap, count differences, and reconciliation blockers.

## 8. Validation Requirements
Validate count reconciliation, match rationale, duplicate evidence, and baseline snapshot notes.

## 9. Success Criteria
Editorial Triage receives a clear reconciliation picture without implementation changes.

## 10. Outputs
Outputs are the Baseline Reconciliation artifact and narrow manifest update.

## 11. Status Values
Use only approved KAOS status values.

## 12. Decision Values
Use only approved KAOS decision values.

## 13. Decision Gates
This skill has no approval gate.

## 14. Guardrails
Do not make editorial decisions, create canonical entities, implement data, or certify the source.

## 15. Common Failure Modes
Failure modes include stale baseline, ambiguous matches, missing identifiers, and duplicate risk not recorded.

## 16. Artifacts Produced
`artifact.baseline_reconciliation` is produced only by this skill.

## 17. Exit Criteria
Exit when reconciliation metrics, risks, status, decision, and next transition are documented.

## 18. Related Skills
Previous skill: `knowledge-inventory`. Next skill: `editorial-triage`.

## 19. Version History
| Version | State | Notes |
|---|---|---|
| 1.0.0 | Approved | Initial public KAOS release. |
| 0.9.0 | Under Review | Initial public KAOS candidate. |
