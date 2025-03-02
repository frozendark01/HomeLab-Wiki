# Router Setup

This page documents the configuration of the main router in your home lab infrastructure.

## Hardware Specifications

- **Model**: Custom pfSense Appliance
- **CPU**: Intel Core i5-10500 (6 cores, 12 threads)
- **RAM**: 32GB DDR4
- **Storage**: 500GB NVMe SSD
- **Network Interfaces**:
  - WAN: Intel X550-T1 (1GbE)
  - LAN: Intel X550-T2 (2x 10GbE)
  - Optional: 4-port Intel i350 (4x 1GbE)

## Basic Configuration

### Network Interfaces

| Interface | Name | IP Address | VLAN | Purpose |
|-----------|------|------------|------|---------|
| igb0 | WAN | DHCP from ISP | None | Internet connection |
| ix0 | LAN | 10.0.10.1/24 | 10 | Management network |
| ix0.20 | SERVERS | 10.0.20.1/24 | 20 | Server network |
| ix0.30 | IOT | 10.0.30.1/24 | 30 | IoT devices |
| ix0.40 | GUEST | 10.0.40.1/24 | 40 | Guest network |
| ix0.50 | MEDIA | 10.0.50.1/24 | 50 | Media devices |

### DHCP Configuration

| Network | DHCP Range | Lease Time | DNS Servers |
|---------|------------|------------|-------------|
| Management | 10.0.10.100-10.0.10.200 | 24 hours | 10.0.10.53 |
| Servers | 10.0.20.100-10.0.20.200 | 48 hours | 10.0.10.53 |
| IoT | 10.0.30.100-10.0.30.200 | 24 hours | 10.0.10.53 |
| Guest | 10.0.40.100-10.0.40.200 | 4 hours | 10.0.10.53 |
| Media | 10.0.50.100-10.0.50.200 | 24 hours | 10.0.10.53 |

### Static DHCP Leases

| Device | MAC Address | IP Address | Description |
|--------|-------------|------------|-------------|
| Main Server | 00:11:22:33:44:55 | 10.0.20.10 | Proxmox host |
| Backup Server | 00:11:22:33:44:56 | 10.0.20.11 | Backup Proxmox host |
| NAS | 00:11:22:33:44:57 | 10.0.20.20 | TrueNAS Scale |
| Core Switch | 00:11:22:33:44:58 | 10.0.10.2 | Unifi USW-24-POE |
| Server Switch | 00:11:22:33:44:59 | 10.0.10.3 | Unifi USW-16-XG |
| Main AP | 00:11:22:33:44:5A | 10.0.10.4 | Unifi U6-Pro |

## Firewall Rules

### Default Policies

- WAN: Block all incoming traffic
- LAN: Allow all outgoing traffic
- All other interfaces: Block by default with specific allow rules

### WAN Rules

| Action | Protocol | Source | Destination | Port | Description |
|--------|----------|--------|-------------|------|-------------|
| Allow | TCP | Any | WAN Address | 443 | HTTPS for pfSense WebGUI |
| Allow | TCP | Any | WAN Address | 22 | SSH (restricted by geo-IP) |
| Allow | TCP/UDP | Any | WAN Address | 51820 | WireGuard VPN |
| Block | Any | Any | Any | Any | Default deny rule |

### LAN (Management) Rules

| Action | Protocol | Source | Destination | Port | Description |
|--------|----------|--------|-------------|------|-------------|
| Allow | Any | Management Net | Any | Any | Allow all outbound |
| Allow | TCP | Management Net | Servers Net | 22, 80, 443 | Management access |
| Allow | ICMP | Management Net | Any | Any | Allow ping |

### Servers Rules

| Action | Protocol | Source | Destination | Port | Description |
|--------|----------|--------|-------------|------|-------------|
| Allow | TCP/UDP | Servers Net | Any | 80, 443, 53 | Web and DNS |
| Allow | TCP | Servers Net | Servers Net | Any | Inter-server communication |
| Allow | TCP | Media Net | Servers Net | 8096 | Jellyfin access |
| Block | Any | Servers Net | IoT Net | Any | Block server to IoT |

### IoT Rules

| Action | Protocol | Source | Destination | Port | Description |
|--------|----------|--------|-------------|------|-------------|
| Allow | TCP/UDP | IoT Net | Any | 80, 443, 53 | Web and DNS |
| Allow | TCP/UDP | IoT Net | Servers Net | 8123, 1883 | Home Assistant, MQTT |
| Block | Any | IoT Net | Management Net | Any | Block IoT to management |
| Block | Any | IoT Net | Guest Net | Any | Block IoT to guest |

### Guest Rules

| Action | Protocol | Source | Destination | Port | Description |
|--------|----------|--------|-------------|------|-------------|
| Allow | TCP/UDP | Guest Net | Any | 80, 443, 53 | Web and DNS |
| Block | Any | Guest Net | RFC1918 | Any | Block access to private networks |

## NAT Configuration

### Port Forwards

| WAN Port | Protocol | NAT IP | NAT Port | Description |
|----------|----------|--------|----------|-------------|
| 443 | TCP | 10.0.20.30 | 443 | Reverse proxy (HTTPS) |
| 51820 | UDP | 10.0.10.1 | 51820 | WireGuard VPN |

### Outbound NAT

- Default: Automatic outbound NAT for all interfaces
- Custom rule for VPN traffic to use dedicated IP (if applicable)

## VPN Configuration

### WireGuard

- **Interface**: wg0
- **Listen Port**: 51820
- **Tunnel Network**: 10.100.100.0/24
- **Peers**: [List of authorized peers with public keys]

### OpenVPN (Backup)

- **Protocol**: UDP
- **Port**: 1194
- **Tunnel Network**: 10.200.200.0/24
- **Authentication**: Certificate + Username/Password
- **Encryption**: AES-256-GCM

## DNS Configuration

- **DNS Resolver**: Unbound (built-in)
- **Forwarding Mode**: Enable forwarding to Pi-hole (10.0.10.53)
- **DNSSEC**: Enabled
- **DNS over TLS**: Enabled (Cloudflare)
- **Local Domain**: home.lab

## Advanced Features

### Traffic Shaping

- **WAN Bandwidth**: 1000Mbps down / 50Mbps up
- **Priority Queue**:
  1. VoIP traffic
  2. Interactive traffic (SSH, RDP)
  3. Standard web browsing
  4. Bulk transfers (updates, backups)
  5. P2P traffic (lowest priority)

### IDS/IPS

- **Engine**: Suricata
- **Rule Sets**: ET Open, Snort Community
- **Mode**: IPS (block detected threats)
- **Interfaces**: WAN, Guest

### Monitoring

- **NetFlow**: Enabled, sending to Monitoring VM
- **SNMP**: Enabled for Prometheus monitoring
- **Dashboard Graphs**: CPU, Memory, Network throughput

## Backup and Recovery

### Configuration Backup

- **Schedule**: Daily at 2 AM
- **Retention**: 30 days
- **Location**: Backup Server (10.0.20.11)
- **Encryption**: AES-256

### Recovery Procedure

1. Install fresh pfSense on replacement hardware
2. Complete initial setup with temporary settings
3. Import configuration backup file
4. Verify all interfaces and services

## Maintenance Notes

- **Firmware Updates**: Schedule for 3rd Sunday of each month, 2 AM
- **Configuration Changes**: Document all changes in this wiki
- **Performance Testing**: Run iperf3 tests monthly to verify throughput