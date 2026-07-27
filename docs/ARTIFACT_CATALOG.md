# Artifact Catalog

This catalog summarizes KAOS v1.0.0 artifacts and ownership. It does not provide full artifact templates.

| Artifact ID | Artifact Name | Produced By | Default Location | Primary Consumers |
|---|---|---|---|---|
| `artifact.source_boundary_audit` | Source Boundary Audit | `source-boundary-audit` | `artifacts/{SOURCE_CODE}_SOURCE_BOUNDARY_AUDIT.md` | Downstream acquisition stages |
| `artifact.acquisition_strategy` | Acquisition Strategy | `acquisition-strategy` | `artifacts/{SOURCE_CODE}_ACQUISITION_STRATEGY.md` | Knowledge Inventory and downstream stages |
| `artifact.knowledge_inventory` | Knowledge Inventory | `knowledge-inventory` | `artifacts/{SOURCE_CODE}_KNOWLEDGE_INVENTORY.md` | Baseline Reconciliation and downstream stages |
| `artifact.baseline_reconciliation` | Baseline Reconciliation | `baseline-reconciliation` | `artifacts/{SOURCE_CODE}_BASELINE_RECONCILIATION.md` | Editorial Triage and downstream stages |
| `artifact.editorial_triage` | Editorial Triage | `editorial-triage` | `artifacts/{SOURCE_CODE}_EDITORIAL_TRIAGE.md` | Canonical Readiness Review or Implementation Planning |
| `artifact.canonical_readiness_review` | Canonical Readiness Review | `canonical-readiness-review` | `artifacts/{SOURCE_CODE}_CANONICAL_READINESS_REVIEW.md` | Implementation Planning and downstream stages |
| `artifact.implementation_plan` | Implementation Plan | `implementation-planning` | `artifacts/{SOURCE_CODE}_IMPLEMENTATION_PLAN.md` | Implementation Approval and downstream stages |
| `artifact.implementation_approval` | Implementation Approval | `implementation-approval` | `artifacts/{SOURCE_CODE}_IMPLEMENTATION_APPROVAL.md` | Structured Data Implementation and downstream stages |
| `artifact.structured_data_implementation_report` | Structured Data Implementation Report | `structured-data-implementation` | `artifacts/{SOURCE_CODE}_STRUCTURED_DATA_IMPLEMENTATION_REPORT.md` | Post-Implementation Review and downstream stages |
| `artifact.post_implementation_review` | Post-Implementation Review | `post-implementation-review` | `artifacts/{SOURCE_CODE}_POST_IMPLEMENTATION_REVIEW.md` | Source Certification and Source Completion |
| `artifact.source_certification` | Source Certification | `source-certification` | `artifacts/{SOURCE_CODE}_SOURCE_CERTIFICATION.md` | Source Completion |
| `artifact.source_completion` | Source Completion | `source-completion` | `artifacts/{SOURCE_CODE}_SOURCE_COMPLETION.md` | Terminal artifact |

Each artifact has exactly one producer.
