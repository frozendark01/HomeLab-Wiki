# Media Server Setup

This page documents the configuration of the media server in your home lab infrastructure.

## Overview

The media server provides centralized storage and streaming of media content to various devices throughout your home. It's built on a combination of Jellyfin for streaming and various automation tools for content management.

## Hardware Allocation

- **VM Host**: Main Server (Proxmox)
- **CPU**: 8 vCPUs (dedicated cores)
- **RAM**: 16GB
- **Storage**:
  - System: 50GB SSD (local)
  - Media: 20TB NFS share from NAS
- **Network**: VLAN 20 (Servers), 10GbE

## Software Stack

| Component | Version | Purpose | Configuration |
|-----------|---------|---------|---------------|
| Ubuntu Server | 22.04 LTS | Base OS | Minimal installation |
| Docker | Latest | Container runtime | Default configuration |
| Jellyfin | 10.8.x | Media server | Hardware transcoding enabled |
| Sonarr | Latest | TV show management | Connected to Prowlarr |
| Radarr | Latest | Movie management | Connected to Prowlarr |
| Prowlarr | Latest | Indexer management | Multiple indexers configured |
| Bazarr | Latest | Subtitle management | Auto-download for all media |
| Transmission | Latest | Download client | VPN configured |
| Overseerr | Latest | Request management | User request portal |

## Docker Compose Configuration

The entire media stack is deployed using Docker Compose. Here's the configuration file:

```yaml
version: '3'
services:
  jellyfin:
    image: jellyfin/jellyfin:latest
    container_name: jellyfin
    network_mode: host
    volumes:
      - /opt/jellyfin/config:/config
      - /opt/jellyfin/cache:/cache
      - /mnt/media:/media
    devices:
      - /dev/dri:/dev/dri
    restart: unless-stopped
    
  sonarr:
    image: linuxserver/sonarr:latest
    container_name: sonarr
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=America/New_York
    volumes:
      - /opt/sonarr/config:/config
      - /mnt/media:/media
      - /mnt/downloads:/downloads
    ports:
      - 8989:8989
    restart: unless-stopped
    
  radarr:
    image: linuxserver/radarr:latest
    container_name: radarr
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=America/New_York
    volumes:
      - /opt/radarr/config:/config
      - /mnt/media:/media
      - /mnt/downloads:/downloads
    ports:
      - 7878:7878
    restart: unless-stopped
    
  prowlarr:
    image: linuxserver/prowlarr:latest
    container_name: prowlarr
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=America/New_York
    volumes:
      - /opt/prowlarr/config:/config
    ports:
      - 9696:9696
    restart: unless-stopped
    
  bazarr:
    image: linuxserver/bazarr:latest
    container_name: bazarr
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=America/New_York
    volumes:
      - /opt/bazarr/config:/config
      - /mnt/media:/media
    ports:
      - 6767:6767
    restart: unless-stopped
    
  transmission:
    image: linuxserver/transmission:latest
    container_name: transmission
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=America/New_York
    volumes:
      - /opt/transmission/config:/config
      - /mnt/downloads:/downloads
    ports:
      - 9091:9091
      - 51413:51413
      - 51413:51413/udp
    restart: unless-stopped
    
  overseerr:
    image: linuxserver/overseerr:latest
    container_name: overseerr
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=America/New_York
    volumes:
      - /opt/overseerr/config:/config
    ports:
      - 5055:5055
    restart: unless-stopped
```

## Media Organization

The media is organized according to the following structure:

```
/mnt/media/
├── movies/
│   ├── Movie Title (Year)/
│   │   ├── Movie Title (Year).mkv
│   │   └── subtitles/
├── tv/
│   ├── Show Name/
│   │   ├── Season 01/
│   │   │   ├── Show Name - S01E01.mkv
│   │   │   └── ...
│   │   └── ...
├── music/
│   ├── Artist/
│   │   ├── Album/
│   │   │   ├── 01 - Track.flac
│   │   │   └── ...
│   │   └── ...
└── photos/
    ├── Year/
    │   ├── Month/
    │   │   ├── photo1.jpg
    │   │   └── ...
    │   └── ...
    └── ...
```

