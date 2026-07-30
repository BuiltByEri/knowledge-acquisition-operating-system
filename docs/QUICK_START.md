# KAOS Quick Start

This guide helps you complete a first KAOS Source Boundary Audit in about 15-30 minutes.

KAOS can be used manually. The optional KAOS Skill Builder can assist with skill creation or updates, but it is not required for a first acquisition. Future orchestration is planned, but no orchestrator is required for KAOS v1.0.0 adoption.

## Prerequisites

- Git.
- Markdown editor.
- Node.js, only if you want to run the validation scripts.
- A repository or workspace where KAOS guidance and acquisition artifacts can live.
- A human reviewer who can approve, reject, or request review of governed decisions.

## Installation Models

KAOS is not distributed as a package-manager install.

Explore: clone this repository and read the framework as a reference.

Adopt: copy the approved KAOS framework files into an existing work repository, then choose workspace-relative paths for local artifacts.

Reference: keep KAOS in a separate repository and store acquisition artifacts in your own workspace while citing the KAOS version used.

Optional Builder: use the KAOS Skill Builder only when creating or updating KAOS-compliant lifecycle skills. Basic KAOS use does not require the builder.

Record the framework version in local setup notes when adapting KAOS:

```yaml
framework_version: "1.0.0"
```

This helps compare local changes against future KAOS releases.

## First Acquisition

1. Select an artifact root.

   Recommended default:

   ```text
   docs/knowledge-acquisition
   ```

2. Create a source profile.

   Copy `source-profiles/TEMPLATE.md` into the configured `source_profiles_root`. Using the recommended configuration:

   ```text
   source-profiles/{SOURCE_CODE}.md
   ```

   Preserve the distinction between source guidance and governed artifacts:

   ```text
   source-profiles/              Source-specific operating guidance
   docs/knowledge-acquisition/   Governed acquisition artifacts
   ```

   Fill in source identity, source surfaces, included objects, excluded objects, known conflicts, provenance expectations, and approval notes.

3. Initialize the active source manifest.

   Before invoking Source Boundary Audit, create or update `manifest.active_source_acquisition` in your chosen manifest store. KAOS does not require a specific manifest file format.

   The active manifest should record the approved source entry point (`input.source_entry_point`), source code, source name, `framework_version: "1.0.0"`, current stage `source-boundary-audit`, applicable KAOS status and decision values, and the expected Source Boundary Audit artifact path.

4. Draft the Source Boundary Audit.

   Copy `artifact-templates/SOURCE_BOUNDARY_AUDIT_TEMPLATE.md` into the artifact root. Name it with a clear source code, for example:

   ```text
   docs/knowledge-acquisition/{SOURCE_CODE}/{SOURCE_CODE}_SOURCE_BOUNDARY_AUDIT.md
   ```

5. Use the Source Boundary Audit skill.

   Read `skills/source-boundary-audit/SKILL.md`. Fill the starter artifact with the acquisition name, source, purpose, included scope, excluded scope, access constraints, assumptions, source conflicts, batching decision, known risks, blockers, human review, and next stage.

6. Record human review.

   A human reviewer records the applicable KAOS-approved status and decision values.

   Approved status values:

   - `Not Started`
   - `In Progress`
   - `Ready`
   - `Blocked`
   - `Completed`

   Approved decision values:

   - `Approved`
   - `Approved With Notes`
   - `Rejected`
   - `Human Review Required`
   - `Not Applicable`

   Review notes should explain what is authorized and what is not authorized. Acquisition Strategy must not begin while the source boundary remains unresolved.

7. Update the manifest after the audit.

   Source Boundary Audit produces `manifest.source_boundary_state`. Update the active manifest with the produced artifact reference, source-boundary status, source-boundary decision, blockers when present, route reason, and next permitted stage.

   Acquisition Strategy requires both the Source Boundary Audit artifact and complete `manifest.source_boundary_state`. Do not begin Acquisition Strategy unless the manifest records a permitted transition to `acquisition-strategy`.

8. Run validation when Node.js is available.

   ```bash
   node scripts/validate-skills.mjs
   node scripts/scan-forbidden-terms.mjs
   node scripts/validate-links.mjs
   ```

   These checks validate the public framework package. They do not replace human review of your acquisition artifact.

9. Identify the next lifecycle stage.

   If the Source Boundary Audit artifact and manifest state permit the transition, the next stage is `acquisition-strategy`.

## Successful First Acquisition

The first acquisition is complete when:

- The artifact root is selected.
- `framework_version: "1.0.0"` is recorded in setup notes or configuration.
- A source profile exists.
- `manifest.active_source_acquisition` exists.
- The approved source entry point is recorded as `input.source_entry_point`.
- A Source Boundary Audit artifact exists.
- Included and excluded scope are clear.
- Access constraints, assumptions, source conflicts, batching decision, known risks, and blockers are recorded.
- Human review records an approved KAOS status value, an approved KAOS decision value, notes, and authorization.
- `manifest.source_boundary_state` is updated with the artifact reference, status, decision, blockers when present, route reason, and next permitted stage.
- Validation has been run when available.
- The next lifecycle stage is identified from the completed manifest state.
