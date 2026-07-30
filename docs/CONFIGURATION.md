# KAOS Configuration

KAOS v1.0.0 does not require a configuration file for Core compliance.

Configuration is implementation guidance. It helps teams keep paths portable, document local adoption choices, and preserve compatibility with future KAOS releases.

## Recommended Convention

Projects may use `kaos.config.yaml` at the workspace root:

```yaml
kaos:
  framework_version: "1.0.0"
  workspace_root: "."
  artifact_root: "docs/knowledge-acquisition"
  skills_root: "skills"
  core_path: "core/KAOS_SKILL_SPECIFICATION.md"
  source_profiles_root: "source-profiles"
```

If your local copy renames the Core file, set `core_path` to the path used in your repository.

## Recommended Defaults

- `framework_version`: the KAOS release your local adoption is based on.
- `workspace_root`: the root used to resolve KAOS paths.
- `artifact_root`: where acquisition artifacts are stored.
- `skills_root`: where KAOS lifecycle skills are stored.
- `core_path`: where the KAOS Core specification is stored.
- `source_profiles_root`: where source profiles are stored.

These fields are recommended, not required by KAOS Core.

## Workspace Roots

Resolve local KAOS paths from one workspace root. This keeps acquisition artifacts, source profiles, and validation references stable even when commands run from nested directories.

Use relative paths whenever possible. Avoid user-specific absolute paths so the repository can move between machines and workspaces.

## Worktrees

When using Git worktrees, treat the active worktree root as the workspace root for that task. Do not write artifacts into a sibling worktree unless a human explicitly chose that destination.

Before creating artifacts, confirm:

- the active worktree;
- the resolved workspace root;
- the artifact root;
- the target artifact path.

## Path Safety

Portable KAOS paths should:

- stay inside the workspace root;
- avoid absolute user paths;
- avoid hidden editor or cache directories;
- avoid generated temporary directories unless the task is explicitly temporary;
- preserve the configured artifact root.

If a path resolves outside the workspace root, stop and correct the configuration before writing artifacts.

## Future Builder Compatibility

The KAOS Skill Builder is planned for v1.1 tooling. The workspace-root and artifact-root convention is intended to remain compatible with that future builder when it ships. Manual KAOS use is fully supported in v1.0.0.

Configuration does not change KAOS methodology, lifecycle stages, approval gates, status values, decision values, artifact ownership, or provenance rules.

## Version Traceability

Record `framework_version: "1.0.0"` in configuration or setup notes when adapting KAOS. Version traceability helps teams:

- compare local changes against future KAOS releases;
- understand which Core rules governed an acquisition;
- preserve local customization decisions during upgrades;
- rerun validation after pulling a newer framework version.
