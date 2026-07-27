---
kaos_skill:
  name: "Source Boundary Audit"
  id: "source-boundary-audit"
  version: "1.0.0"
  specification_version: "1.0.0"
  compatible_kaos_versions: [">=1.0.0 <2.0.0"]
  skill_state: "Approved"
  automation_readiness: "assisted"
  capability: "source-boundary-governance"
  lifecycle_stage: { stage_id: "source-boundary-audit", stage_name: "Source Boundary Audit" }
  owner: "KAOS Core"
  description: "Determine source identity, source surfaces, included and excluded knowledge objects, access constraints, source conflicts, and readiness for acquisition strategy."
  depends_on_skills: []
  prerequisites:
    - { artifact_id: "manifest.active_source_acquisition", required: true }
    - { artifact_id: "input.source_entry_point", required: true }
  consumes:
    - { artifact_id: "manifest.active_source_acquisition", type: "source_manifest", required: true, source: "active source manifest" }
    - { artifact_id: "input.source_entry_point", type: "operator_input", required: true, source: "approved source selection" }
  produces:
    - { artifact_id: "artifact.source_boundary_audit", type: "artifact", required: true, destination: "artifacts/{SOURCE_CODE}_SOURCE_BOUNDARY_AUDIT.md" }
    - { artifact_id: "manifest.source_boundary_state", type: "source_manifest", required: true, destination: "active source manifest" }
  requires_approval: false
  approval_gate: null
  permitted_status_values: ["Not Started", "In Progress", "Ready", "Blocked", "Completed"]
  permitted_decision_values: ["Approved", "Approved With Notes", "Rejected", "Human Review Required", "Not Applicable"]
  next_skill: "acquisition-strategy"
  conditional_next_skills:
    - { condition: "No valid source boundary can be established.", decision_value: "Rejected", status_value: "Completed", next_skill: null, reason: "Acquisition cannot proceed without a governed source boundary." }
    - { condition: "Boundary cannot be resolved without human governance input.", decision_value: "Human Review Required", status_value: "Blocked", next_skill: null, reason: "Ambiguous source scope must be decided before strategy." }
  extensions: {}
---

# Source Boundary Audit

## 1. Purpose
Define what source material is in scope before knowledge acquisition begins.

## 2. When to Use
Use this skill first for any new source, source surface, or material boundary change.

## 3. Prerequisites
The operator must have an approved source entry point and active source manifest context.

## 4. Inputs
Inputs include source entry point, source selection rationale, known access constraints, and prior public-safe source notes.

## 5. Required Reading
Read KAOS Core, the active source manifest, and any source profile supplied for the acquisition.

## 6. Repository Expectations
The repository may contain prior governed artifacts and baseline structured data. This skill must not modify structured data.

## 7. Execution Steps
Identify source identity, enumerate source surfaces, classify source objects, name exclusions, record access constraints, identify source conflicts, define boundary risks, decide whether batching is needed, and create the boundary artifact.

## 8. Validation Requirements
Validate metadata, source identity, included and excluded surfaces, boundary decision, artifact ownership, and next transition.

## 9. Success Criteria
The boundary is explicit, auditable, source-neutral, and sufficient for Acquisition Strategy.

## 10. Outputs
Outputs are the Source Boundary Audit artifact and narrow source manifest update.

## 11. Status Values
Use only approved KAOS status values.

## 12. Decision Values
Use only approved KAOS decision values.

## 13. Decision Gates
This skill has no approval gate.

## 14. Guardrails
Do not inventory all records, assign editorial dispositions, create canonical entities, implement data, certify the source, or perform repository workflow actions.

## 15. Common Failure Modes
Failure modes include vague source scope, hidden source surfaces, unsupported exclusions, and source access assumptions.

## 16. Artifacts Produced
`artifact.source_boundary_audit` is produced only by this skill.

## 17. Exit Criteria
Exit when the artifact records status, decision, boundary scope, blockers, and next permitted transition.

## 18. Related Skills
Next skill: `acquisition-strategy`.

## 19. Version History
| Version | State | Notes |
|---|---|---|
| 1.0.0 | Approved | Initial public KAOS release. |
| 0.9.0 | Under Review | Initial public KAOS candidate. |
