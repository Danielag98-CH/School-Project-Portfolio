---
title: Linux Fundamentals
author: Daniela Gonzalez
description: We will be discussing the advantages of Linux and examining the fundamental aspects of the software.
date: 2025-2-17
---
# Linux Fundamentals

Linux is a free, open-source operating system that is popular due to its stability and versatility in the IT Dev Ops field. It allows users to modify and easily distribute their code. As an operating system with compatibility with cloud computing, Linux allows for scalability and performance that allows devs to run critical apps and services.

## Linux Terms to know

- **Root** - there are three different '*root*' terms to know in Linux
    1. Root **User**
        - the account admin
    2. Root **filesystem**
        - the top-level directory of the file system represented by the *forward slash* '**/**'.
        - best way to describe is to think of it as the C:\> in windows
    3. Root **Home folder**
        - the home folder of the root user, can be found in the root of the filesystem. located at **/root**.

## Esential Linux commands
- Common terms to access directories include:
    - **/bin**
    - **/etc**
    - **/home** 
    - **/var**

- Fundamental terminal commands to interact with the system include:
    - **ls** -lists files
    - **cd** -changes directories
    - **pwd** -print the working directory

If done properly the terminal could look something like this 
```
/
├── bin - Essential binaries (e.g., ls, cp)
├── boot - Bootloader files (e.g., kernel, initramfs)
├── dev - Device files (e.g., /dev/sda)
├── etc - System configuration files
├── home - User home directories
│ ├── user1
│ └── user2
├── lib - Shared libraries for essential binaries
├── media - Mount points for removable media
│ ├── usb
│ └── dvd
├── mnt - Temporary mount points
├── opt - Optional software packages
├── proc - Kernel and process information (virtual filesystem)
├── root - Home directory for the root user
├── run - Runtime data for processes
├── sbin - System binaries (e.g., reboot, fdisk)
├── srv - Data for services (e.g., web server files)
├── sys - Kernel and hardware information (virtual filesystem)
├── tmp - Temporary files (cleared on reboot)
├── usr - User programs and data
│ ├── bin - User binaries
│ ├── lib - Shared libraries for user binaries
│ ├── share - Shared resources (e.g., man pages)
│ └── local - Locally installed software
└── var - Variable files (e.g., logs, cache, spool)
├── log - Log files
├── cache - Application caches
└── spool - Queued tasks (e.g., mail, printing)
```
- To install app on linux we use:
```
# sudo dnf install {what you want to install}
# sudo apt install {same as the 1st but use for ubuntu and others}
```
- To create blank files and edit them in the terminal use:
```
create:
# touch filename.txt
edit:
# vi newfile.txt
to exit vi:
:wq -> w writes and q quits
:q! -> ! forces vi to quit without saving 
```

For more information follow this link to learn more about the fundamentals of Linux.
  <https://www.redhat.com/en/services/training/getting-started-with-linux-fundamentals>  
