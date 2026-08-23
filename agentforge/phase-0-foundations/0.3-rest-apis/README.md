# 0.3-rest-apis

## Concepts
- GET = asking for data (no body sent); POST = sending data to be
  created/processed (has a body).
- Headers are metadata about the request, separate from the body —
  e.g. what format the body is in (`Content-Type`), or proof of identity
  (`Authorization`).
- `Authorization: Bearer <token>` is the standard auth pattern — same
  mechanism used by the Claude/OpenAI APIs in Phase 4.
- `httpx.AsyncClient().post(url, json=payload, headers=headers)` — httpx
  auto-converts a Python dict to JSON on the way out, and `.json()` parses
  the JSON response back into a dict on the way in.
- `response.raise_for_status()` turns a bad status code into a Python
  exception instead of silently continuing.

## Exercise
Built `post_auth_demo.py` — sends a JSON payload + Bearer token to
httpbin.org, verifies both were received correctly by reading them back
from the echoed response.

## Key Commands / Code
```bash
python src/post_auth_demo.py
```
```python
async with httpx.AsyncClient() as client:
    response = await client.post(url, json=payload, headers=headers)
    response.raise_for_status()
    data = response.json()
```

## Checkpoint
- [x] Understand GET vs POST conceptually
- [x] Can send a POST request with a JSON body
- [x] Can send an Authorization header (Bearer token pattern)
- [x] Can parse a JSON response back into Python

## Notes & Things to Revisit
- httpbin.org doesn't validate the token, just echoes it — good for
  learning the mechanics, real APIs will reject invalid tokens with 401.
