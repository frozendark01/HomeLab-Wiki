# Hardware Overview

This section documents all the physical hardware components in your home lab infrastructure.

## Server Rack

Your home lab is housed in a 12U server rack with the following specifications:

- **Model**: StarTech 12U Open Frame Rack
- **Dimensions**: 22" W x 16" D x 25" H
- **Power**: CyberPower 1500VA UPS with network management card
- **Cooling**: Two 120mm rack-mounted fans

## Main Server

The primary server that runs most of your virtualized workloads:

- **Model**: Custom Built 2U Server
- **CPU**: AMD Ryzen 9 5950X (16 cores, 32 threads)
- **RAM**: 128GB DDR4 ECC (4x32GB)
- **Storage**:
  - 2x 1TB NVMe SSD in RAID 1 for OS/VM storage
  - 4x 4TB SAS HDD in RAID 10 for data storage
- **Network**: 
  - 1x 10GbE SFP+ NIC
  - 2x 1GbE Intel NICs
- **Host OS**: Proxmox VE 7.4

## Backup Server

Secondary server used primarily for backups and redundancy:

- **Model**: Dell PowerEdge R720
- **CPU**: 2x Intel Xeon E5-2680 v2 (10 cores each)
- **RAM**: 96GB DDR3 ECC
- **Storage**:
  - 2x 500GB SSD in RAID 1 for OS
  - 6x 8TB SATA HDD in RAID 6 for backup storage
- **Network**: 
  - 1x 10GbE SFP+ NIC
  - 4x 1GbE onboard NICs
- **Host OS**: Proxmox VE 7.4

## Network Attached Storage (NAS)

Dedicated storage server for media and file sharing:

- **Model**: Custom Built 4U Storage Server
- **CPU**: Intel Xeon E-2278G (8 cores, 16 threads)
- **RAM**: 64GB DDR4 ECC
- **Storage**:
  - 2x 500GB SSD in mirror for OS
  - 2x 1TB NVMe SSD for cache
  - 12x 16TB SATA HDD in RAIDZ2 (2 parity drives)
- **Network**: 
  - 1x 10GbE SFP+ NIC
  - 2x 1GbE Intel NICs
- **OS**: TrueNAS Scale

## Networking Equipment

| Device | Model | Specifications | Location |
|--------|-------|----------------|----------|
| Router | pfSense Appliance | 4-core Intel CPU, 16GB RAM, 6x 1GbE ports | Top of rack |
| Core Switch | Unifi USW-24-POE | 24-port Gigabit, 16 POE ports, 2x 10G SFP+ | Middle of rack |
| Server Switch | Unifi USW-16-XG | 16-port 10G SFP+ | Middle of rack |
| Access Points | 3x Unifi U6-Pro | Wi-Fi 6, 4x4 MIMO | Ceiling mounted |

## Power Consumption

| Device | Idle Power | Load Power | Annual kWh (est.) |
|--------|------------|------------|-------------------|
| Main Server | 95W | 280W | 832 kWh |
| Backup Server | 110W | 320W | 964 kWh |
| NAS | 120W | 220W | 1,051 kWh |
| Networking | 65W | 85W | 569 kWh |
| **Total** | **390W** | **905W** | **3,416 kWh** |

## Hardware Lifecycle

| Device | Purchase Date | Warranty Expiration | Planned Replacement |
|--------|---------------|---------------------|---------------------|
| Main Server | January 2024 | January 2027 | January 2028 |
| Backup Server | June 2022 | June 2025 | June 2026 |
| NAS | March 2023 | March 2026 | March 2028 |
| Router | December 2023 | December 2025 | December 2026 |
| Core Switch | December 2023 | December 2025 | December 2027 |
| Server Switch | December 2023 | December 2025 | December 2027 |

## Expansion Plans

Future hardware additions planned for the next 12 months:

1. **GPU Server**:
   - Purpose: Transcoding and AI workloads
   - Specifications: AMD Ryzen 7000 series with NVIDIA RTX 4080
   - Timeline: Q3 2025

2. **Storage Expansion**:
   - Purpose: Additional media storage
   - Specifications: 4-bay DAS with 4x 20TB drives
   - Timeline: Q4 2025

3. **Network Upgrade**:
   - Purpose: Improve wireless coverage
   - Specifications: 2x additional Wi-Fi 6E access points
   - Timeline: Q2 2025