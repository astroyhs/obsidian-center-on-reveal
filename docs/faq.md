---
title: FAQ
sidebar:
  order: 30
---

# FAQ

### Does this replace Obsidian's auto reveal?

Yes. It disables the built-in file explorer auto reveal on startup (restored on unload) and only
expands, centers, and flashes files that are not under an excluded folder.

### Why does it require Obsidian 1.7.2?

The plugin handles deferred sidebar views through `WorkspaceLeaf.isDeferred` and
`WorkspaceLeaf.loadIfDeferred()`, which are available from Obsidian 1.7.2.

### Does it have settings?

Yes. **Excluded folders** accepts one vault-relative folder path per line. Files at or under
those folders keep Obsidian's default reveal without centering or flashing. Empty by default.

### Does it move focus away from the editor?

No. It reveals the active file through Obsidian's own `revealActiveFile()` path without focusing the
file explorer.

### Why can a row briefly appear before centering?

The row is rendered by Obsidian first, then Center on Reveal moves it to the middle. On slower
machines, that can be visible for a moment.

### Which files are release assets?

Attach `manifest.json` and `main.js` to each GitHub release. There is no `styles.css` in v0.1.0.
