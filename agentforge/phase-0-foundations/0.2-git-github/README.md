# 0.2-git-github

## Concepts
- `main` should always be deployable/stable — never commit experimental
  work directly to it.
- Feature branch workflow: `git checkout -b feature/x` branches off AND
  switches in one command. Work happens there; `main` is untouched until merge.
- `-u` on `git push -u origin <branch>` links local and remote branches so
  future push/pull don't need the full remote name each time.
- A Pull Request is a review step before merging — even solo, reviewing the
  diff before merging is the habit that prevents bad changes reaching `main`.
- SSH keys authenticate git with GitHub without passwords: private key
  stays local, public key goes to GitHub, they "handshake" on push/pull.

## Exercise
Set up SSH auth with GitHub. Created `feature/rest-api-exercise` branch,
committed a real change, pushed it, opened a Pull Request on GitHub,
reviewed the diff, merged it, then synced main locally and deleted the
merged branch.

## Key Commands
```bash
ssh-keygen -t ed25519 -C "email@example.com"
ssh -T git@github.com          # test auth

git checkout main && git pull origin main
git checkout -b feature/x
git add . && git commit -m "message"
git push -u origin feature/x
# ... open + merge PR on GitHub ...
git checkout main && git pull origin main
git branch -d feature/x        # clean up local branch
```

## Checkpoint
- [x] Git configured with name + email
- [x] SSH key created and linked to GitHub
- [x] Comfortable with add/commit/push/pull
- [x] Created and pushed a feature branch
- [x] Opened, reviewed, and merged a Pull Request
- [x] Synced main and cleaned up a merged local branch

## Notes & Things to Revisit
- GitHub Issues not yet used — will pick this up naturally once tracking
  bugs/features on the actual AgentForge project in later phases.
