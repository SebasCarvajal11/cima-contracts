# @cima/contracts

Versioned integration contracts for CIMA CRM services.

## Scope

This package owns runtime schemas and TypeScript types for cross-service messages. Service repositories should consume a released package version instead of copying `.tgz` artifacts.

## Release Rules

- Patch versions fix contract implementation details without changing accepted payloads.
- Minor versions add backwards-compatible fields or event types.
- Major versions introduce breaking schema changes.

Consumers should pin an explicit version, for example:

```json
{
  "dependencies": {
    "@cima/contracts": "0.1.0"
  }
}
```

## Commands

```powershell
pnpm install
pnpm test
pnpm build
pnpm pack:dry-run
```

Publication must run through `pnpm publish` after CI passes. Do not copy generated tarballs into service repositories.
