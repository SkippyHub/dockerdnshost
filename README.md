# Docker DNS Host Setup

This project demonstrates a Docker setup with DNS resolution and reverse proxy using Traefik.

## Components

- **DNS Proxy**: For .docker domain resolution
- **Traefik**: Reverse proxy for routing
- **Frontend**: Node.js/Express service
- **Backend**: Node.js/Express service with API endpoints

## Setup Attempts and Findings

### 1. Initial Setup
- Docker Compose configuration with:
  - DNS Proxy (for .docker domain resolution)
  - Traefik (as reverse proxy)
  - Frontend service (Node.js/Express)
  - Backend service (Node.js/Express)

### 2. DNS Resolution Attempts
- Tried using `/etc/hosts` with direct container IPs
- Attempted wildcard DNS with `*.docker` in `/etc/hosts` (didn't work as hosts file doesn't support wildcards)
- Tried setting up `/etc/resolver/docker` with:
  ```
  nameserver 127.0.0.1
  port 53
  domain docker
  search_order 1
  ```
- Attempted using Docker network's gateway (172.21.0.1) as nameserver

### 3. VPN Interference
- Discovered VPN (100.64.0.2) was intercepting all DNS requests
- Tried various DNS configurations to override VPN
- Attempted to force local DNS resolution

### 4. Working Configuration
- Using `/etc/hosts` with Traefik's IP (172.21.0.2):
  ```
  172.21.0.2 frontend.docker backend.docker
  ```
- This works because it bypasses DNS resolution entirely

### 5. Service Communication
- Frontend running on port 3000
- Backend running on port 3000
- Traefik handling routing based on Host headers
- Services can communicate through Docker network
- External access through Traefik on port 80

## Main Challenge
The main challenge was the VPN intercepting DNS requests, making it difficult to use the DNS proxy for .docker domain resolution. The solution was to bypass DNS resolution by using direct IP addresses in the hosts file.

## Services

### Frontend
- Accessible at: http://frontend.docker
- Provides a simple web interface
- Can make calls to backend service

### Backend
- Accessible at: http://backend.docker
- Provides API endpoints:
  - GET /api/test: Returns a JSON response with timestamp

## Network Configuration
- All services are on the same Docker network (proxy)
- Traefik handles routing based on Host headers
- Internal communication uses Docker network DNS
- External access goes through Traefik on port 80 