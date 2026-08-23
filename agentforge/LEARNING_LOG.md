# Learning Log 📓

A running record of every session — what I learned, what I built, what I struggled with.

---

## Session 1 — August 2026

**Phase:** 0 (Foundations) + Setup
**Topic:** Repo setup, SSH keys, Git from terminal, Phase 0 environment check

### What I did
- Set up SSH key on macOS and linked it to GitHub
- Cloned the repo using SSH
- Structured the full AgentForge repo with phase folders
- Ran Phase 0 environment check, fixed Python version conflicts

### Environment Check Results
| Tool | Version | Status |
|------|---------|--------|
| git | 2.52.0 | ✅ |
| python | 3.13.9 (Anaconda) | ✅ |
| node | v24.12.0 | ✅ |
| pip | 25.3 | ✅ |
| SSH → GitHub | authenticated | ✅ |

### Notes
- Had 3 Pythons on the system (Anaconda 3.13, Homebrew 3.10, system) — standardised on Anaconda 3.13
- SSH key type: ed25519

### Checkpoint
- [x] Git configured with name + email
- [x] SSH key created and added to GitHub
- [x] Repo cloned via SSH
- [x] Folder structure created

---
<!-- Add new sessions below this line, newest at the top -->

## Session 2 — August 2026

**Phase:** 0.1 (Python) ✅, 0.2 (Git/GitHub) ✅, plus agent tooling setup
**Topic:** Async Python exercise, git branching + PRs, custom Copilot agents

### What I did
- Built `fetch_weather.py`: async httpx CLI tool with .env config, retries,
  error handling — completed Phase 0.1
- Practiced reviewing Copilot-generated code against actual requirements
  (caught sync-vs-async drift, wrong env var names, unrequested complexity
  across 3 iterations)
- Learned git branching workflow: created feature branch, committed, pushed,
  opened and merged first Pull Request, cleaned up locally — completed Phase 0.2
- Created two custom Copilot agents in `.github/agents/`:
  `python-mcp-coder.agent.md` (improved existing one) and
  `agentforge-mentor.agent.md` (new — encodes the teaching/doc-sync approach
  used in this learning series, invokable via @agentforge-mentor in Copilot Chat)

### Checkpoint
- [x] Phase 0.1 fully complete
- [x] Phase 0.2 fully complete
- [x] Custom agents committed to repo

### Notes
- Key meta-lesson: Copilot output needs active review, not passive acceptance
  — it will confidently produce code that's well-written but doesn't match
  the actual goal, and will drift further if patched iteratively instead of
  restarted clean.
- Established standing practice: subtopic README updated the moment an
  exercise is verified, phase README updated when all subtopics done,
  LEARNING_LOG.md entry every session, commit+push docs alongside code.

---

## Session 3 — August 2026

**Phase:** 0.3, 0.4, 0.5 — Phase 0 fully complete
**Topic:** REST APIs (POST/auth), terminal (grep/pipes/permissions), networking mental model

### What I did
- Walked through POST + Authorization headers piece by piece (payload →
  headers → async client.post → response parsing), built and ran
  `post_auth_demo.py`, verified both payload and auth token round-tripped
  correctly via httpbin.org
- Ran grep, pipes, and permissions commands with the "highlighter /
  assembly line / hotel keycard" mental models
- Ran a local HTTP server, accessed via localhost, then accessed from a
  phone on the same WiFi using the machine's real network IP — directly
  observed the localhost vs network-address distinction

### Checkpoint
- [x] Phase 0 fully complete — all 5 subtopics done

### Notes
- Learned to slow down and build intuition (analogies) before typing any
  code, rather than dropping full files at once — retained concepts much
  better this way. Keep this pace for Phase 1 onward.

---
