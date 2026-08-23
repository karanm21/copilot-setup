# 0.4-terminal-linux

## Concepts
- `grep` scans line by line, only showing lines matching a pattern —
  `-r` makes it recursive across a whole folder.
- Pipes (`|`) chain commands — output of the left command becomes input
  to the right command, instead of manually copying between them.
- Permissions (`rwxr-xr-x`) = three groups of three: owner / group / other,
  each with read/write/execute. A leading `l` (not `-`) means the entry
  is a symlink pointing elsewhere, not a real file.

## Exercise
Used `grep -r` to find all async functions across the project. Used a pipe
to filter a directory listing. Inspected file permissions on the venv's
python — discovered it's a symlink back to Anaconda's python.

## Key Commands
```bash
grep -r "async def" src/
ls -la ~/Desktop/setup/agentforge | grep phase
ls -l venv/bin/python
```

## Checkpoint
- [x] Can use grep to search inside files/folders
- [x] Can chain commands with a pipe
- [x] Can read a permissions string and identify a symlink

## Notes & Things to Revisit
- None — daily-use commands (cd, ls, mkdir, mv, cat) were already solid
  from earlier sessions; this closed the remaining gaps.
