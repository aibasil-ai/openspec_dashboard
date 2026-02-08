# OpenSpec Progress Dashboard

A `Next.js + TypeScript` dashboard for tracking OpenSpec project progress.

## What this app tracks from OpenSpec

The app reads an OpenSpec workspace structure and derives progress views:

- `openspec/config.yaml`: editable config with YAML validation + lint hints
- `openspec/changes/*`: in-progress changes
- `openspec/changes/archive/*`: archived changes
- `openspec/specs/*/spec.md`: spec capability list

From those files it computes:

- Overview stats: in-progress, specs, archived, stalled
- Task completion (`done/total`) per change
- Spec delta summary (`ADDED / MODIFIED / REMOVED`) for archived changes

## Browser mode strategy

- **Chrome / Edge 109+**: full read-write mode using File System Access API
- **Safari / Firefox**: fallback read-only mode (folder import + preview)
- UI shows current mode: `Chrome/Safari/Firefox` hint badge

## Features

- Open local OpenSpec project folder
- Import folder in fallback read-only mode
- Recent projects quick switch
- Language toggle (`繁中 / English`)
- Theme toggle (`dark / light`)
- Tabs: `Overview / In Progress / Specs / Archived`
- Clickable overview cards for tab navigation
- Markdown rendering for all detail content
- Config editor + markdown preview + schema/lint validation
- Delete in-progress/archived items (write mode only)
- Delete backup + operation log with retention cleanup policy

## Run

```bash
cd web
npm install
npm run dev
```

Open http://localhost:3000

## Quality checks

```bash
npm run lint
npm run test
npm run build
```

## Test coverage included

- Unit: OpenSpec parser summaries + config YAML validation
- Integration: tab routing trigger, config save flow, delete flow
