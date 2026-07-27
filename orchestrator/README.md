# Orchestrator

This directory is reserved for future orchestration guidance.

KAOS v1.0.0 defines lifecycle contracts but does not require a particular orchestrator implementation. A future orchestrator may read skill metadata, inspect source manifests, validate artifacts, and route the next lifecycle stage.

An orchestrator must preserve these boundaries:

- It may route skills according to metadata.
- It may validate required inputs and outputs.
- It may prepare status summaries.
- It must not bypass approval gates.
- It must not alter upstream decisions silently.
- It must not treat skill state as source acquisition status.
