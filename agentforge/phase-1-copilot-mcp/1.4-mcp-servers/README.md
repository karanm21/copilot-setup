# 1.4-mcp-servers

## Concepts
- Copilot's world ends at your machine by default — MCP servers punch a
  hole in that wall, giving it specific, pre-approved external capabilities.
- Config lives in `.vscode/mcp.json` (workspace-level, committable) or
  User Configuration (personal, cross-project).
- A server can be `"type": "http"` (remote, hosted elsewhere — e.g. GitHub's
  official server) or `"command"`-based (runs locally on your machine).
- MCP tools ONLY work in Agent mode, not Ask mode — easy to forget.
- Trust tiers matter: official/verified servers (like GitHub's) get
  lighter per-action confirmation than unknown third-party servers would.
  Worth being extra cautious with untrusted servers, especially for
  destructive or high-stakes actions.

**Intuition:** Copilot is a capable employee with no phone, stuck with
whatever's on the desk. An MCP server hands it a phone with specific
numbers pre-programmed — not general internet access, just the exact
lines you've explicitly approved.

## Exercise
Added the official GitHub MCP server (HTTP type, zero local setup) via
VS Code's "Add Server" UI. Started and connected it — 44 tools, 2 prompts
became available. Verified end-to-end by asking Copilot Agent mode to
create a real GitHub issue; confirmed it appeared on github.com, not just
in chat.

## Key Commands / Code
`.vscode/mcp.json`:
```json
{
  "servers": {
    "github": {
      "url": "https://api.githubcopilot.com/mcp",
      "type": "http"
    }
  },
  "inputs": []
}
```
Command Palette: `MCP: Add Server...` → HTTP → paste URL → name it →
`Start` via the inline CodeLens.

## Checkpoint
- [x] Understand the MCP client/server mental model
- [x] Configured an MCP server via `.vscode/mcp.json`
- [x] Confirmed it's running (tool count visible)
- [x] Used it successfully in Agent mode, verified real-world effect
      (issue created on actual GitHub repo)

## Notes & Things to Revisit
- Didn't get a per-action approval dialog for this trusted first-party
  server — noted as a trust-tier pattern to watch for with future,
  less-established servers.
- Optional follow-up (not required now): try adding a second server from
  the registry (`@mcp` in Extensions panel) for practice — e.g. Context7
  or Playwright.