## Jellyfin Configuration

### Libraries

| Library | Type | Path | Scan Interval |
|---------|------|------|---------------|
| Movies | Movies | /media/movies | 1 hour |
| TV Shows | TV Shows | /media/tv | 1 hour |
| Music | Music | /media/music | 12 hours |
| Photos | Photos | /media/photos | 24 hours |

### Hardware Acceleration

- **Type**: VAAPI (Intel QuickSync)
- **Device**: /dev/dri/renderD128
- **Transcoding Options**:
  - Enable hardware decoding: Yes
  - Enable hardware encoding: Yes
  - Allow transcoding to higher resolution: No
  - Throttle transcodes: Yes

### User Accounts

| User | Role | Access Level | Libraries | Remote Access |
|------|------|-------------|-----------|---------------|
| admin | Administrator | Full access | All | Yes |
| family | Regular user | Limited access | All except Photos | Yes |
| kids | Regular user | Limited access | Movies (filtered), TV Shows (filtered) | Yes |
| guests | Regular user | Limited access | Movies, TV Shows | No |

## Automation Setup

### Sonarr/Radarr Configuration

- **Quality Profiles**:
  - HD-1080p (default)
  - Ultra-HD-2160p
  - SD (lowest priority)
- **Release Profiles**:
  - Prefer hardcoded subtitles: No
  - Prefer proper/repack: Yes
- **Indexers**: Managed through Prowlarr
- **Download Client**: Transmission

### Prowlarr Configuration

- **Indexers**: [List of configured indexers]
- **Applications**:
  - Sonarr
  - Radarr
  - Bazarr
- **Download Clients**: Transmission

### Transmission Configuration

- **Download Path**: /downloads
- **Incomplete Path**: /downloads/incomplete
- **Speed Limits**:
  - Download: 50 MB/s
  - Upload: 5 MB/s
  - Alt Speed Download: 10 MB/s
  - Alt Speed Upload: 1 MB/s
- **Scheduling**: Alt speeds active 8 AM - 11 PM

## Backup Strategy

- **Config Backups**:
  - All container configurations backed up daily
  - Stored on backup server
  - Retention: 30 days
- **Media Backups**:
  - Important media backed up weekly
  - Full media library cataloged but not fully backed up
  - Critical family photos/videos backed up to cloud storage

## Maintenance Tasks

- **Database Optimization**: Monthly
- **Library Scan**: Daily at 3 AM
- **Metadata Refresh**: Weekly
- **System Updates**: Bi-weekly (scheduled maintenance window)

## Troubleshooting

### Common Issues

#### Jellyfin Transcoding Problems

1. Check hardware acceleration status in dashboard
2. Verify permissions on /dev/dri devices
3. Check client compatibility and network bandwidth

#### Download Automation Issues

1. Verify connectivity between services
2. Check logs for API errors
3. Ensure proper permissions on media directories

#### Performance Problems

1. Monitor CPU, RAM, and disk I/O
2. Check network throughput
3. Verify no excessive transcoding is occurring

## Access Information

| Service | Internal URL | External URL | Notes |
|---------|--------------|--------------|-------|
| Jellyfin | http://jellyfin.home.lab:8096 | https://media.yourdomain.com | Reverse proxied |
| Sonarr | http://sonarr.home.lab:8989 | Not exposed | Internal only |
| Radarr | http://radarr.home.lab:7878 | Not exposed | Internal only |
| Prowlarr | http://prowlarr.home.lab:9696 | Not exposed | Internal only |
| Bazarr | http://bazarr.home.lab:6767 | Not exposed | Internal only |
| Transmission | http://transmission.home.lab:9091 | Not exposed | Internal only |
| Overseerr | http://overseerr.home.lab:5055 | https://requests.yourdomain.com | Reverse proxied |