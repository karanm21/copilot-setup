# 0.1-python

## Concepts
- venv vs conda: Anaconda has its own env system, but Docker images only have
  plain Python, so `venv` is the standard to build habits around — chose
  venv over conda for this project specifically for that reason.
- `python -m pip install X` is safer than bare `pip install X` — bypasses
  shell aliases (learned the hard way: an old `pip3` alias from an earlier
  Python-version fix kept silently pointing to Anaconda even inside an
  active venv).
- requirements.txt (`pip freeze > requirements.txt`) makes an environment
  reproducible from nothing — proved this by deleting and rebuilding the
  venv from the file alone. This is exactly what Docker will do in Phase 2.
- async/await: `await` pauses a function while waiting on I/O (network, etc.)
  without freezing the whole program. Only mark a function `async` if it
  awaits something inside it.
- Config (.env) is for settings that don't change per-run (API URLs, timeouts).
  Runtime data (like coordinates) belongs in CLI args, not .env.
- Fallback defaults (`os.getenv("X", "default")`) are fine for non-secret
  config; secrets should have NO fallback — fail loudly if missing.

## Exercise
Built `fetch_weather.py` — async CLI tool that fetches weather from the
Open-Meteo API, with .env-based config, retries with exponential backoff,
and saves output as JSON. Verified working for Delhi (28.6, 77.2).

## Key Commands
```bash
python -m venv venv
source venv/bin/activate
python -m pip install httpx python-dotenv
python -m pip freeze > requirements.txt
python src/fetch_weather.py 28.6 77.2
```

## Checkpoint
- [x] Created and activated a project-specific venv
- [x] Generated and verified requirements.txt (rebuild-from-scratch tested)
- [x] Wrote an async function using httpx + await
- [x] Loaded config from .env with os.getenv()
- [x] Handled errors (timeout, HTTP errors) with try/except

## Notes & Things to Revisit
- **Copilot lesson #1:** first Copilot draft used sync `urllib` + CLI-arg
  config instead of the async/`.env` pattern the exercise called for —
  technically correct code, wrong learning target. Lesson: tell Copilot
  *why* you're writing something, not just *what*.
- **Copilot lesson #2:** iterative prompting on an already-confused file
  compounded the problem (deleted functions, wrong env var names) rather
  than fixing it. Better to restart from a clean version than keep patching.
- **Copilot lesson #3:** Copilot tends to over-engineer toward
  "production-grade" on open-ended prompts — unused try/except wrapping,
  connection pooling for a single request, unused API key handling.
  Review generated code line by line against what was actually asked.
- Old `pip3` alias from an earlier Python-fixing session still overrides
  inside venvs — use `python -m pip` as the safe default going forward.
