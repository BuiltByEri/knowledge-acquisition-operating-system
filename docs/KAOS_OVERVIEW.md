# KAOS Overview

KAOS is the Knowledge Acquisition Operating System.

KAOS (Knowledge Acquisition Operating System) is an AI-assisted framework for transforming fragmented information into governed, structured knowledge through repeatable acquisition workflows, human approval gates, provenance tracking, and canonical data modeling.

## Positioning

KAOS is broader than any single downstream use case. It can prepare governed structured knowledge for RAG, search, analytics, APIs, knowledge graphs, recommendation systems, structured data products, internal knowledge bases, and AI applications.

Preparation means the governed structures are suitable for downstream indexing, retrieval, analysis, or application integration. KAOS does not require those downstream systems to be implemented inside the lifecycle.

## Architecture Narrative

```text
Acquire -> Understand -> Govern -> Plan -> Authorize -> Implement -> Verify -> Certify -> Close
```

This narrative explains the work. It does not replace the formal 12-stage lifecycle.

## Release Baseline

| Component | Version | State |
|---|---:|---|
| KAOS Skill Specification | 1.0.0 | Approved |
| KAOS Skill Library | 1.0.0 | Approved |
| Northstar Knowledge Catalog example | 1.0.0 | Approved |

## Repository Areas

- `core/`: KAOS Core rules and skill contract.
- `skills/`: Approved stage skills.
- `docs/`: Public framework documentation.
- `artifact-templates/`: Deferred template area.
- `source-profiles/`: Source profile template and fictional profile.
- `orchestrator/`: Orchestrator boundary documentation.
- `examples/`: Fictional public examples.
- `schemas/`, `scripts/`, `tests/`: Release validation assets.

## Northstar Example

The Northstar Knowledge Catalog example uses five fictional source surfaces and a small mixed set of product, policy, course, service, and research records. It demonstrates duplicate, alias, variant, conflict, non-canonical, provenance, exposure, RAG-readiness, and search-readiness decisions without implementing a downstream retrieval system.
