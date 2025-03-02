# Monitoring Setup

This page documents the configuration of the monitoring system in your home lab infrastructure.

## Overview

The monitoring system provides comprehensive visibility into the health, performance, and availability of all infrastructure components in your home lab.

## Hardware Allocation

- **VM Host**: Main Server (Proxmox)
- **CPU**: 4 vCPUs
- **RAM**: 8GB
- **Storage**:
  - System: 40GB SSD (local)
  - Data: 200GB NFS share from NAS (for time series data)
- **Network**: VLAN 20 (Servers), 1GbE

## Software Stack

| Component | Version | Purpose | Configuration |
|-----------|---------|---------|---------------|
| Ubuntu Server | 22.04 LTS | Base OS | Minimal installation |
| Docker | Latest | Container runtime | Default configuration |
| Prometheus | Latest | Metrics collection | Long-term storage enabled |
| Grafana | Latest | Visualization | Multiple dashboards |
| Alertmanager | Latest | Alert routing | Email and Telegram notifications |
| Node Exporter | Latest | Host metrics | Deployed on all servers |
| cAdvisor | Latest | Container metrics | Deployed on Docker hosts |
| Loki | Latest | Log aggregation | Centralized logging |
| Promtail | Latest | Log collection | Deployed on all servers |
| Uptime Kuma | Latest | Uptime monitoring | External and internal checks |

## Docker Compose Configuration

The monitoring stack is deployed using Docker Compose. Here's the configuration file:

```yaml
version: '3'

services:
  prometheus:
    image: prom/prometheus:latest
    container_name: prometheus
    volumes:
      - /opt/prometheus/config:/etc/prometheus
      - /opt/prometheus/data:/prometheus
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.path=/prometheus'
      - '--storage.tsdb.retention.time=90d'
      - '--web.console.libraries=/etc/prometheus/console_libraries'
      - '--web.console.templates=/etc/prometheus/consoles'
    ports:
      - 9090:9090
    restart: unless-stopped
    
  grafana:
    image: grafana/grafana:latest
    container_name: grafana
    volumes:
      - /opt/grafana:/var/lib/grafana
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=secure_password_here
      - GF_USERS_ALLOW_SIGN_UP=false
    ports:
      - 3000:3000
    restart: unless-stopped
    
  alertmanager:
    image: prom/alertmanager:latest
    container_name: alertmanager
    volumes:
      - /opt/alertmanager:/etc/alertmanager
    command:
      - '--config.file=/etc/alertmanager/alertmanager.yml'
      - '--storage.path=/etc/alertmanager/data'
    ports:
      - 9093:9093
    restart: unless-stopped
    
  loki:
    image: grafana/loki:latest
    container_name: loki
    volumes:
      - /opt/loki:/etc/loki
    command: -config.file=/etc/loki/loki-config.yml
    ports:
      - 3100:3100
    restart: unless-stopped
    
  uptime-kuma:
    image: louislam/uptime-kuma:latest
    container_name: uptime-kuma
    volumes:
      - /opt/uptime-kuma:/app/data
    ports:
      - 3001:3001
    restart: unless-stopped
```

## Prometheus Configuration

### Main Configuration

```yaml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

alerting:
  alertmanagers:
    - static_configs:
        - targets:
            - alertmanager:9093

rule_files:
  - /etc/prometheus/rules/*.yml

scrape_configs:
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']

  - job_name: 'node_exporter'
    static_configs:
      - targets:
          - 'main-server:9100'
          - 'backup-server:9100'
          - 'nas:9100'
          - 'router:9100'

  - job_name: 'cadvisor'
    static_configs:
      - targets:
          - 'main-server:8080'
          - 'backup-server:8080'

  - job_name: 'proxmox'
    metrics_path: /pve
    params:
      module: [default]
    static_configs:
      - targets:
          - 'proxmox-exporter:9221'

  - job_name: 'snmp'
    static_configs:
      - targets:
          - 'core-switch'
          - 'server-switch'
    metrics_path: /snmp
    params:
      module: [if_mib]
    relabel_configs:
      - source_labels: [__address__]
        target_label: __param_target
      - source_labels: [__param_target]
        target_label: instance
      - target_label: __address__
        replacement: 'snmp-exporter:9116'
```

### Alert Rules

