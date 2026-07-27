---
kaos_skill:
  name: "Post-Implementation Review"
  id: "post-implementation-review"
  version: "1.0.0"
  specification_version: "1.0.0"
  compatible_kaos_versions: [">=1.0.0 <2.0.0"]
  skill_state: "Approved"
  automation_readiness: "assisted"
  capability: "post-implementation-quality-review"
  lifecycle_stage: { stage_id: "post-implementation-review", stage_name: "Post-Implementation Review" }
  owner: "KAOS Core"
  description: "Review actual structured-data changes or authorized no-change outcomes against approval before source certification."
  depends_on_skills: ["implementation-approval", "structured-data-implementation"]
  prerequisites:
    - { artifact_id: "artifact.implementation_approval", required: true }
    - { artifact_id: "artifact.structured_data_implementation_report", required: false }
  consumes:
    - { artifact_id: "manifest.active_source_acquisition", type: "source_manifest", required: true, source: "active source manifest" }
    - { artifact_id: "artifact.implementation_approval", type: "artifact", required: true, source: "artifacts/{SOURCE_CODE}_IMPLEMENTATION_APPROVAL.md" }
    - { artifact_id: "artifact.structured_data_implementation_report", type: "artifact", required: false, source: "artifacts/{SOURCE_CODE}_STRUCTURED_DATA_IMPLEMENTATION_REPORT.md" }
  produces:
    - { artifact_id: "artifact.post_implementation_review", type: "artifact", required: true, destination: "artifacts/{SOURCE_CODE}_POST_IMPLEMENTATION_REVIEW.md" }
    - { artifact_id: "manifest.post_implementation_review_state", type: "source_manifest", required: true, destination: "active source manifest" }
  requires_approval: false
  approval_gate: null
  permitted_status_values: ["Not Started", "In Progress", "Ready", "Blocked", "Completed"]
  permitted_decision_values: ["Approved", "Approved With Notes", "Rejected", "Human Review Required", "Not Applicable"]
  next_skill: "source-certification"
  conditional_next_skills:
    - { condition: "In-scope remediation is required and remains within existing authorization.", decision_value: "Approved With Notes", status_value: "Completed", next_skill: "structured-data-implementation", reason: "Implementation may correct authorized defects before certification." }
    - { condition: "Remediation would require changed scope.", decision_value: "Human Review Required", status_value: "Blocked", next_skill: "implementation-planning", reason: "Changed scope must be planned and approved before execution." }
    - { condition: "Implemented data cannot be reviewed safely.", decision_value: "Human Review Required", status_value: "Blocked", next_skill: null, reason: "Certification cannot proceed without trustworthy review." }
  extensions: {}
---

# Post-Implementation Review

## 1. Purpose
Review implemented changes or an approved no-change outcome before source certification.

## 2. When to Use
Use after Structured Data Implementation completes, or after Implementation Approval records that no production implementation was intentionally authorized.

## 3. Prerequisites
Implementation Approval must exist. When structured implementation occurred, the implementation report must document actual changes, target locations, validation output, actual deltas, expected deltas, and remaining risks. When implementation was intentionally not authorized, the approval artifact must record the governed no-change scope.

## 4. Inputs
Inputs include implementation approval, implementation report when implementation occurred, changed structured data when present, validation output when applicable, source manifest, and upstream artifact references.

## 5. Required Reading
Read KAOS Core, Implementation Approval, Structured Data Implementation Report when present, and relevant upstream artifacts referenced by the implemented or intentionally skipped scope.

## 6. Repository Expectations
The repository contains the implemented state to review, or the approved no-change state to verify. This skill does not introduce new structured-data scope.

## 7. Execution Steps
Compare actual changes to authorization when implementation occurred, or verify that no production implementation was authorized and no production data changes occurred. Verify excluded-scope protection, review changed records when present, verify relationships and references when applicable, review validation output when applicable, assign review outcomes, identify in-scope remediation when relevant, identify unresolved risks, and produce the review artifact.

## 8. Validation Requirements
Validate record coverage when records changed, approved-scope adherence, actual-vs-expected deltas when implementation occurred, no-change adherence when implementation was intentionally skipped, data quality and reference integrity when applicable, validation results, remediation ownership, and certification readiness.

## 9. Success Criteria
Certification can evaluate a reviewed implementation state or a reviewed authorized no-change state with known defects, notes, and unresolved risks.

## 10. Outputs
Outputs are the Post-Implementation Review artifact and narrow manifest update.

## 11. Status Values
Use only approved KAOS status values.

## 12. Decision Values
Use only approved KAOS decision values.

## 13. Decision Gates
This skill has no approval gate.

## 14. Guardrails
Do not certify the source, add implementation scope, change upstream decisions, silently remediate out-of-scope defects, or perform repository workflow actions.

## 15. Common Failure Modes
Failure modes include reviewing only counts, missing excluded-scope contamination, approving unvalidated changes, requiring an implementation report for an approved no-change route, and turning review into certification.

## 16. Artifacts Produced
`artifact.post_implementation_review` is produced only by this skill.

## 17. Exit Criteria
Exit when review outcomes, remediation needs or no-change confirmation, validation interpretation, risks, status, decision, blockers, and next permitted transition are documented.

## 18. Related Skills
Previous skill: `structured-data-implementation` for implemented scope or `implementation-approval` for authorized no-change scope. Next skill: `source-certification`.

## 19. Version History
| Version | State | Notes |
|---|---|---|
| 1.0.0 | Approved | Initial public KAOS release. |
| 0.9.0 | Under Review | Initial public KAOS candidate. |
