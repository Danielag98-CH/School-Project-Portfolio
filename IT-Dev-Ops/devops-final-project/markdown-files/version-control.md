---
title: Version Control
author: Daniela Gonzalez
description: We will be taking a look what version control is and what purpose it serves.
date: 2025-2-17
---
# Version Control

Version Control
: also known as source or revision control - is an important software development practive that tracks and manages changes made to code and files. 

To expand that definition, version control track changes made to developers code and records the history of the modifications. It
allows for comparisons between updates and provides backups and rollbacks when needed. A popular example of a version control is Git,which is a system that facilitates collaboration among fellow developers. Git works on platforms like GitHub, Gitlab, Bitbucket and more. 

## Installing Git
Various platforms require git to be downloaded before use and other steps need to be followed before being able to use git.

1. Windows Systems
    - Download git for windows
    - Run the installer

2. Mac and ios
    - Install Homebrew
    - Run **brew install git**

3. Linux
    - Ubuntu/Debian: **sudo apt-get install git**
    - Fedora/RedHat: **sudo dnd install git**

## Configuring Git

Set up your parameters:

```
- Name
    git config --global user.name "your_name"
- Email
    git config --global user.email "email@email.com"
- Verify settings
    git config --list
```

### Git Concepts

Concepts to note when using git;

- Repository (Repo)
: a directory that contains the project files and the .git directory, which tracks changes.
    - to create a new project and initalize the repo use:
```
    - mkdir project_name
    - cd project_name
    - git init 
```

- Commit 
: a snapshot of the repository as a specific point in time
```
git commit -m "note to yourself about the update"
```
- Branch 
: a point of a commit, representing independent line of development
```
git branch name-branch
```
- Remote
: a version of your project hosted online.

## Notable codes that involve git

```
- git clone {url to repo}
- git add {filename} -stages one file
- git add . -stages all files
- git status -see what has changed before commit
- git log -commit history
- git branch -shows the branch list made
- git switch branch -changes between branches 
- git merge branch_name -brings changes to the main code
- git push -pushes changes to the repo
- git push origin {branch_name} -pushes changes onto GitHub
- git pull -sync changes 