```yaml
groups:
  - name: host_alerts
    rules:
      - alert: HostDown
        expr: up == 0
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "Host {{ $labels.instance }} is down"
          description: "{{ $labels.instance }} has been down for more than 5 minutes."

      - alert: HighCPULoad
        expr: 100 - (avg by(instance) (irate(node_cpu_seconds_total{mode="idle"}[5m])) * 100) > 90
        for: 15m
        labels:
          severity: warning
        annotations:
          summary: "High CPU load on {{ $labels.instance }}"
          description: "CPU load is above 90% for more than 15 minutes."

      - alert: HighMemoryUsage
        expr: (node_memory_MemTotal_bytes - node_memory_MemAvailable_bytes) / node_memory_MemTotal_bytes * 100 > 90
        for: 15m
        labels:
          severity: warning
        annotations:
          summary: "High memory usage on {{ $labels.instance }}"
          description: "Memory usage is above 90% for more than 15 minutes."

      - alert: HighDiskUsage
        expr: 100 - ((node_filesystem_avail_bytes / node_filesystem_size_bytes) * 100) > 90
        for: 15m
        labels:
          severity: warning
        annotations:
          summary: "High disk usage on {{ $labels.instance }}"
          description: "Disk usage is above 90% for more than 15 minutes."
```

## Grafana Dashboards

### Main Dashboard

The main overview dashboard includes:

- System health status for all servers
- Network traffic overview
- Storage utilization
- Service availability
- Recent alerts

### Server Performance

Detailed server metrics including:

- CPU usage (per core)
- Memory utilization
- Disk I/O
- Network throughput
- Temperature sensors
- Process information

### Network Monitoring

Network-specific dashboard with:

- Throughput per interface
- Packet loss
- Latency measurements
- Interface errors
- Top talkers (devices using most bandwidth)
- VLAN traffic breakdown

### Storage Performance

Storage-focused dashboard with:

- Disk usage per volume
- IOPS
- Latency
- Read/write throughput
- ZFS pool status (for TrueNAS)
- SMART data

### Service Health

Service-level monitoring dashboard:

- Uptime for all services
- Response times
- Error rates
- Resource usage per service
- Container metrics
- Log volume

## Alertmanager Configuration

```yaml
global:
  resolve_timeout: 5m
  smtp_smarthost: 'smtp.gmail.com:587'
  smtp_from: 'alerts@yourdomain.com'
  smtp_auth_username: 'alerts@yourdomain.com'
  smtp_auth_password: 'app_password_here'
  smtp_require_tls: true

route:
  group_by: ['alertname', 'instance', 'severity']
  group_wait: 30s
  group_interval: 5m
  repeat_interval: 4h
  receiver: 'email-notifications'
  routes:
    - match:
        severity: critical
      receiver: 'urgent-notifications'
      repeat_interval: 1h

receivers:
  - name: 'email-notifications'
    email_configs:
      - to: 'admin@yourdomain.com'
        send_resolved: true
        
  - name: 'urgent-notifications'
    email_configs:
      - to: 'admin@yourdomain.com'
        send_resolved: true
    telegram_configs:
      - bot_token: 'your_telegram_bot_token'
        chat_id: 123456789
        send_resolved: true

inhibit_rules:
  - source_match:
      severity: 'critical'
    target_match:
      severity: 'warning'
    equal: ['instance']
```

## Loki Configuration

```yaml
auth_enabled: false

server:
  http_listen_port: 3100

ingester:
  lifecycler:
    address: 127.0.0.1
    ring:
      kvstore:
        store: inmemory
      replication_factor: 1
    final_sleep: 0s
  chunk_idle_period: 5m
  chunk_retain_period: 30s

schema_config:
  configs:
    - from: 2020-05-15
      store: boltdb
      object_store: filesystem
      schema: v11
      index:
        prefix: index_
        period: 24h

storage_config:
  boltdb:
    directory: /etc/loki/index
  filesystem:
    directory: /etc/loki/chunks

limits_config:
  enforce_metric_name: false
  reject_old_samples: true
  reject_old_samples_max_age: 168h

chunk_store_config:
  max_look_back_period: 0s

table_manager:
  retention_deletes_enabled: true
  retention_period: 90d
```

## Uptime Kuma Monitoring

### External Services

| Service | URL | Check Type | Interval | Notification |
|---------|-----|------------|----------|--------------|
| Home Assistant | https://ha.yourdomain.com | HTTP | 1 minute | Email + Telegram |
| Jellyfin | https://media.yourdomain.com | HTTP | 1 minute | Email |
| Router Web UI | https://pfsense.home.lab | HTTP | 5 minutes | Email + Telegram |
| Internet Connection | 1.1.1.1 | Ping | 1 minute | Email + Telegram |

