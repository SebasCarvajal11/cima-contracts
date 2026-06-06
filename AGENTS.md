# AGENTS

## Purpose

`cima-contracts` owns versioned integration contracts shared between CIMA CRM services. It must remain small, explicit, and safe to publish independently.

## Architecture Rules

- Keep contracts backwards compatible within the same major version.
- Additive fields are allowed in minor versions when consumers can ignore unknown fields.
- Breaking schema changes require a major version bump and a migration note.
- Runtime validation schemas and TypeScript types must be exported from the same source file.

## Development Rules

- Use `pnpm` only. Never add `npm` commands, lockfiles, or documentation.
- Validate with `pnpm test` and `pnpm build` before publishing.
- Keep publication metadata in `package.json`; do not distribute manual `.tgz` artifacts to service repos.
