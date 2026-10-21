<div align="center">

<img src="assets/logo.svg" width="96" height="96" alt="Center on Reveal logo">

# Center on Reveal

[![Main](https://github.com/toadfans/obsidian-center-on-reveal/actions/workflows/main.yml/badge.svg)](https://github.com/toadfans/obsidian-center-on-reveal/actions/workflows/main.yml) [![Obsidian plugin](https://raw.githubusercontent.com/wiki/toadfans/obsidian-center-on-reveal/assets/plugin.svg)](https://community.obsidian.md/plugins/center-on-reveal) [![Obsidian minimal version](https://raw.githubusercontent.com/wiki/toadfans/obsidian-center-on-reveal/assets/min-version.svg)](https://community.obsidian.md/plugins/center-on-reveal) ![License](https://raw.githubusercontent.com/wiki/toadfans/obsidian-center-on-reveal/assets/license.svg)

</div>

Center on Reveal keeps Obsidian's file explorer focused on the active file. It takes over file
revealing: the built-in auto reveal is disabled, and only non-excluded files are expanded, centered,
and flashed with Obsidian's native highlight.

## Behavior

- Disables the built-in file explorer auto reveal on startup and restores it on unload.
- Expands, centers, and flashes the active file row when it is not excluded.
- Skips excluded folders entirely: files under **Settings → Center on Reveal → Excluded folders** leave the explorer untouched (empty by default, so everything is centered).
- Does not add commands, network calls, telemetry, or custom CSS.

## Requirements

- Obsidian 1.7.2 or newer.
- File explorer enabled in the left sidebar.

## Documentation

- [Getting started](docs/getting-started.md)
- [How it works](docs/how-it-works.md)
- [FAQ](docs/faq.md)
