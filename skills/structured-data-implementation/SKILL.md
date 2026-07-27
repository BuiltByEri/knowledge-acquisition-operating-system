---
kaos_skill:
  name: "Structured Data Implementation"
  id: "structured-data-implementation"
  version: "1.0.0"
  specification_version: "1.0.0"
  compatible_kaos_versions: [">=1.0.0 <2.0.0"]
  skill_state: "Approved"
  automation_readiness: "assisted"
  capability: "structured-data-execution"
  lifecycle_stage: { stage_id: "structured-data-implementation", stage_name: "Structured Data Implementation" }
  owner: "KAOS Core"
  description: "Execute only the authorized structured-data scope, record actual changes, validate outcomes, and stop on material drift."
  depends_on_skills: ["implementation-approval"]
  prerequisites:
    - { artifact_id: "artifact.implementation_approval", required: true }
  consumes:
    - { artifact_id: "manifest.active_source_acquisition", type: "source_manifest", required: true, source: "active source manifest" }
    - { artifact_id: "artifact.implementation_plan", type: "artifact", required: true, source: "artifacts/{SOURCE_CODE}_IMPLEMENTATION_PLAN.md" }
    - { artifact_id: "artifact.implementation_approval", type: "artifact", required: true, source: "artifacts/{SOURCE_CODE}_IMPLEMENTATION_APPROVAL.md" }
  produces:
    - { artifact_id: "artifact.structured_data_implementation_report", type: "artifact", required: true, destination: "artifacts/{SOURCE_CODE}_STRUCTURED_DATA_IMPLEMENTATION_REPORT.md" }
    - { artifact_id: "manifest.structured_data_implementation_state", type: "source_manifest", required: true, destination: "active source manifest" }
  requires_approval: false
  approval_gate: null
  permitted_status_values: ["Not Started", "In Progress", "Ready", "Blocked", "Completed"]
  permitted_decision_values: ["Approved", "Approved With Notes", "Rejected", "Human Review Required", "Not Applicable"]
  next_skill: "post-implementation-review"
  conditional_next_skills:
    - { condition: "Repository state no longer matches approved authorization.", decision_value: "Human Review Required", status_value: "Blocked", next_skill: "implementation-approval", reason: "Execution cannot proceed without current authorization." }
    - { condition: "Material scope change is required to proceed.", decision_value: "Human Review Required", status_value: "Blocked", next_skill: "implementation-planning", reason: "Planning must define changed scope before renewed approval." }
    - { condition: "No authorized execution scope exists.", decision_value: "Not Applicable", status_value: "Completed", next_skill: "post-implementation-review", reason: "Review may record that implementation was skipped." }
  extensions: {}
---

# Structured Data Implementation

## 1. Purpose
Execute the authorized structured-data plan and document actual results.

## 2. When to Use
Use only after Implementation Approval authorizes exact execution scope.

## 3. Prerequisites
The implementation approval artifact must identify approved records, approved target locations, expected deltas, validations, and repository snapshot.

## 4. Inputs
Inputs include the implementation plan, implementation approval, current structured data, source manifest, validation commands, and rollback notes.

## 5. Required Reading
Read KAOS Core, Implementation Plan, Implementation Approval, and the current target data before writing.

## 6. Repository Expectations
The repository is the execution target. Writes must remain limited to the approved scope and must stop when state differs materially from authorization.

## 7. Execution Steps
Recheck repository state, confirm approved scope, apply only authorized changes, avoid excluded records, record row-level or object-level changes, document actual files or stores changed, compare actual deltas to expected deltas, run validations, record remediation limited to authorized scope, and produce the implementation report.

## 8. Validation Requirements
Validate repository freshness, exact-scope execution, actual-vs-expected deltas, identifier integrity, source boundaries, relationship integrity, validation output, and remaining risks.

## 9. Success Criteria
The implementation report allows independent review of what changed and whether execution matched authorization.

## 10. Outputs
Outputs are the Structured Data Implementation Report artifact and narrow manifest update.

## 11. Status Values
Use only approved KAOS status values.

## 12. Decision Values
Use only approved KAOS decision values.

## 13. Decision Gates
This skill has no approval gate.

## 14. Guardrails
Do not expand scope, make new editorial decisions, authorize changes, certify the source, conceal validation failures, or perform repository workflow actions.

## 15. Common Failure Modes
Failure modes include opportunistic fixes, stale authorization, unrecorded row changes, expected-delta mismatch, skipped validation, and silent source-boundary drift.

## 16. Artifacts Produced
`artifact.structured_data_implementation_report` is produced only by this skill.

## 17. Exit Criteria
Exit when actual changes, validations, actual-vs-expected deltas, remaining risks, status, decision, blockers, and next permitted transition are documented.

## 18. Related Skills
Previous skill: `implementation-approval`. Next skill: `post-implementation-review`.

## 19. Version History
| Version | State | Notes |
|---|---|---|
| 1.0.0 | Approved | Initial public KAOS release. |
| 0.9.0 | Under Review | Initial public KAOS candidate. |
