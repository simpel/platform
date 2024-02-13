# Getting Started

1. Clone the repository
2. Run `npm install`
3. Run `npm run dev` to start the development server
4. Get productive!

## Useful scripts

- `npm run dev` - Starts the development server
- `npm run build` - Builds the project
- `npm run lint` - Runs the linter
- `npm run commit` - Works on mac, helps you write conventional commits

# Git strategy

- Commits directly to `main` are not allowed, we work with Pull Requests(see below).
- Every commit should follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) standard.
- Thanks to Conventional Commits, we can automate our releases and changelog generation using [semantic-release](https://github.com/semantic-release/semantic-release). See [CHANGELOG.md](CHANGELOG.md) for release history.

## Branches

- `main` is the releaseable branch, it should always be deployable.
- Every ticket in JIRA should have a corresponding branch, named after the ticket key. For example, if the ticket key is `DIAG-123`, the branch should be named `feat/DIAG-123`. If its not a `feat` we can use `fix`, `chore`, `docs`, etc.

## Pull Requests

- Each PR should be small. If you are working on a big feature, break it down into smaller PRs.
- The only way to push to main is to create a Pull Request from a branch.
- The Pull Request should be reviewed by at least one other person(see below)

### Reviewing Pull Requests

**_This is important_** to ensure that we are following the same standards and get familiar with the codebase, our coding styles and patterns. So **just dont click approve**, take your time and **review the code**. The comment feature is your friend.

### Azure Devops settings

Make sure to squash commits, delete your branch and customize the commit message so it adheres to conventional commits.

![Pull request settings](/docs/pullrequest.png 'Pull request settings')

# Debugging

- The project is set up with [VSCode](https://code.visualstudio.com/) debugging support. Just press F5 to start debugging. You can also use the `Debug` tab in VSCode to start the debugger.
- If you dont use VSCode you can debug from the terminal by running `npm run dev:debug`

# CMS

**Read the [documentation](https://docs.diageocms.thoriumd.com) for further information on how the frontend works.**
