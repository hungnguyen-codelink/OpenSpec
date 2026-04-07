# Testing a Local OpenSpec Build

How to replace the globally installed OpenSpec CLI with a local development build and verify the changes in a target project.

## Prerequisites

- Node.js 20+
- pnpm installed
- A local clone of the OpenSpec repo (e.g., `~/OpenSpec`)
- A target project with OpenSpec already initialized (e.g., `~/my-project`)

## Step 1: Build the Local Version

```bash
cd ~/OpenSpec
pnpm install
pnpm run build
```

Verify the build:

```bash
node bin/openspec.js --version
```

## Step 2: Replace the Global Installation

The globally installed OpenSpec lives at:

```
/opt/homebrew/lib/node_modules/@fission-ai/openspec/
```

The global `openspec` binary is a symlink:

```
/opt/homebrew/bin/openspec -> ../lib/node_modules/@fission-ai/openspec/bin/openspec.js
```

### Option A: Link Your Local Build (recommended)

This replaces the global `openspec` command with a symlink to your local repo:

```bash
cd ~/OpenSpec
pnpm link --global
```

To verify it worked:

```bash
openspec --version
# Should show your local build version

ls -la $(which openspec)
# Should point to your local repo's bin/openspec.js
```

To unlink and restore the original:

```bash
pnpm unlink --global
npm install -g @fission-ai/openspec
```

### Option B: Run Directly Without Linking

If you don't want to modify the global installation, invoke the local build directly:

```bash
node ~/OpenSpec/bin/openspec.js <command>
```

For example:

```bash
node ~/OpenSpec/bin/openspec.js update --force
```

## Step 3: Update Skills in the Target Project

After replacing the CLI, regenerate the `.claude` skills and commands in your target project:

```bash
cd ~/my-project
openspec update --force
```

Or if using Option B:

```bash
cd ~/my-project
node ~/OpenSpec/bin/openspec.js update --force
```

This regenerates:
- `.claude/commands/opsx/*.md` — slash commands (e.g., `/opsx:verify`)
- `.claude/skills/openspec-*/SKILL.md` — Claude Code skills

## Step 4: Verify the Update

### Check that new files were generated

```bash
# List commands — look for new ones like verify.md
ls .claude/commands/opsx/

# List skills — look for new ones like openspec-verify-change
ls .claude/skills/
```

### Check that file content was updated

Search for keywords unique to the new version:

```bash
# For verify workflow (DST, e2e, pre-complete gate, code review)
grep -l "DST Simulation" .claude/skills/openspec-verify-change/SKILL.md
grep -l "Pre-complete Gate" .claude/commands/opsx/verify.md

# For apply workflow (TDD, Docker, verification gate)
grep -l "TDD Cycle" .claude/skills/openspec-apply-change/SKILL.md
grep -l "Auto-Debug" .claude/commands/opsx/apply.md

# For propose workflow (verification profiles)
grep -l "verification profile" .claude/skills/openspec-propose/SKILL.md
```

### Compare file sizes before and after

If you saved the old files, you can compare:

```bash
# Before update
wc -c .claude/skills/openspec-apply-change/SKILL.md
# After update — should be significantly larger if new content was added
```

## Step 5: Test the New Skills with Claude Code

Open Claude Code in the target project directory and try the new workflows:

```bash
cd ~/my-project
claude
```

Then use the slash commands:

- `/opsx:apply` — should now include TDD cycle, Docker setup, verification gate, auto-debug
- `/opsx:verify` — new command for full verification (spec compliance, DST, e2e, gate, code review)
- `/opsx:propose` — should now assign verification profiles to tasks

## Troubleshooting

### `update` says files are up to date but content is old

Use `--force` to regenerate regardless of version check:

```bash
openspec update --force
```

### Global `openspec` still points to the old version after linking

Check which binary is being used:

```bash
which openspec
openspec --version
```

If it still points to the npm-installed version, ensure `pnpm link --global` succeeded and that pnpm's global bin directory is earlier in your `$PATH` than npm's.

### SSH permission denied when cloning test repos

If using multiple GitHub accounts, use SSH host aliases in `~/.ssh/config`:

```bash
# Clone using host alias instead of github.com
git clone git@github.com-youraccount:owner/repo.git

# Or set remote URL for an existing repo
git remote set-url origin git@github.com-youraccount:owner/repo.git
```