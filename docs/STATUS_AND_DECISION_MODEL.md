# Status and Decision Model

KAOS separates workflow progress from governance judgment.

Status answers: Where is the work?

Decision answers: What was decided?

## Status Values

- `Not Started`
- `In Progress`
- `Ready`
- `Blocked`
- `Completed`

## Decision Values

- `Approved`
- `Approved With Notes`
- `Rejected`
- `Human Review Required`
- `Not Applicable`

## Editorial Dispositions

KAOS v1.0.0 public disposition vocabulary:

- `APPROVE_NEW_CANONICAL`
- `MAP_TO_EXISTING`
- `ENTITY_VARIANT`
- `NON_CANONICAL_SOURCE_RECORD`
- `SUPPORTING_CONTEXT_ONLY`
- `NEEDS_EDITORIAL_REVIEW`
- `EXCLUDE`
- `HUMAN_REVIEW`

Dispositions are record-level outcomes, not KAOS status or decision values.

## Canonical Readiness Outcomes

- `Ready`
- `Ready With Notes`
- `Rejected`
- `Human Review Required`

## Post-Implementation Review Outcomes

- `APPROVE`
- `APPROVE_WITH_NOTES`
- `REMEDIATION_REQUIRED`
- `HUMAN_REVIEW_REQUIRED`

## Approval Gates

- `gate.canonical-readiness-review.canonical-approval`
- `gate.implementation-approval.implementation-authorization`
- `gate.source-certification.certification-approval`
