---
title: How it works
sidebar:
  order: 20
---

# How it works

## What Obsidian already does

Obsidian's file explorer has a built-in auto reveal mode. When the active file changes, Obsidian
expands parent folders and scrolls the active row into view without moving editor focus.

Center on Reveal takes over this behavior: it disables the built-in auto reveal on startup and only
reveals files that are not excluded.

## Runtime model

`src/main.ts` only wires the plugin lifecycle. `src/center-on-reveal.ts` contains the reveal,
centering, and flash logic.

On layout ready, the plugin finds the first `file-explorer` leaf, loads it if it is deferred, and
calls the internal `setAutoReveal(false)` method to stop Obsidian from revealing on its own.

On every `file-open` event, the plugin skips excluded files entirely. For other files it calls the
internal `revealActiveFile()` to expand parents, waits until the active row is rendered, centers it
inside `.nav-files-container`, and applies Obsidian's built-in `is-flashing` class.

## Centering

The plugin compares the scroller and active row positions with `getBoundingClientRect()`, then updates
`scrollTop` so the row midpoint aligns with the file explorer viewport midpoint.

If the row is not rendered yet, the plugin retries for a few animation frames and then stops.

## Highlighting

The plugin reuses Obsidian's `is-flashing` class. It keeps one timeout, clears the previous flash when
the active row changes, and forces a reflow only when the same row is flashed again.

## Boundaries

The plugin has no commands, network calls, or telemetry. Its only setting is **Excluded folders**:
one vault-relative folder path per line. When the active file is at or under an excluded folder,
the plugin does nothing: Obsidian's default reveal stays disabled, so the explorer keeps its current
scroll position and expansion state.

The plugin does not implement its own file tree traversal. Obsidian remains responsible for finding
the active file, expanding parent folders, and rendering the row.
