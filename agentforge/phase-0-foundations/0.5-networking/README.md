# 0.5-networking

## Concepts
- Mental model: IP address = building address, port = apartment number
  inside that building. One IP can have thousands of independent ports.
- `localhost` / `127.0.0.1` = "this machine talking to itself" — only
  reachable from the same machine.
- `0.0.0.0` = "accept connections from outside too," not an address itself —
  this is why Docker/FastAPI configs bind to `0.0.0.0`, not `127.0.0.1`.
- A machine's real network IP (e.g. `192.168.x.x`) is reachable by anything
  on the same network — unlike localhost, which only means something to
  the machine itself.
- Security groups (AWS, later) are the same "who's allowed to knock on
  which port" concept, just enforced by AWS instead of locally.

## Exercise
Ran a local server (`python3 -m http.server 9000`), accessed it via
`localhost:9000` from the same machine, found the machine's local network
IP, and accessed the same server from a phone on the same WiFi network —
directly observing the difference between localhost and a real network address.

## Key Commands
```bash
python3 -m http.server 9000
ipconfig getifaddr en0
```

## Checkpoint
- [x] Understand IP address vs port (building/apartment mental model)
- [x] Understand localhost vs a real network-reachable address
- [x] Understand what 0.0.0.0 means and why containers use it
- [x] Understand TCP vs UDP and HTTP vs HTTPS at a one-sentence level

## Notes & Things to Revisit
- Security groups will make more concrete sense once actually configuring
  one in AWS (Phase 3) — this was the conceptual groundwork only.