### Internal Services

| Service | URL/Host | Check Type | Interval | Notification |
|---------|----------|------------|----------|--------------|
| Proxmox | proxmox.home.lab:8006 | HTTP | 1 minute | Email + Telegram |
| TrueNAS | truenas.home.lab | HTTP | 1 minute | Email + Telegram |
| Pi-hole | pihole.home.lab | HTTP | 5 minutes | Email |
| Main Server | 10.0.20.10 | Ping | 1 minute | Email + Telegram |
| Backup Server | 10.0.20.11 | Ping | 1 minute | Email + Telegram |
| NAS | 10.0.20.20 | Ping | 1 minute | Email + Telegram |
| Core Switch | 10.0.10.2 | Ping | 1 minute | Email + Telegram |
| Server Switch | 10.0.10.3 | Ping | 1 minute | Email |
| Main AP | 10.0.10.4 | Ping | 5 minutes | Email |

## Node Exporter Deployment

Node Exporter is deployed on all servers using systemd:

```ini
[Unit]
Description=Prometheus Node Exporter
After=network.target

[Service]
User=node_exporter
Group=node_exporter
Type=simple
ExecStart=/usr/local/bin/node_exporter \
    --collector.filesystem \
    --collector.netdev \
    --collector.meminfo \
    --collector.cpu \
    --collector.loadavg \
    --collector.systemd \
    --collector.processes \
    --collector.diskstats \
    --collector.tcpstat \
    --collector.netstat

[Install]
WantedBy=multi-user.target
```

## Promtail Configuration

Promtail is deployed on all servers to collect logs:

```yaml
server:
  http_listen_port: 9080
  grpc_listen_port: 0

positions:
  filename: /var/lib/promtail/positions.yaml

clients:
  - url: http://loki:3100/loki/api/v1/push

scrape_configs:
  - job_name: system
    static_configs:
      - targets:
          - localhost
        labels:
          job: varlogs
          host: ${HOSTNAME}
    pipeline_stages:
    - regex:
        expression: '^(?P<timestamp>\w+\s+\d+\s+\d+:\d+:\d+)\s+(?P<host>[^\s]+)\s+(?P<application>[^\s\[]+)(?:\[(?P<pid>\d+)\])?: (?P<message>.*)$'
    - labels:
        timestamp:
        host:
        application:
        pid:
    - timestamp:
        source: timestamp
        format: Jan 2 15:04:05
    - output:
        source: message
    
    file_sd_configs:
      - files:
          - /var/lib/promtail/targets/*.yaml
          
    relabel_configs:
      - source_labels: ['__path__']
        target_label: 'path'
```

## Backup Strategy

- **Config Backups**:
  - All container configurations backed up daily
  - Grafana dashboards exported weekly
  - Prometheus rules backed up with each change
  - Retention: 90 days
- **Data Backups**:
  - Grafana database backed up daily
  - Prometheus TSDB backed up weekly
  - Uptime Kuma database backed up daily

## Maintenance Tasks

- **Log Rotation**: Automated with 30-day retention
- **Database Compaction**: Monthly for time series data
- **Dashboard Review**: Quarterly
- **Alert Testing**: Monthly
- **System Updates**: Monthly (scheduled maintenance window)

## Troubleshooting

### Common Issues

#### Prometheus Storage Issues

1. Check disk space
2. Verify retention settings
3. Consider adjusting scrape intervals
4. Review cardinality of metrics

#### Grafana Dashboard Problems

1. Check Prometheus data source connection
2. Verify query syntax
3. Review time range selection
4. Check for template variable errors

#### Alert Notification Failures

1. Verify SMTP settings
2. Check network connectivity
3. Review alert configuration
4. Test notification channels manually

## Access Information

| Service | Internal URL | External URL | Notes |
|---------|--------------|--------------|-------|
| Grafana | http://grafana.home.lab:3000 | https://grafana.yourdomain.com | Reverse proxied |
| Prometheus | http://prometheus.home.lab:9090 | Not exposed | Internal only |
| Alertmanager | http://alertmanager.home.lab:9093 | Not exposed | Internal only |
| Loki | http://loki.home.lab:3100 | Not exposed | Internal only |
| Uptime Kuma | http://uptime.home.lab:3001 | Not exposed | Internal only |