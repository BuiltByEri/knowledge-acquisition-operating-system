# KAOS

![Flagship Framework](https://img.shields.io/badge/Flagship-Framework-8DC63F?style=for-the-badge)

## Knowledge Acquisition Operating System

Transforming chaos into governed knowledge.

KAOS (Knowledge Acquisition Operating System) is an AI-assisted framework for transforming fragmented information into governed, structured knowledge through repeatable acquisition workflows, human approval gates, provenance tracking, and canonical data modeling.

This repository contains KAOS v1.0.0, the approved public framework release.

## What KAOS Is

KAOS is a general knowledge engineering methodology for teams that need to turn fragmented source material into structured, governed knowledge. It defines lifecycle stages, skill contracts, artifacts, approval gates, status and decision models, provenance expectations, and validation boundaries.

KAOS can prepare governed knowledge for:

- RAG
- search
- analytics
- APIs
- knowledge graphs
- recommendation systems
- structured data products
- internal knowledge bases
- AI applications

## The Problem KAOS Solves

Knowledge work often starts with inconsistent source surfaces, duplicate records, conflicting claims, unclear ownership, and undocumented transformations. KAOS creates a repeatable path for discovering knowledge objects, reconciling them against a governed baseline, deciding what should become canonical, preserving provenance, and validating structured outputs.

## Start Here

New users should start with:

- [Quick Start](docs/QUICK_START.md)
- [Knowledge Acquisition Lifecycle](docs/KNOWLEDGE_ACQUISITION_LIFECYCLE.md)
- [Source Profile Template](source-profiles/TEMPLATE.md)
- [Northstar Example](examples/northstar-knowledge-catalog/README.md)
- [Validation](#validation-scripts)

Manual KAOS use is fully supported. The optional KAOS Skill Builder may assist with skill creation or updates, but it is not required to adopt KAOS. Future orchestration is planned, but KAOS v1.0.0 can be used without an orchestrator.

## Installation & Adoption Options

KAOS is not distributed as a package-manager install. Use one of these models:

- Explore KAOS as a reference repository.
- Adopt KAOS inside an existing work repository by copying the approved framework files and choosing local artifact paths.
- Maintain KAOS separately as a governance reference while storing acquisition artifacts elsewhere.
- Use the optional KAOS Skill Builder when creating or updating KAOS-compliant skills.

Record `framework_version: "1.0.0"` in local configuration or acquisition notes when adapting KAOS so future upgrades can be compared safely.

## When to Use KAOS

Use KAOS when knowledge is fragmented across sources, provenance matters, canonical decisions require human governance, AI assists intake or classification, and outputs need repeatability for search, analytics, APIs, knowledge graphs, RAG, or AI systems.

KAOS may be more structure than needed for a one-off disposable transformation with no governed decisions, no provenance requirement, and no human review. Small pilots are still a good fit when traceability matters.

## Design Principles

KAOS follows eight design principles:

- AI accelerates; humans decide.
- Canonical knowledge is governed.
- Provenance is preserved.
- Source conflict is preserved, not silently flattened.
- Acquisition is repeatable.
- Approval boundaries are explicit.
- Downstream outputs must be reproducible.
- The framework is implementation-agnostic.

See `docs/DESIGN_PRINCIPLES.md`.

## Lifecycle Architecture

The explanatory architecture narrative is:

```text
Acquire -> Understand -> Govern -> Plan -> Authorize -> Implement -> Verify -> Certify -> Close
```

The formal KAOS lifecycle remains the 12-stage sequence documented in `docs/KNOWLEDGE_ACQUISITION_LIFECYCLE.md`.

## The 12 KAOS Skills

1. Source Boundary Audit
2. Acquisition Strategy
3. Knowledge Inventory
4. Baseline Reconciliation
5. Editorial Triage
6. Canonical Readiness Review
7. Implementation Planning
8. Implementation Approval
9. Structured Data Implementation
10. Post-Implementation Review
11. Source Certification
12. Source Completion

Frozen skill files live in `skills/`. They are `1.0.0` and `Approved`.

## Core Concepts

- Source boundary: the controlled scope of source material.
- Knowledge object: a source-discovered item that may require classification.
- Canonical entity: a governed structured object approved for downstream use.
- Non-canonical source record: a retained source record that supports traceability without canonical inclusion.
- Provenance: the preserved origin, relationship, transformation, conflict, and decision history.
- Retrieval exposure: whether structured knowledge may be visible to downstream retrieval systems.

## Outputs and Downstream Uses

KAOS produces auditable artifacts, source manifests, canonical entity decisions, provenance records, validation results, certification outcomes, and final completion records. It does not require a specific database, model, vector store, programming language, cloud provider, or orchestration platform.

## Northstar Knowledge Catalog Example

The fictional Northstar Knowledge Catalog demonstrates a small, public-safe acquisition scenario with product, policy, course, service, and research records from five fictional source surfaces. It includes duplicate handling, alias preservation, variant handling, canonical proposals, approved canonical entities, non-canonical source records, provenance, conflicts, retrieval-exposure decisions, and downstream readiness notes. See `examples/northstar-knowledge-catalog/`.

The example demonstrates readiness for downstream indexing or retrieval. It does not implement a working RAG system, search engine, database, or orchestrator.

## Repository Structure

```text
core/                 KAOS Core specification
skills/               Approved KAOS skill contracts
docs/                 Public framework documentation
artifact-templates/   Deferred artifact templates
source-profiles/      Generic profile template and fictional source profile
orchestrator/         Orchestrator boundary documentation
examples/             Fictional public examples
schemas/              KAOS validation schemas
scripts/              KAOS validation scripts
tests/                KAOS validation notes
```

## Getting Started

Use [docs/QUICK_START.md](docs/QUICK_START.md) for the first 15-30 minutes. Then read `docs/KAOS_OVERVIEW.md`, the lifecycle, skills, artifact catalog, and status model. Use the Northstar example to see how the concepts fit together.

## Validation Scripts

KAOS validation scripts live in `scripts/`.

- `validate-skills.mjs` checks the expected KAOS 1.0.0 skill set, metadata values, lifecycle routing, approval gates, status values, decision values, required sections, and artifact producer ownership. It is not a general-purpose YAML parser or JSON Schema validation engine.
- `scan-forbidden-terms.mjs` checks a maintained set of known private-reference and secret-like risks. It cannot guarantee the absence of all confidential, proprietary, or domain-specific content.
- `validate-links.mjs` checks local Markdown file links inside the workspace. It does not validate anchors, external URLs, generated files, or semantic correctness.

## Human Governance Model

KAOS is AI-assisted, not fully automated. AI may help discover, compare, draft, classify, and validate. Human approval gates remain authoritative for governance decisions.

## Project Status

KAOS v1.0.0 is the frozen public foundation release. The Core specification and twelve lifecycle skills are approved. Current post-release work focuses on adoption documentation, examples, templates, and validation improvements without changing the approved methodology.

## Roadmap

See [ROADMAP.md](ROADMAP.md) for directional release planning.

## Contributing

See `CONTRIBUTING.md`.

## Citation

Citation metadata is available in [CITATION.cff](CITATION.cff).

## License

SPDX-License-Identifier: Apache-2.0

KAOS is licensed under the Apache License 2.0. See `LICENSE`.
