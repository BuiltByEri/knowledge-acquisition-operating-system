---
kaos_skill:
  name: "Canonical Readiness Review"
  id: "canonical-readiness-review"
  version: "1.0.0"
  specification_version: "1.0.0"
  compatible_kaos_versions: [">=1.0.0 <2.0.0"]
  skill_state: "Approved"
  automation_readiness: "assisted"
  capability: "canonical-governance"
  lifecycle_stage: { stage_id: "canonical-readiness-review", stage_name: "Canonical Readiness Review" }
  owner: "KAOS Core"
  description: "Review proposed canonical entities before planning, apply canonical approval, and route rejected candidates without replacing Editorial Triage."
  depends_on_skills: ["editorial-triage"]
  prerequisites:
    - { artifact_id: "artifact.editorial_triage", required: true }
  consumes:
    - { artifact_id: "manifest.active_source_acquisition", type: "source_manifest", required: true, source: "active source manifest" }
    - { artifact_id: "artifact.editorial_triage", type: "artifact", required: true, source: "artifacts/{SOURCE_CODE}_EDITORIAL_TRIAGE.md" }
  produces:
    - { artifact_id: "artifact.canonical_readiness_review", type: "artifact", required: true, destination: "artifacts/{SOURCE_CODE}_CANONICAL_READINESS_REVIEW.md" }
    - { artifact_id: "manifest.canonical_readiness_state", type: "source_manifest", required: true, destination: "active source manifest" }
  requires_approval: true
  approval_gate:
    gate_id: "gate.canonical-readiness-review.canonical-approval"
    gate_name: "Canonical Readiness Approval"
    approval_type: "canonical_readiness"
    approver_role: "Authorized Knowledge Reviewer"
    approval_timing: "after_execution"
    evidence_required: ["Editorial Triage artifact", "Candidate review table", "Duplicate and variant review", "Canonical Readiness Review artifact"]
    blocks_next_skill: true
  permitted_status_values: ["Not Started", "In Progress", "Ready", "Blocked", "Completed"]
  permitted_decision_values: ["Approved", "Approved With Notes", "Rejected", "Human Review Required", "Not Applicable"]
  next_skill: "implementation-planning"
  conditional_next_skills:
    - { condition: "No proposed canonical entities exist.", decision_value: "Not Applicable", status_value: "Completed", next_skill: "implementation-planning", reason: "Review is skipped when no canonical candidates exist." }
    - { condition: "Rejected candidates require a new editorial disposition.", decision_value: "Approved With Notes", status_value: "Completed", next_skill: "editorial-triage", reason: "Only Editorial Triage may assign replacement dispositions." }
    - { condition: "Canonical approval gate is not satisfied.", decision_value: "Human Review Required", status_value: "Blocked", next_skill: null, reason: "Downstream planning cannot consume unapproved readiness outcomes." }
  extensions: {}
---

# Canonical Readiness Review

## 1. Purpose
Determine whether proposed canonical entities are ready for downstream planning.

## 2. When to Use
Use only when Editorial Triage proposes one or more new canonical entities.

## 3. Prerequisites
Editorial Triage must be complete and must identify canonical candidates.

## 4. Inputs
Inputs include candidate titles, rationale, duplicate evidence, variant evidence, source conflicts, and proposed canonical attributes.

## 5. Required Reading
Read KAOS Core, Editorial Triage, Baseline Reconciliation, and source profile notes when relevant.

## 6. Repository Expectations
The repository provides baseline and duplicate context. This skill does not implement data.

## 7. Execution Steps
Review each candidate for governance fit, duplicate risk, abstraction level, source support, naming, maintainability, and source conflict handling. Assign exactly one readiness outcome.

## 8. Validation Requirements
Validate readiness vocabulary, candidate coverage, approval gate evidence, rejected-candidate routing, and status/decision separation.

## 9. Success Criteria
Approved candidates can be planned without changing Editorial Triage dispositions.

## 10. Outputs
Outputs are the Canonical Readiness Review artifact and narrow manifest update.

## 11. Status Values
Use only approved KAOS status values.

## 12. Decision Values
Use only approved KAOS decision values.

## 13. Decision Gates
This skill owns `gate.canonical-readiness-review.canonical-approval`.

## 14. Guardrails
Do not assign replacement editorial dispositions, implement data, authorize implementation, certify the source, or perform repository workflow actions.

## 15. Common Failure Modes
Failure modes include approving by inference, leaving candidates undecided, duplicate review gaps, and bypassing reclassification.

## 16. Artifacts Produced
`artifact.canonical_readiness_review` is produced only by this skill.

## 17. Exit Criteria
Exit when candidate outcomes, approval gate result, status, decision, blockers, and next transition are documented.

## 18. Related Skills
Previous skill: `editorial-triage`. Next skill: `implementation-planning`.

## 19. Version History
| Version | State | Notes |
|---|---|---|
| 1.0.0 | Approved | Initial public KAOS release. |
| 0.9.0 | Under Review | Initial public KAOS candidate. |
