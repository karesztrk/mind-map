---
tags:
  - docker
---
# Build

## Create image

```bash
docker build -t <app-name> .
```

## Create container

```bash
docker run -d -p <local-port>:<container-port> <app-name>
```

## Lazydocker
### Podman

```sh
systemctl --user enable --now podman.socket
export DOCKER_HOST=unix:///run/user/1000/podman/podman.sock
alias docker='podman'
```