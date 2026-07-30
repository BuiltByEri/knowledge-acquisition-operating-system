# Customizing KAOS

## Customization Principle

Customize implementation and domain vocabulary without weakening governance.

KAOS is designed to adapt to different knowledge domains and repository layouts. Local changes should preserve the approved lifecycle, approval boundaries, artifact ownership, status model, decision model, provenance expectations, and stop-condition behavior.

## Safe

These areas are safe to customize for local adoption:

- repository layout;
- source profiles;
- artifact locations;
- examples;
- domain vocabulary;
- source-specific rules;
- output formats.

Record `framework_version: "1.0.0"` in local setup notes or configuration so future upgrades can identify the KAOS baseline used.

## Review Recommended

These changes should receive human review before adoption:

- validators;
- artifact templates;
- canonical entity types;
- retrieval exposure;
- manifest conventions.

Review should confirm that local changes preserve traceability, human approval, and downstream reproducibility.

## KAOS Extension Required

These changes alter framework behavior and should be treated as KAOS extensions:

- lifecycle stages;
- lifecycle order;
- approval ownership;
- artifact ownership;
- status model;
- decision model;
- provenance rules;
- stop conditions.

Do not present these changes as plain local configuration. They require explicit extension design, compatibility review, and Product Review before approval.

## Frozen Core

The following governance behaviors are frozen for KAOS v1.0.0:

- human approval gates remain authoritative;
- status values remain separate from decision values;
- record-level outcomes remain separate from KAOS status and decision values;
- every artifact has exactly one producing skill;
- downstream skills may consume upstream artifacts but must not silently rewrite upstream decisions;
- lifecycle routing must preserve certification and completion paths;
- source conflict must be preserved rather than silently flattened;
- provenance must remain traceable;
- repository workflow actions are outside KAOS lifecycle skills;
- structured outputs must remain reproducible from governed inputs and decisions.

## Skill Editing

Before editing a lifecycle skill, prefer:

- a source profile for source-specific behavior;
- an artifact template for output shape;
- a validator for repeatable checks.

When a skill edit is truly needed, preserve:

- skill IDs;
- routing;
- dependencies;
- approval ownership;
- artifact ownership;
- version history.

Modified skills should remain in a pre-approval state until Product Review approves them. Do not mark a locally modified skill as `Approved` unless the modified version has completed review.

## Staying Compatible

Track the KAOS framework version used by each local adoption:

```yaml
framework_version: "1.0.0"
```

For upgrades:

1. Compare local files against the new KAOS release.
2. Identify local modifications before replacing files.
3. Preserve source profiles, local artifact roots, source-specific validators, and local examples when they remain compatible.
4. Recheck skill metadata, lifecycle routing, artifact ownership, approval gates, status values, decision values, and links.
5. Rerun validation after the upgrade.
6. Send material skill or governance changes through Product Review before approval.

Local customization is compatible when it strengthens adoption without weakening KAOS governance.
