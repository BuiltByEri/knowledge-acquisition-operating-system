# Knowledge Acquisition Skills

KAOS skills are reusable lifecycle components. They are methodology contracts, not prompts or reports.

| KAOS ID | Skill ID | Skill Name | Primary Artifact | Default Next Skill |
|---|---|---|---|---|
| KAOS-001 | `source-boundary-audit` | Source Boundary Audit | `artifact.source_boundary_audit` | `acquisition-strategy` |
| KAOS-002 | `acquisition-strategy` | Acquisition Strategy | `artifact.acquisition_strategy` | `knowledge-inventory` |
| KAOS-003 | `knowledge-inventory` | Knowledge Inventory | `artifact.knowledge_inventory` | `baseline-reconciliation` |
| KAOS-004 | `baseline-reconciliation` | Baseline Reconciliation | `artifact.baseline_reconciliation` | `editorial-triage` |
| KAOS-005 | `editorial-triage` | Editorial Triage | `artifact.editorial_triage` | `canonical-readiness-review` or `implementation-planning` |
| KAOS-006 | `canonical-readiness-review` | Canonical Readiness Review | `artifact.canonical_readiness_review` | `implementation-planning` |
| KAOS-007 | `implementation-planning` | Implementation Planning | `artifact.implementation_plan` | `implementation-approval` |
| KAOS-008 | `implementation-approval` | Implementation Approval | `artifact.implementation_approval` | `structured-data-implementation` |
| KAOS-009 | `structured-data-implementation` | Structured Data Implementation | `artifact.structured_data_implementation_report` | `post-implementation-review` |
| KAOS-010 | `post-implementation-review` | Post-Implementation Review | `artifact.post_implementation_review` | `source-certification` |
| KAOS-011 | `source-certification` | Source Certification | `artifact.source_certification` | `source-completion` |
| KAOS-012 | `source-completion` | Source Completion | `artifact.source_completion` | `null` |

KAOS v1.0.0 public skills are `Approved`.

Editorial Triage uses the controlled record-level disposition vocabulary defined in `docs/STATUS_AND_DECISION_MODEL.md`. Those dispositions are separate from KAOS status values and decision values.
