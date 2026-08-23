# 1.3-custom-instructions

## Concepts
- Custom instructions = an always-on "house style guide" for Copilot,
  applied automatically to every chat interaction in this repo — unlike
  the @agentforge-mentor agent, which is a persona deliberately invoked
  for specific work.
- Lives at `.github/copilot-instructions.md`, read automatically by
  Copilot Chat in this workspace, no invocation needed.
- Verified it actually works by asking Copilot an HTTP-library question —
  it answered httpx, citing the instructions file AND real project files
  (fetch_weather.py, post_auth_demo.py) as grounding, not guessing.

## Exercise
Created `.github/copilot-instructions.md` codifying conventions already
established in Phase 0: httpx over requests/urllib, async by default,
pydantic for models, .env for config, type hints everywhere, no
unrequested complexity. Tested it live — Copilot correctly applied and
cited it.

## Key Commands / Code
File: `.github/copilot-instructions.md` (repo root)

## Checkpoint
- [x] Created .github/copilot-instructions.md
- [x] Verified Copilot actually reads and applies it (tested live)
- [x] Instructions reflect real, already-established project conventions

## Notes & Things to Revisit
- Good habit going forward: whenever a new convention gets established
  (e.g. in Phase 2's Docker patterns), add it to this file so Copilot
  stays in sync automatically.
