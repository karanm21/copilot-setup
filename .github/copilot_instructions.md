# AgentForge — Copilot Instructions

## Tech Stack
- Python 3.11+
- Async by default for anything doing I/O (HTTP calls, file access)
- `httpx` for HTTP requests — never `requests` or `urllib`
- `pydantic` for structured data models
- `python-dotenv` + `os.getenv()` for configuration — never hardcode secrets

## Code Style
- Type hints on every function signature and return type
- Docstrings on every public function
- Functions under ~30 lines, single-purpose
- No unrequested complexity: no defensive try/except around installed
  packages, no connection pooling or caching unless explicitly asked,
  no unused config options "just in case"

## Project Structure
- Source code in `agentforge-project/src/`
- Each learning topic documented in its own `phase-N/N.M-topic/README.md`
- `.env` for local secrets (never committed); `.env.example` as the template

## Workflow Expectations
- Explain non-obvious code choices in comments
- If unsure which package/pattern to use, prefer the simplest option that
  matches the existing codebase conventions above