---
kaos_skill:
  name: "Source Certification"
  id: "source-certification"
  version: "1.0.0"
  specification_version: "1.0.0"
  compatible_kaos_versions: [">=1.0.0 <2.0.0"]
  skill_state: "Approved"
  automation_readiness: "assisted"
  capability: "source-certification"
  lifecycle_stage: { stage_id: "source-certification", stage_name: "Source Certification" }
  owner: "KAOS Core"
  description: "Make the final governed certification decision for completed source acquisition scope based on reviewed artifacts and implemented state."
  depends_on_skills: ["post-implementation-review"]
  prerequisites:
    - { artifact_id: "artifact.post_implementation_review", required: true }
  consumes:
    - { artifact_id: "manifest.active_source_acquisition", type: "source_manifest", required: true, source: "active source manifest" }
    - { artifact_id: "artifact.source_boundary_audit", type: "artifact", required: true, source: "artifacts/{SOURCE_CODE}_SOURCE_BOUNDARY_AUDIT.md" }
    - { artifact_id: "artifact.knowledge_inventory", type: "artifact", required: true, source: "artifacts/{SOURCE_CODE}_KNOWLEDGE_INVENTORY.md" }
    - { artifact_id: "artifact.editorial_triage", type: "artifact", required: true, source: "artifacts/{SOURCE_CODE}_EDITORIAL_TRIAGE.md" }
    - { artifact_id: "artifact.implementation_approval", type: "artifact", required: true, source: "artifacts/{SOURCE_CODE}_IMPLEMENTATION_APPROVAL.md" }
    - { artifact_id: "artifact.structured_data_implementation_report", type: "artifact", required: true, source: "artifacts/{SOURCE_CODE}_STRUCTURED_DATA_IMPLEMENTATION_REPORT.md" }
    - { artifact_id: "artifact.post_implementation_review", type: "artifact", required: true, source: "artifacts/{SOURCE_CODE}_POST_IMPLEMENTATION_REVIEW.md" }
  produces:
    - { artifact_id: "artifact.source_certification", type: "artifact", required: true, destination: "artifacts/{SOURCE_CODE}_SOURCE_CERTIFICATION.md" }
    - { artifact_id: "manifest.source_certification_state", type: "source_manifest", required: true, destination: "active source manifest" }
  requires_approval: true
  approval_gate:
    gate_id: "gate.source-certification.certification-approval"
    gate_name: "Source Certification Approval"
    approval_type: "source_certification"
    approver_role: "Authorized Knowledge Reviewer"
    approval_timing: "after_execution"
    evidence_required: ["Lifecycle artifact chain", "Implemented state", "Post-Implementation Review artifact", "Remaining risks"]
    blocks_next_skill: true
  permitted_status_values: ["Not Started", "In Progress", "Ready", "Blocked", "Completed"]
  permitted_decision_values: ["Approved", "Approved With Notes", "Rejected", "Human Review Required", "Not Applicable"]
  next_skill: "source-completion"
  conditional_next_skills:
    - { condition: "Post-implementation defects require remediation before certification.", decision_value: "Human Review Required", status_value: "Blocked", next_skill: "post-implementation-review", reason: "Reviewed defects must be resolved or accepted before certification." }
    - { condition: "Certification gate is not satisfied.", decision_value: "Human Review Required", status_value: "Blocked", next_skill: null, reason: "Completion cannot record final acquisition state without a certification decision." }
    - { condition: "No certifiable source scope exists.", decision_value: "Not Applicable", status_value: "Completed", next_skill: "source-completion", reason: "Completion may record the terminal non-certified state." }
  extensions: {}
---

# Source Certification

## 1. Purpose
Decide whether the completed acquisition scope is certified as governed knowledge.

## 2. When to Use
Use after Post-Implementation Review has evaluated implemented or intentionally skipped scope.

## 3. Prerequisites
The artifact chain must be complete enough to evaluate source boundary, inventory, editorial decisions, authorization, implementation, review outcomes, and unresolved risks.

## 4. Inputs
Inputs include the full lifecycle artifact chain, current structured data, source manifest, validation output, review outcomes, and remaining risks.

## 5. Required Reading
Read KAOS Core, all required upstream lifecycle artifacts, current repository state, and source profile notes when relevant.

## 6. Repository Expectations
The repository should reflect the reviewed state. This skill does not change structured data.

## 7. Execution Steps
Verify artifact chain completeness, verify source boundary integrity, verify inventory coverage, verify editorial decision handling, verify canonical readiness when applicable, verify implementation authorization, verify actual implementation, review unresolved risks, apply the certification gate, and create the certification artifact.

## 8. Validation Requirements
Validate artifact chain continuity, source-boundary adherence, unresolved-risk disclosure, approval-gate evidence, structured-data consistency, and terminal certification language.

## 9. Success Criteria
The certification artifact clearly states whether the completed source scope is certified, certified with notes, rejected, blocked for human review, or not applicable.

## 10. Outputs
Outputs are the Source Certification artifact and narrow manifest update.

## 11. Status Values
Use only approved KAOS status values.

## 12. Decision Values
Use only approved KAOS decision values.

## 13. Decision Gates
This skill owns `gate.source-certification.certification-approval`.

## 14. Guardrails
Do not reopen editorial triage, expand source scope, perform remediation, modify structured data, claim deferred work is complete, or perform repository workflow actions.

## 15. Common Failure Modes
Failure modes include certifying incomplete artifact chains, treating deferred scope as finished, hiding known risks, and certifying without reviewed implementation evidence.

## 16. Artifacts Produced
`artifact.source_certification` is produced only by this skill.

## 17. Exit Criteria
Exit when certification decision, approval gate result, certified scope, exclusions, deferred scope, risks, status, decision, blockers, and next permitted transition are documented.

## 18. Related Skills
Previous skill: `post-implementation-review`. Next skill: `source-completion`.

## 19. Version History
| Version | State | Notes |
|---|---|---|
| 1.0.0 | Approved | Initial public KAOS release. |
| 0.9.0 | Under Review | Initial public KAOS candidate. |
