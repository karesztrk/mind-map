# Build
## Create image
```bash
docker build -t <app-name> .
```
## Create container 
```bash
docker run -d -p <local-port>:<container-port> <app-name>
```