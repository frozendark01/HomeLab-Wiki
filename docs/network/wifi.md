# Wi-Fi Configuration

This page documents the wireless network configuration in your home lab infrastructure.

## Access Point Hardware

| Device | Model | Location | Coverage Area |
|--------|-------|----------|--------------|
| Main AP | Unifi U6-Pro | Living Room | Main Floor |
| Office AP | Unifi U6-Pro | Home Office | Second Floor |
| Basement AP | Unifi U6-Lite | Basement | Basement + Yard |

## Wireless Networks

### Primary Networks

| SSID | VLAN | Band | Security | Purpose |
|------|------|------|----------|---------|
| HomeNet | 10 | 2.4GHz + 5GHz | WPA3 | Main network for trusted devices |
| HomeNet-IoT | 30 | 2.4GHz | WPA2 | Network for IoT devices |
| HomeNet-Guest | 40 | 2.4GHz + 5GHz | WPA2 | Guest network |
| HomeNet-Media | 50 | 5GHz | WPA3 | High-performance media devices |

### Advanced Settings

| SSID | Band Steering | DTIM | Minimum Data Rate | Channel Width | PMF |
|------|---------------|------|-------------------|---------------|-----|
| HomeNet | Enabled | 3 | 12 Mbps | 80 MHz (5GHz), 20 MHz (2.4GHz) | Required |
| HomeNet-IoT | Disabled | 1 | 6 Mbps | 20 MHz | Optional |
| HomeNet-Guest | Enabled | 3 | 12 Mbps | 40 MHz (5GHz), 20 MHz (2.4GHz) | Optional |
| HomeNet-Media | Enabled | 3 | 24 Mbps | 80 MHz | Required |

## Channel Configuration

### 2.4 GHz Band

| Access Point | Channel | Transmit Power | Width |
|--------------|---------|----------------|-------|
| Main AP | 1 | Medium (16 dBm) | 20 MHz |
| Office AP | 6 | Medium (16 dBm) | 20 MHz |
| Basement AP | 11 | Medium (16 dBm) | 20 MHz |

### 5 GHz Band

| Access Point | Channel | Transmit Power | Width |
|--------------|---------|----------------|-------|
| Main AP | 36 | High (23 dBm) | 80 MHz |
| Office AP | 149 | High (23 dBm) | 80 MHz |
| Basement AP | 64 | Medium (20 dBm) | 40 MHz |

## Security Settings

### WPA3 Networks

- **Security Type**: WPA3
- **Encryption**: AES/CCMP
- **PMF (Protected Management Frames)**: Required
- **Key Rotation**: 3600 seconds
- **Group Key Rotation**: 3600 seconds

### WPA2 Networks

- **Security Type**: WPA2-PSK
- **Encryption**: AES/CCMP
- **PMF (Protected Management Frames)**: Optional
- **Key Rotation**: 86400 seconds (24 hours)
- **Group Key Rotation**: 3600 seconds

### Guest Network

- **Guest Portal**: Enabled
- **Captive Portal**: Simple password
- **Client Isolation**: Enabled
- **Rate Limiting**: 25 Mbps down, 10 Mbps up
- **Session Timeout**: 24 hours

## Advanced Features

### Mesh Configuration

- **Uplink Connectivity Monitor**: Enabled
- **Auto-Optimize Network**: Enabled
- **Mesh Point Usage**: Basement AP (wired backhaul)
- **Preferred Uplink AP**: Main AP

### Fast Roaming

- **802.11r**: Enabled
- **OKC (Opportunistic Key Caching)**: Enabled
- **802.11k**: Enabled (Neighbor Reports)
- **802.11v**: Enabled (BSS Transition)

### Band Steering

- **Preference**: 5 GHz
- **Threshold**: -70 dBm
- **Sticky Client Detection**: Enabled
- **Minimum RSSI**: -80 dBm

## Performance Optimization

### Interference Mitigation

- **SSID Minimum Signal Strength**: -75 dBm
- **Auto Channel Selection**: Enabled
- **Scan Interval**: 24 hours
- **DFS Channels**: Enabled

### Capacity Settings

- **Airtime Fairness**: Enabled
- **Maximum Clients per AP**: 50
- **DTIM Period**: 3 (balanced)
- **RTS/CTS Threshold**: 2346 (disabled)
- **Fragmentation Threshold**: 2346 (disabled)

## Monitoring and Troubleshooting

### Signal Coverage Map

The home has been mapped for signal strength to ensure proper coverage:

- **Living Areas**: -45 to -55 dBm (Excellent)
- **Bedrooms**: -55 to -65 dBm (Very Good)
- **Basement**: -60 to -70 dBm (Good)
- **Yard/Patio**: -65 to -75 dBm (Fair to Good)

### Common Issues

#### Poor Client Performance

1. Check for interference from neighboring networks
2. Verify client is connecting to closest AP
3. Test with band steering disabled
4. Check for outdated client drivers

#### Roaming Problems

1. Verify fast roaming is enabled
2. Check for minimum RSSI settings
3. Ensure overlapping coverage between APs
4. Test with different roaming settings

#### Connectivity Drops

1. Check AP logs for errors
2. Verify power supply is stable
3. Test with different channel settings
4. Check for interference sources

## Maintenance Schedule

- **Firmware Updates**: Monthly (during maintenance window)
- **Channel Optimization**: Quarterly
- **Coverage Testing**: Bi-annually
- **Client Audit**: Monthly (remove unauthorized devices)