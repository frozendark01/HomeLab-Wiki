# Switch Configuration

This page documents the configuration of network switches in your home lab infrastructure.

## Hardware Specifications

### Core Switch

- **Model**: Unifi USW-24-POE
- **Ports**: 24x 1GbE RJ45 (16x PoE+), 2x 10G SFP+
- **PoE Budget**: 195W
- **Management**: Unifi Controller
- **Location**: Middle of rack

### Server Switch

- **Model**: Unifi USW-16-XG
- **Ports**: 16x 10G SFP+
- **Management**: Unifi Controller
- **Location**: Middle of rack

## Port Assignments

### Core Switch (USW-24-POE)

| Port | Connected Device | VLAN | PoE | Notes |
|------|-----------------|------|-----|-------|
| 1 | pfSense Router | Trunk | No | All VLANs |
| 2 | Server Switch | Trunk | No | All VLANs |
| 3 | Main AP | Trunk | Yes | VLANs 10, 40, 50 |
| 4 | IoT AP | Trunk | Yes | VLANs 10, 30 |
| 5 | Office AP | Trunk | Yes | VLANs 10, 40, 50 |
| 6 | IP Camera 1 | 30 | Yes | Front door |
| 7 | IP Camera 2 | 30 | Yes | Back yard |
| 8 | IP Camera 3 | 30 | Yes | Driveway |
| 9 | Smart Home Hub | 30 | Yes | Zigbee/Z-Wave controller |
| 10 | Desktop PC | 10 | No | Management workstation |
| 11 | Printer | 10 | No | Network printer |
| 12-24 | Available | - | - | Spare ports |

### Server Switch (USW-16-XG)

| Port | Connected Device | VLAN | Speed | Notes |
|------|-----------------|------|-------|-------|
| 1 | Core Switch | Trunk | 10G | All VLANs |
| 2 | Main Server | Trunk | 10G | VLANs 10, 20, 30, 50 |
| 3 | Backup Server | Trunk | 10G | VLANs 10, 20 |
| 4 | NAS | Trunk | 10G | VLANs 10, 20, 50 |
| 5-16 | Available | - | - | Spare ports |

## VLAN Configuration

| VLAN ID | Name | Tagged Ports | Untagged Ports |
|---------|------|--------------|----------------|
| 1 | Default | None | None |
| 10 | Management | 1-5 | 10-11 |
| 20 | Servers | 1-4 | None |
| 30 | IoT | 1, 3-4 | 6-9 |
| 40 | Guest | 1, 3, 5 | None |
| 50 | Media | 1-5 | None |

## Spanning Tree Configuration

- **Protocol**: RSTP (Rapid Spanning Tree Protocol)
- **Root Bridge**: Core Switch
- **Priority**: 4096
- **Path Cost Method**: 802.1d

## Link Aggregation

| LAG Group | Ports | Type | Connected To | Notes |
|-----------|-------|------|-------------|-------|
| LAG1 | 1-2 | LACP | pfSense Router | 2Gbps trunk |
| LAG2 | 2-3 | LACP | Server Switch | 20Gbps trunk |

## Quality of Service (QoS)

| Traffic Type | Priority | DSCP Marking | Queue |
|--------------|----------|--------------|-------|
| VoIP | Highest | EF (46) | 7 |
| Video Streaming | High | AF41 (34) | 6 |
| Management | Medium-High | CS4 (32) | 5 |
| Web Browsing | Medium | AF21 (18) | 4 |
| File Transfers | Medium-Low | AF11 (10) | 3 |
| Background | Low | CS1 (8) | 2 |
| Default | Lowest | 0 | 1 |

## PoE Configuration

- **PoE Mode**: Auto
- **Power Budget Management**: Enabled
- **Priority Devices**: Access Points, Security Cameras

## Firmware Management

- **Current Version**: 7.4.156
- **Auto-Update**: Disabled
- **Update Schedule**: Manual during maintenance window

## Backup Configuration

- **Backup Schedule**: Weekly
- **Backup Location**: Backup Server (10.0.20.11)
- **Retention**: 12 weeks

## Monitoring

- **SNMP**: Enabled (v3)
- **Syslog**: Enabled, sending to Monitoring VM (10.0.20.30)
- **NetFlow**: Enabled, sending to Monitoring VM (10.0.20.30)

## Troubleshooting

### Common Issues

#### Port Flapping

1. Check cable integrity
2. Verify no loops exist in the network
3. Check for PoE power budget issues
4. Review device power requirements

#### High CPU/Memory Usage

1. Check for broadcast storms
2. Review traffic patterns in controller
3. Verify firmware is up to date
4. Check for unauthorized devices

#### PoE Problems

1. Verify PoE budget is not exceeded
2. Check device PoE compatibility
3. Try resetting the port
4. Test with a different PoE device

## Maintenance Procedures

### Firmware Updates

1. Download firmware from Unifi
2. Schedule maintenance window
3. Backup switch configuration
4. Apply update through controller
5. Verify all services return to normal

### Adding New VLANs

1. Define VLAN in pfSense
2. Add VLAN to Unifi Controller
3. Update port profiles as needed
4. Update documentation
5. Test connectivity