---
kaos_skill:
  name: "Implementation Planning"
  id: "implementation-planning"
  version: "1.0.0"
  specification_version: "1.0.0"
  compatible_kaos_versions: [">=1.0.0 <2.0.0"]
  skill_state: "Approved"
  automation_readiness: "assisted"
  capability: "implementation-planning"
  lifecycle_stage: { stage_id: "implementation-planning", stage_name: "Implementation Planning" }
  owner: "KAOS Core"
  description: "Convert approved editorial and canonical outcomes into an explicit, bounded implementation plan without authorizing or modifying structured data."
  depends_on_skills: ["editorial-triage"]
  prerequisites:
    - { artifact_id: "artifact.editorial_triage", required: true }
  consumes:
    - { artifact_id: "manifest.active_source_acquisition", type: "source_manifest", required: true, source: "active source manifest" }
    - { artifact_id: "artifact.editorial_triage", type: "artifact", required: true, source: "artifacts/{SOURCE_CODE}_EDITORIAL_TRIAGE.md" }
    - { artifact_id: "artifact.canonical_readiness_review", type: "artifact", required: false, source: "artifacts/{SOURCE_CODE}_CANONICAL_READINESS_REVIEW.md" }
  produces:
    - { artifact_id: "artifact.implementation_plan", type: "artifact", required: true, destination: "artifacts/{SOURCE_CODE}_IMPLEMENTATION_PLAN.md" }
    - { artifact_id: "manifest.implementation_plan_state", type: "source_manifest", required: true, destination: "active source manifest" }
  requires_approval: false
  approval_gate: null
  permitted_status_values: ["Not Started", "In Progress", "Ready", "Blocked", "Completed"]
  permitted_decision_values: ["Approved", "Approved With Notes", "Rejected", "Human Review Required", "Not Applicable"]
  next_skill: "implementation-approval"
  conditional_next_skills:
    - { condition: "Required upstream decisions are incomplete or contradictory.", decision_value: "Human Review Required", status_value: "Blocked", next_skill: null, reason: "Planning cannot safely continue without resolved governance inputs." }
    - { condition: "No approved implementation work remains.", decision_value: "Not Applicable", status_value: "Completed", next_skill: null, reason: "No implementation approval is needed when there is no work to authorize." }
  extensions: {}
---

# Implementation Planning

## 1. Purpose
Translate approved acquisition outcomes into a controlled implementation plan.

## 2. When to Use
Use after Editorial Triage and, when applicable, Canonical Readiness Review.

## 3. Prerequisites
Upstream artifacts must identify approved records, held records, rejected records, canonical targets, and any candidate approval outcomes.

## 4. Inputs
Inputs include editorial decisions, canonical readiness outcomes, baseline findings, source record references, target structured-data areas, expected deltas, and validation needs.

## 5. Required Reading
Read KAOS Core, Editorial Triage, Canonical Readiness Review when applicable, Baseline Reconciliation, Knowledge Inventory, and the source manifest.

## 6. Repository Expectations
The repository may contain structured data, source metadata, canonical entities, references, and validation scripts. This skill plans changes but does not make them.

## 7. Execution Steps
Confirm upstream completion, isolate approved work, exclude held or rejected records, map each record to an implementation route, identify target files or stores, reserve identifier strategy when needed, define expected deltas, define validations, define rollback notes, record implementation risks, and produce the plan.

## 8. Validation Requirements
Validate that every planned item traces to an upstream approved outcome, every excluded item remains excluded, target locations are explicit, expected deltas are stated, and no unapproved work is included.

## 9. Success Criteria
The implementation plan is complete enough for exact-scope authorization without requiring the approver to infer scope.

## 10. Outputs
Outputs are the Implementation Plan artifact and narrow manifest update.

## 11. Status Values
Use only approved KAOS status values.

## 12. Decision Values
Use only approved KAOS decision values.

## 13. Decision Gates
This skill has no approval gate.

## 14. Guardrails
Do not authorize production execution, modify structured data, add records outside approved scope, change upstream decisions, certify the source, or perform repository workflow actions.

## 15. Common Failure Modes
Failure modes include hidden scope expansion, missing expected deltas, ambiguous targets, unresolved held records, and planning from stale baseline information.

## 16. Artifacts Produced
`artifact.implementation_plan` is produced only by this skill.

## 17. Exit Criteria
Exit when the plan records included scope, excluded scope, target locations, expected deltas, validations, risks, status, decision, blockers, and next permitted transition.

## 18. Related Skills
Previous skills: `editorial-triage` and, when applicable, `canonical-readiness-review`. Next skill: `implementation-approval`.

## 19. Version History
| Version | State | Notes |
|---|---|---|
| 1.0.0 | Approved | Initial public KAOS release. |
| 0.9.0 | Under Review | Initial public KAOS candidate. |
