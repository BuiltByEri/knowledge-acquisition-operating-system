---
kaos_skill:
  name: "Acquisition Strategy"
  id: "acquisition-strategy"
  version: "1.0.0"
  specification_version: "1.0.0"
  compatible_kaos_versions: [">=1.0.0 <2.0.0"]
  skill_state: "Approved"
  automation_readiness: "assisted"
  capability: "acquisition-planning"
  lifecycle_stage: { stage_id: "acquisition-strategy", stage_name: "Acquisition Strategy" }
  owner: "KAOS Core"
  description: "Convert an approved source boundary into rules for knowledge object discovery, field capture, batching, duplicate controls, and readiness for Knowledge Inventory."
  depends_on_skills: ["source-boundary-audit"]
  prerequisites:
    - { artifact_id: "artifact.source_boundary_audit", required: true }
    - { artifact_id: "manifest.source_boundary_state", required: true }
  consumes:
    - { artifact_id: "manifest.active_source_acquisition", type: "source_manifest", required: true, source: "active source manifest" }
    - { artifact_id: "artifact.source_boundary_audit", type: "artifact", required: true, source: "artifacts/{SOURCE_CODE}_SOURCE_BOUNDARY_AUDIT.md" }
  produces:
    - { artifact_id: "artifact.acquisition_strategy", type: "artifact", required: true, destination: "artifacts/{SOURCE_CODE}_ACQUISITION_STRATEGY.md" }
    - { artifact_id: "manifest.acquisition_strategy_state", type: "source_manifest", required: true, destination: "active source manifest" }
  requires_approval: false
  approval_gate: null
  permitted_status_values: ["Not Started", "In Progress", "Ready", "Blocked", "Completed"]
  permitted_decision_values: ["Approved", "Approved With Notes", "Rejected", "Human Review Required", "Not Applicable"]
  next_skill: "knowledge-inventory"
  conditional_next_skills:
    - { condition: "Source boundary is missing, rejected, or blocked.", decision_value: "Human Review Required", status_value: "Blocked", next_skill: "source-boundary-audit", reason: "Strategy depends on a valid boundary." }
    - { condition: "No controlled knowledge inventory path exists.", decision_value: "Rejected", status_value: "Completed", next_skill: null, reason: "The source cannot proceed under current scope." }
  extensions: {}
---

# Acquisition Strategy

## 1. Purpose
Translate the governed source boundary into a controlled acquisition plan.

## 2. When to Use
Use after Source Boundary Audit permits strategy.

## 3. Prerequisites
The Source Boundary Audit artifact and manifest state must be complete.

## 4. Inputs
Inputs include boundary artifact, source surfaces, known object types, duplicate risks, access constraints, and baseline context.

## 5. Required Reading
Read KAOS Core, Source Boundary Audit, and source profile material when present.

## 6. Repository Expectations
The repository may contain governed baseline data used for planning checks. This skill does not change data.

## 7. Execution Steps
Define acquisition pattern, knowledge object unit, capture fields, count strategy, batching strategy, duplicate controls, source conflict policy, risk controls, validation expectations, and readiness for Knowledge Inventory.

## 8. Validation Requirements
Validate that strategy stays inside the source boundary and provides enough detail for repeatable capture.

## 9. Success Criteria
Knowledge Inventory can begin without redefining scope or strategy.

## 10. Outputs
Outputs are the Acquisition Strategy artifact and narrow manifest update.

## 11. Status Values
Use only approved KAOS status values.

## 12. Decision Values
Use only approved KAOS decision values.

## 13. Decision Gates
This skill has no approval gate.

## 14. Guardrails
Do not perform inventory capture, editorial classification, canonical approval, implementation, certification, or repository workflow actions.

## 15. Common Failure Modes
Failure modes include incomplete capture fields, unstable object unit, unclear duplicate controls, and hidden source assumptions.

## 16. Artifacts Produced
`artifact.acquisition_strategy` is produced only by this skill.

## 17. Exit Criteria
Exit when strategy status, decision, capture rules, blockers, and next transition are documented.

## 18. Related Skills
Previous skill: `source-boundary-audit`. Next skill: `knowledge-inventory`.

## 19. Version History
| Version | State | Notes |
|---|---|---|
| 1.0.0 | Approved | Initial public KAOS release. |
| 0.9.0 | Under Review | Initial public KAOS candidate. |
