---
kaos_skill:
  name: "Editorial Triage"
  id: "editorial-triage"
  version: "1.0.0"
  specification_version: "1.0.0"
  compatible_kaos_versions: [">=1.0.0 <2.0.0"]
  skill_state: "Approved"
  automation_readiness: "assisted"
  capability: "editorial-classification"
  lifecycle_stage: { stage_id: "editorial-triage", stage_name: "Editorial Triage" }
  owner: "KAOS Core"
  description: "Assign governed record-level dispositions to reconciled knowledge objects without implementing structured data or approving canonical entities."
  depends_on_skills: ["baseline-reconciliation"]
  prerequisites:
    - { artifact_id: "artifact.baseline_reconciliation", required: true }
    - { artifact_id: "artifact.knowledge_inventory", required: true }
  consumes:
    - { artifact_id: "manifest.active_source_acquisition", type: "source_manifest", required: true, source: "active source manifest" }
    - { artifact_id: "artifact.baseline_reconciliation", type: "artifact", required: true, source: "artifacts/{SOURCE_CODE}_BASELINE_RECONCILIATION.md" }
    - { artifact_id: "artifact.knowledge_inventory", type: "artifact", required: true, source: "artifacts/{SOURCE_CODE}_KNOWLEDGE_INVENTORY.md" }
  produces:
    - { artifact_id: "artifact.editorial_triage", type: "artifact", required: true, destination: "artifacts/{SOURCE_CODE}_EDITORIAL_TRIAGE.md" }
    - { artifact_id: "manifest.editorial_triage_state", type: "source_manifest", required: true, destination: "active source manifest" }
  requires_approval: false
  approval_gate: null
  permitted_status_values: ["Not Started", "In Progress", "Ready", "Blocked", "Completed"]
  permitted_decision_values: ["Approved", "Approved With Notes", "Rejected", "Human Review Required", "Not Applicable"]
  next_skill: "canonical-readiness-review"
  conditional_next_skills:
    - { condition: "No proposed canonical entities exist and approved non-canonical work remains.", decision_value: "Approved", status_value: "Completed", next_skill: "implementation-planning", reason: "Canonical Readiness Review is not required." }
    - { condition: "Triage cannot assign safe dispositions.", decision_value: "Human Review Required", status_value: "Blocked", next_skill: null, reason: "Governance decision is required." }
  extensions: {}
---

# Editorial Triage

## 1. Purpose
Assign governed dispositions to knowledge objects.

## 2. When to Use
Use after Baseline Reconciliation is complete.

## 3. Prerequisites
Baseline Reconciliation and Knowledge Inventory must be complete.

## 4. Inputs
Inputs include reconciled records, match evidence, duplicate candidates, variants, source conflicts, and source-native facts.

## 5. Required Reading
Read KAOS Core, Baseline Reconciliation, Knowledge Inventory, and applicable source profile notes.

## 6. Repository Expectations
The repository provides baseline context only. This skill does not change structured data.

## 7. Execution Steps
Review each record, assign one disposition, document likely canonical target when applicable, record duplicate confidence, record source conflict notes, isolate holds and exclusions, and decide next routing.

Use the controlled record-level disposition vocabulary from `docs/STATUS_AND_DECISION_MODEL.md`: `APPROVE_NEW_CANONICAL`, `MAP_TO_EXISTING`, `ENTITY_VARIANT`, `NON_CANONICAL_SOURCE_RECORD`, `SUPPORTING_CONTEXT_ONLY`, `NEEDS_EDITORIAL_REVIEW`, `EXCLUDE`, and `HUMAN_REVIEW`.

## 8. Validation Requirements
Validate every reviewed record has exactly one disposition and rationale.

## 9. Success Criteria
Approved work is ready for Canonical Readiness Review or Implementation Planning.

## 10. Outputs
Outputs are the Editorial Triage artifact and narrow manifest update.

## 11. Status Values
Use only approved KAOS status values.

## 12. Decision Values
Use only approved KAOS decision values.

## 13. Decision Gates
This skill has no approval gate.

## 14. Guardrails
Do not implement data, approve canonical entities, authorize implementation, certify the source, or perform repository workflow actions.

## 15. Common Failure Modes
Failure modes include multiple dispositions for one record, unsupported canonical proposal, duplicate uncertainty, and source conflict flattening.

## 16. Artifacts Produced
`artifact.editorial_triage` is produced only by this skill.

## 17. Exit Criteria
Exit when disposition counts, status, decision, blockers, and next transition are documented.

## 18. Related Skills
Previous skill: `baseline-reconciliation`. Next skill: `canonical-readiness-review` or `implementation-planning`.

## 19. Version History
| Version | State | Notes |
|---|---|---|
| 1.0.0 | Approved | Initial public KAOS release. |
| 0.9.0 | Under Review | Initial public KAOS candidate. |
