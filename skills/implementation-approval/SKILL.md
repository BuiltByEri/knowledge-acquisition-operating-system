---
kaos_skill:
  name: "Implementation Approval"
  id: "implementation-approval"
  version: "1.0.0"
  specification_version: "1.0.0"
  compatible_kaos_versions: [">=1.0.0 <2.0.0"]
  skill_state: "Approved"
  automation_readiness: "assisted"
  capability: "implementation-authorization"
  lifecycle_stage: { stage_id: "implementation-approval", stage_name: "Implementation Approval" }
  owner: "KAOS Core"
  description: "Authorize the exact reviewed implementation plan for structured-data execution without redefining scope or performing changes."
  depends_on_skills: ["implementation-planning"]
  prerequisites:
    - { artifact_id: "artifact.implementation_plan", required: true }
  consumes:
    - { artifact_id: "manifest.active_source_acquisition", type: "source_manifest", required: true, source: "active source manifest" }
    - { artifact_id: "artifact.implementation_plan", type: "artifact", required: true, source: "artifacts/{SOURCE_CODE}_IMPLEMENTATION_PLAN.md" }
  produces:
    - { artifact_id: "artifact.implementation_approval", type: "artifact", required: true, destination: "artifacts/{SOURCE_CODE}_IMPLEMENTATION_APPROVAL.md" }
    - { artifact_id: "manifest.implementation_approval_state", type: "source_manifest", required: true, destination: "active source manifest" }
  requires_approval: true
  approval_gate:
    gate_id: "gate.implementation-approval.implementation-authorization"
    gate_name: "Implementation Authorization"
    approval_type: "implementation_authorization"
    approver_role: "Authorized Knowledge Reviewer"
    approval_timing: "after_execution"
    evidence_required: ["Implementation Plan artifact", "Target scope", "Expected deltas", "Validation plan", "Repository snapshot"]
    blocks_next_skill: true
  permitted_status_values: ["Not Started", "In Progress", "Ready", "Blocked", "Completed"]
  permitted_decision_values: ["Approved", "Approved With Notes", "Rejected", "Human Review Required", "Not Applicable"]
  next_skill: "structured-data-implementation"
  conditional_next_skills:
    - { condition: "Plan is incomplete, stale, contradictory, or materially changed.", decision_value: "Rejected", status_value: "Completed", next_skill: "implementation-planning", reason: "A renewed implementation plan is required before authorization." }
    - { condition: "Upstream governance defect prevents safe authorization.", decision_value: "Human Review Required", status_value: "Blocked", next_skill: null, reason: "The owning prior stage must resolve the defect before approval." }
    - { condition: "No production implementation is intentionally authorized.", decision_value: "Not Applicable", status_value: "Completed", next_skill: null, reason: "No execution stage is required when implementation is skipped." }
  extensions: {}
---

# Implementation Approval

## 1. Purpose
Authorize only the exact implementation scope defined in the reviewed plan.

## 2. When to Use
Use after Implementation Planning and before any structured-data execution.

## 3. Prerequisites
The implementation plan must be complete, current, traceable to approved upstream outcomes, and specific enough to authorize without interpretation.

## 4. Inputs
Inputs include the implementation plan, source manifest, expected deltas, target locations, identifier strategy, validation plan, rollback notes, and repository snapshot.

## 5. Required Reading
Read KAOS Core, Implementation Planning, relevant upstream artifacts referenced by the plan, and current repository state.

## 6. Repository Expectations
The repository state used for approval must match the state assumed by the plan. This skill does not modify structured data.

## 7. Execution Steps
Verify plan completeness, verify repository freshness, confirm target files or stores, confirm counts and expected deltas, confirm identifier and relationship strategy, confirm exclusions, verify validation and rollback readiness, identify material scope changes, apply the approval gate, and create the approval artifact.

## 8. Validation Requirements
Validate exact-scope traceability, upstream approval evidence, excluded-scope protection, target specificity, expected deltas, repository snapshot, and approval-gate evidence.

## 9. Success Criteria
Structured Data Implementation can execute the authorized scope exactly as written.

## 10. Outputs
Outputs are the Implementation Approval artifact and narrow manifest update.

## 11. Status Values
Use only approved KAOS status values.

## 12. Decision Values
Use only approved KAOS decision values.

## 13. Decision Gates
This skill owns `gate.implementation-approval.implementation-authorization`.

## 14. Guardrails
Do not add scope, change mappings, repair the plan, modify structured data, certify the source, or perform repository workflow actions.

## 15. Common Failure Modes
Failure modes include approving stale scope, authorizing implied work, overlooking excluded records, missing repository drift, and treating non-blocking notes as permission to expand execution.

## 16. Artifacts Produced
`artifact.implementation_approval` is produced only by this skill.

## 17. Exit Criteria
Exit when the artifact records authorized scope, excluded scope, approval gate result, repository snapshot, status, decision, blockers, and next permitted transition.

## 18. Related Skills
Previous skill: `implementation-planning`. Next skill: `structured-data-implementation`.

## 19. Version History
| Version | State | Notes |
|---|---|---|
| 1.0.0 | Approved | Initial public KAOS release. |
| 0.9.0 | Under Review | Initial public KAOS candidate. |
