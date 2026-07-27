---
kaos_skill:
  name: "Source Completion"
  id: "source-completion"
  version: "1.0.0"
  specification_version: "1.0.0"
  compatible_kaos_versions: [">=1.0.0 <2.0.0"]
  skill_state: "Approved"
  automation_readiness: "assisted"
  capability: "source-completion-reporting"
  lifecycle_stage: { stage_id: "source-completion", stage_name: "Source Completion" }
  owner: "KAOS Core"
  description: "Record the final acquisition state after certification without creating new recommendations or reopening decisions."
  depends_on_skills: ["source-certification"]
  prerequisites:
    - { artifact_id: "artifact.source_certification", required: true }
  consumes:
    - { artifact_id: "manifest.active_source_acquisition", type: "source_manifest", required: true, source: "active source manifest" }
    - { artifact_id: "artifact.source_certification", type: "artifact", required: true, source: "artifacts/{SOURCE_CODE}_SOURCE_CERTIFICATION.md" }
  produces:
    - { artifact_id: "artifact.source_completion", type: "artifact", required: true, destination: "artifacts/{SOURCE_CODE}_SOURCE_COMPLETION.md" }
    - { artifact_id: "manifest.source_completion_state", type: "source_manifest", required: true, destination: "active source manifest" }
  requires_approval: false
  approval_gate: null
  permitted_status_values: ["Not Started", "In Progress", "Ready", "Blocked", "Completed"]
  permitted_decision_values: ["Approved", "Approved With Notes", "Rejected", "Human Review Required", "Not Applicable"]
  next_skill: null
  conditional_next_skills:
    - { condition: "Certification artifact is missing or incomplete.", decision_value: "Human Review Required", status_value: "Blocked", next_skill: "source-certification", reason: "Completion must record a certification outcome, not infer one." }
  extensions: {}
---

# Source Completion

## 1. Purpose
Record the final acquisition state for the completed source scope.

## 2. When to Use
Use after Source Certification reaches a terminal decision or not-applicable state.

## 3. Prerequisites
The certification artifact must exist and must identify certified scope, uncertified scope, deferred scope, exclusions, notes, and remaining risks.

## 4. Inputs
Inputs include Source Certification, source manifest, lifecycle artifact references, final structured-data summary, and known unresolved or deferred scope.

## 5. Required Reading
Read KAOS Core, Source Certification, the source manifest, and any lifecycle artifacts needed to summarize final state accurately.

## 6. Repository Expectations
The repository state is historical context for the final report. This skill does not modify structured data.

## 7. Execution Steps
Confirm certification outcome, summarize lifecycle path, record final acquisition state, summarize completed changes, record exclusions and deferred scope, record unresolved risks, list final artifacts, record final manifest state, and produce the completion artifact.

## 8. Validation Requirements
Validate that completion does not create new decisions, recommendations, or implementation work; confirm all final state statements trace to certification or upstream artifacts.

## 9. Success Criteria
The source has a terminal historical record of what was completed, what remains outside the completed scope, and what state was certified.

## 10. Outputs
Outputs are the Source Completion artifact and narrow manifest update.

## 11. Status Values
Use only approved KAOS status values.

## 12. Decision Values
Use only approved KAOS decision values.

## 13. Decision Gates
This skill has no approval gate.

## 14. Guardrails
Do not recommend new work, reopen decisions, certify scope, modify structured data, expand the source boundary, or perform repository workflow actions.

## 15. Common Failure Modes
Failure modes include turning completion into planning, implying deferred work is finished, summarizing uncertified scope as certified, and adding new future-work decisions.

## 16. Artifacts Produced
`artifact.source_completion` is produced only by this skill.

## 17. Exit Criteria
Exit when final acquisition state, final artifact list, certification outcome, unresolved or deferred scope, status, decision, blockers, and terminal transition are documented.

## 18. Related Skills
Previous skill: `source-certification`. This skill is terminal.

## 19. Version History
| Version | State | Notes |
|---|---|---|
| 1.0.0 | Approved | Initial public KAOS release. |
| 0.9.0 | Under Review | Initial public KAOS candidate. |
