# Knowledge Acquisition Lifecycle

The KAOS lifecycle is a governed sequence for acquiring fragmented knowledge and preparing structured outputs.

## Formal Stages

| Order | Stage ID | Stage Name | Narrative |
|---:|---|---|---|
| 1 | `source-boundary-audit` | Source Boundary Audit | Acquire |
| 2 | `acquisition-strategy` | Acquisition Strategy | Acquire |
| 3 | `knowledge-inventory` | Knowledge Inventory | Acquire |
| 4 | `baseline-reconciliation` | Baseline Reconciliation | Understand |
| 5 | `editorial-triage` | Editorial Triage | Understand |
| 6 | `canonical-readiness-review` | Canonical Readiness Review | Govern |
| 7 | `implementation-planning` | Implementation Planning | Plan |
| 8 | `implementation-approval` | Implementation Approval | Authorize |
| 9 | `structured-data-implementation` | Structured Data Implementation | Implement |
| 10 | `post-implementation-review` | Post-Implementation Review | Verify |
| 11 | `source-certification` | Source Certification | Certify |
| 12 | `source-completion` | Source Completion | Close |

## Conditional Route

Canonical Readiness Review runs only when Editorial Triage proposes one or more new canonical entities. If no new canonical entities are proposed and other approved work remains, Editorial Triage may route directly to Implementation Planning.

Empty inventories and intentional no-change implementation outcomes still require governed closure:

- Empty Inventory Path: `knowledge-inventory` -> `source-certification` -> `source-completion`
- Intentionally Skipped Implementation Path: `implementation-approval` -> `post-implementation-review` -> `source-certification` -> `source-completion`
- Standard Implementation Path: `implementation-approval` -> `structured-data-implementation` -> `post-implementation-review` -> `source-certification` -> `source-completion`

These routes preserve certification and completion without requiring implementation work when no implementation scope exists.

## Repository Workflow Boundary

Commit, push, merge, and review request actions are outside the KAOS Skill Library.

## Downstream Readiness Boundary

KAOS may prepare governed structures for downstream indexing, retrieval, analytics, APIs, knowledge graphs, RAG, or AI applications. Readiness does not mean those downstream systems have been implemented.
