# Git

- **Distributed Version Control System:** Git is a distributed version control system that tracks changes in source code during software development.
- **Snapshot-Based:** Git stores data as snapshots of the project over time, not just differences between files.
- **Local Operations:** Most Git operations are local, making it fast and allowing work offline.
- **Data Integrity:** Git uses checksums to ensure data integrity.
- **Staging Area:** Git has a staging area (or index) that allows you to format and review your commits before completing them.
- **Branching Model:** Git's branching model is lightweight and allows for easy context switching.

## Core Concepts

### Git Workflow

- **Working Directory:** Where you modify files
- **Staging Area (Index):** Where you prepare changes for a commit
- **Local Repository:** Where commits are stored locally
- **Remote Repository:** Where commits are stored on a server

### Git Objects

- **Blob:** Stores file data
- **Tree:** Represents a directory structure
- **Commit:** Points to a tree and contains metadata (author, timestamp, message)
- **Tag:** Points to a specific commit (usually used for releases)

### Git vs Other Version Control Systems

| Feature | Git | SVN | Mercurial |
|---------|-----|-----|-----------|
| Type | Distributed | Centralized | Distributed |
| Speed | Fast | Slower | Fast |
| Offline Work | Full functionality | Limited | Full functionality |
| Branching | Lightweight | Heavy | Lightweight |
| Learning Curve | Steeper | Easier | Moderate |
| Storage | Efficient compression | Less efficient | Efficient |
| Popularity | Most popular | Declining | Less popular |

## Common Git Commands

### Basic Commands

```bash
# Initialize a new Git repository
git init

# Clone an existing repository
git clone <repository-url>

# Check status of working directory
git status

# Add files to staging area
git add <file-name>
git add .  # Add all files

# Commit changes
git commit -m "Commit message"

# View commit history
git log
```

### Branching and Merging

```bash
# Create a new branch
git branch <branch-name>

# Switch to a branch
git checkout <branch-name>

# Create and switch to a new branch
git checkout -b <branch-name>

# Merge a branch into current branch
git merge <branch-name>

# Delete a branch
git branch -d <branch-name>
```

### Remote Operations

```bash
# Add a remote repository
git remote add <name> <url>

# Fetch changes from remote
git fetch <remote>

# Pull changes from remote (fetch + merge)
git pull <remote> <branch>

# Push changes to remote
git push <remote> <branch>

# View remote repositories
git remote -v
```

### Advanced Commands

```bash
# Interactive rebase
git rebase -i <commit>

# Cherry-pick a commit
git cherry-pick <commit>

# Stash changes
git stash
git stash pop

# Create a tag
git tag <tag-name>

# Reset to a specific commit
git reset --hard <commit>
```

## Git Workflows

### Centralized Workflow
Similar to SVN, with a central repository and direct commits to the main branch.

### Feature Branch Workflow
Each new feature is developed in a dedicated branch, then merged back to main.

### Gitflow Workflow
Strict branching model with dedicated branches for features, releases, and hotfixes.

### Forking Workflow
Each developer has their own server-side repository, commonly used in open-source projects.

## Best Practices

- Write clear, concise commit messages
- Commit early and often
- Use branches for new features and bug fixes
- Pull before pushing to avoid conflicts
- Use .gitignore to exclude unnecessary files
- Regularly clean up old branches
- Don't commit generated files or dependencies
- Use meaningful branch names
- Review changes before committing
- Keep commits atomic and focused on a single task

## Git Hosting Services

- **GitHub:** Most popular, owned by Microsoft, offers many collaboration features
- **GitLab:** Complete DevOps platform with built-in CI/CD
- **Bitbucket:** Integrates well with other Atlassian products
- **Azure DevOps:** Microsoft's development platform with Git repositories
- **AWS CodeCommit:** Amazon's managed Git service