---
title: Containerization
author: Daniela Gonzalez
description: The creation of software applications into portable units
published: "2025-02-17"
---
# Containerization

By definition
: is the method by which packaging software and their dependencies are turned into lightweight, portable unit called **containers**.

Unlike *virtual machines*, containers share the host operating system, making them more efficient in terms of resources. 

In isolating software applications and their dependencies, containers are a great way to simplify development, deployment, and scaling of features. We commonly see **Docker** and **Kubernetes** as sources for managing containers and viewing their application details.

## Docker 
In Linux we commonly use *Docker*, and to do so we want to first allow access to it in the terminal.
```
# sudo dnf config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.rep
```
As well as install Docker and the needed dependencies.
```
# sudo dnf install -y docker-ce docker-ce-cli containerd.io docker-compose-plug
```
The following code proceeds the previous steps:
```
# sudo systemctl start docker

# sudo systemctl enable docker
```
and final step to using docker for containerization is to allow non-root access:
```
# sudo usermod -aG docker $USER
```

To verify that the correct steps were followed use the following:
```
docker --version

docker run hello-world
```

Now that we have verified docker is working, here is a list of code we use and what they do.
```
docker pull {image_name} -> image can be found on docker.io

docker run {image} -> allows the image to be implimented

docker ps -> verifys which containers are actively running
docker ps -a -> views all containers

docker stop {container ID or name} -> stops the container from running

docker rm {container ID or name} -> removes/deletes the container

docker images -> shows the pulled containers
```

### Docker Storage

We can also add storage to containers which gives a variety of benefits; for example an archive of file logs.

There are three varieties:
    1. Temporary storage - resides inside of conatiners, only remains while container is active. While stopped the files are retained, but when deleted so are the files.

    2. Volumes - storage that is self-contained and can be connected to a container. Easy to backup or share between containers.

    3. Bind mounts - storage that is a folder on your system that you want to be accessible from the container. Can be done by mapping a folder to a folder inside a container.

Docker code for storage purposes:
```
# docker run -it --name {name or storage} 

# docker start -it --name -> -it allows an interactive terminal.

# docker start -i {name} -> starts container again

# docker volume create {name}

# docker exec -it {container name or ID} bash

# docker stop volume

# docker rm volume

# docker volume ls
```

### networking
Allows containers to communicate with each other.
```
# docker network ls

# docker network create {name}

# docker run -id --network {name} --name {conatiner name} {operating system}

# docker network inspect {network name}

# docker network connect {network name} {container name or ID}

# docker network disconnect bridge {container name or ID}

# docker network rm {network name}
```


