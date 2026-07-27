# Tests

KAOS v1.0.0 uses lightweight validation scripts for the public release:

- `../scripts/validate-skills.mjs` checks the expected KAOS 1.0.0 skill set, selected metadata values, lifecycle routing, approval gates, status values, decision values, required sections, and artifact producer ownership. It is not a general-purpose YAML parser and does not perform full JSON Schema validation.
- `../scripts/scan-forbidden-terms.mjs` checks a maintained set of known private-reference and secret-like risks, including configured blocked terms, absolute user paths, email addresses, long git revisions, and secret-like assignments. It cannot guarantee the absence of all confidential, proprietary, or domain-specific content.
- `../scripts/validate-links.mjs` checks local Markdown file links inside the workspace. It skips anchors, external URLs, generated files, and semantic link correctness.

These checks are release safeguards. They are not a substitute for human review.

Additional release-readiness review should still include manual source-neutrality review, schema parsing, YAML front matter parsing, Northstar cross-file ID checks, and repository whitespace checks.
