---
kaos_skill:
  name: "Knowledge Inventory"
  id: "knowledge-inventory"
  version: "1.0.0"
  specification_version: "1.0.0"
  compatible_kaos_versions: [">=1.0.0 <2.0.0"]
  skill_state: "Approved"
  automation_readiness: "assisted"
  capability: "knowledge-object-capture"
  lifecycle_stage: { stage_id: "knowledge-inventory", stage_name: "Knowledge Inventory" }
  owner: "KAOS Core"
  description: "Capture approved knowledge objects from source surfaces while preserving source-native facts, identifiers, relationships, aliases, conflicts, and uncertainty."
  depends_on_skills: ["acquisition-strategy"]
  prerequisites:
    - { artifact_id: "artifact.acquisition_strategy", required: true }
    - { artifact_id: "artifact.source_boundary_audit", required: true }
  consumes:
    - { artifact_id: "manifest.active_source_acquisition", type: "source_manifest", required: true, source: "active source manifest" }
    - { artifact_id: "artifact.acquisition_strategy", type: "artifact", required: true, source: "artifacts/{SOURCE_CODE}_ACQUISITION_STRATEGY.md" }
    - { artifact_id: "artifact.source_boundary_audit", type: "artifact", required: true, source: "artifacts/{SOURCE_CODE}_SOURCE_BOUNDARY_AUDIT.md" }
  produces:
    - { artifact_id: "artifact.knowledge_inventory", type: "artifact", required: true, destination: "artifacts/{SOURCE_CODE}_KNOWLEDGE_INVENTORY.md" }
    - { artifact_id: "manifest.knowledge_inventory_state", type: "source_manifest", required: true, destination: "active source manifest" }
  requires_approval: false
  approval_gate: null
  permitted_status_values: ["Not Started", "In Progress", "Ready", "Blocked", "Completed"]
  permitted_decision_values: ["Approved", "Approved With Notes", "Rejected", "Human Review Required", "Not Applicable"]
  next_skill: "baseline-reconciliation"
  conditional_next_skills:
    - { condition: "Strategy is missing or blocked.", decision_value: "Human Review Required", status_value: "Blocked", next_skill: "acquisition-strategy", reason: "Inventory capture requires strategy." }
    - { condition: "No knowledge objects exist inside the approved boundary.", decision_value: "Not Applicable", status_value: "Completed", next_skill: "source-certification", reason: "Empty acquisitions require certification before completion." }
  extensions: {}
---

# Knowledge Inventory

## 1. Purpose
Capture all approved knowledge objects without assigning final governance meaning.

## 2. When to Use
Use after Acquisition Strategy defines the object unit and capture fields.

## 3. Prerequisites
Acquisition Strategy and Source Boundary Audit must be complete.

## 4. Inputs
Inputs include source surfaces, capture fields, object unit, source identifiers, aliases, and duplicate signals.

## 5. Required Reading
Read KAOS Core, Source Boundary Audit, Acquisition Strategy, and source profile material when present.

## 6. Repository Expectations
The repository may contain existing baseline data for duplicate signal capture. This skill does not modify baseline data.

## 7. Execution Steps
Enumerate approved source objects, preserve source-native labels, capture identifiers and URLs, record aliases, note duplicate signals, record source conflicts, record uncertainty, and produce the inventory artifact.

## 8. Validation Requirements
Validate count reconciliation, required fields, boundary compliance, source-native preservation, missing-value notes, and empty-inventory routing through Source Certification.

## 9. Success Criteria
Every approved knowledge object is captured, or the inventory explicitly records that no eligible knowledge objects exist inside the approved boundary.

## 10. Outputs
Outputs are the Knowledge Inventory artifact and narrow manifest update.

## 11. Status Values
Use only approved KAOS status values.

## 12. Decision Values
Use only approved KAOS decision values.

## 13. Decision Gates
This skill has no approval gate.

## 14. Guardrails
Do not merge duplicates, create canonical entities, reject records, assign editorial dispositions, implement data, or certify the source.

## 15. Common Failure Modes
Failure modes include object-count drift, hidden source surfaces, source truth normalization, and premature classification.

## 16. Artifacts Produced
`artifact.knowledge_inventory` is produced only by this skill.

## 17. Exit Criteria
Exit when inventory count, status, decision, blockers, and next transition are documented. Empty inventories must route to `source-certification`, not directly to completion.

## 18. Related Skills
Previous skill: `acquisition-strategy`. Next skill: `baseline-reconciliation`. Conditional empty-inventory route: `source-certification`.

## 19. Version History
| Version | State | Notes |
|---|---|---|
| 1.0.0 | Approved | Initial public KAOS release. |
| 0.9.0 | Under Review | Initial public KAOS candidate. |
