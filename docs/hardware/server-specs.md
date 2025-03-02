# Server Specifications

This page provides detailed specifications for all server hardware in your home lab infrastructure.

## Main Server

### Overview

- **Role**: Primary virtualization host
- **Form Factor**: Custom 2U Rackmount
- **Acquisition Date**: January 2024
- **Warranty Status**: Active until January 2027

### Hardware Specifications

#### Processor
- **CPU**: AMD Ryzen 9 5950X
- **Cores/Threads**: 16 cores, 32 threads
- **Base Clock**: 3.4 GHz
- **Boost Clock**: Up to 4.9 GHz
- **Cache**: 64MB L3 cache
- **TDP**: 105W

#### Memory
- **Total RAM**: 128GB DDR4 ECC
- **Configuration**: 4 x 32GB DIMMs
- **Speed**: 3200 MHz
- **Type**: ECC Registered
- **Manufacturer**: Kingston

#### Storage
- **Boot/OS**:
  - 2 x 1TB Samsung 980 Pro NVMe SSD in RAID 1
  - Controller: Onboard AMD
- **VM Storage**:
  - 4 x 4TB Seagate IronWolf Pro in RAID 10
  - Controller: LSI 9300-8i HBA (IT mode)
- **Expansion Slots**:
  - 2 x NVMe slots (both occupied)
  - 8 x SATA/SAS bays (4 occupied)

#### Networking
- **Primary NIC**: Mellanox ConnectX-4 10GbE SFP+
- **Secondary NICs**: 2 x Intel i350-T2 (4 x 1GbE ports total)
- **Management**: IPMI (ASRock Rack)

#### Power
- **PSU**: Seasonic FOCUS Plus 850W 80+ Platinum
- **Redundancy**: None
- **Typical Power Draw**: 95W idle, 280W under load
- **UPS**: Connected to CyberPower 1500VA UPS

#### Cooling
- **CPU Cooler**: Noctua NH-U12S
- **Case Fans**: 4 x Noctua NF-A12x25 PWM
- **Typical Temperatures**:
  - CPU: 35°C idle, 65°C load
  - System: 30°C idle, 40°C load

### Software Configuration

- **Host OS**: Proxmox VE 7.4
- **Kernel**: 5.15.102-1-pve
- **Virtualization**: KVM + LXC
- **Storage**: ZFS for VM storage
- **Backup**: Scheduled to Backup Server

### Virtual Machines

| VM Name | vCPUs | RAM | Storage | Purpose |
|---------|-------|-----|---------|---------|
| pfsense | 4 | 8GB | 50GB | Network router (backup) |
| media-server | 8 | 16GB | 50GB + 20TB NFS | Media services |
| home-automation | 4 | 8GB | 40GB | Smart home control |
| monitoring | 4 | 8GB | 40GB + 200GB NFS | System monitoring |
| unifi-controller | 2 | 4GB | 20GB | Network management |
| pihole | 2 | 2GB | 20GB | DNS and ad blocking |
| dev-server | 4 | 16GB | 100GB | Development environment |

### Performance Benchmarks

- **CPU (Geekbench 5)**: Single-core: 1650, Multi-core: 16200
- **Storage (NVMe RAID 1)**: 
  - Sequential Read: 6.5 GB/s
  - Sequential Write: 5.0 GB/s
  - 4K Random Read: 400K IOPS
  - 4K Random Write: 350K IOPS
- **Storage (HDD RAID 10)**:
  - Sequential Read: 800 MB/s
  - Sequential Write: 750 MB/s
  - 4K Random Read: 2K IOPS
  - 4K Random Write: 1.8K IOPS
- **Network**: 9.6 Gbps throughput (iperf3)

### Expansion Capabilities

- **RAM Slots**: 4 (all occupied)
- **Maximum RAM**: 128GB (current)
- **Storage Bays**: 4 available
- **PCIe Slots**: 1 x16 available, 1 x8 available
- **Planned Upgrades**: None in next 12 months

## Backup Server

### Overview

- **Role**: Secondary virtualization host and backup target
- **Form Factor**: Dell PowerEdge R720 2U Rackmount
- **Acquisition Date**: June 2022
- **Warranty Status**: Active until June 2025

### Hardware Specifications

#### Processor
- **CPU**: 2 x Intel Xeon E5-2680 v2
- **Cores/Threads**: 20 cores, 40 threads total
- **Base Clock**: 2.8 GHz
- **Boost Clock**: Up to 3.6 GHz
- **Cache**: 25MB L3 cache per CPU
- **TDP**: 115W per CPU

#### Memory
- **Total RAM**: 96GB DDR3 ECC
- **Configuration**: 12 x 8GB DIMMs
- **Speed**: 1600 MHz
- **Type**: ECC Registered
- **Manufacturer**: Dell

#### Storage
- **Boot/OS**:
  - 2 x 500GB Samsung 870 EVO SSD in RAID 1
  - Controller: PERC H710 Mini
- **Backup Storage**:
  - 6 x 8TB WD Red Pro in RAID 6
  - Controller: PERC H710P
- **Expansion Slots**:
  - 8 x 2.5" front bays (2 occupied)
  - 6 x 3.5" rear bays (all occupied)

#### Networking
- **Primary NIC**: Mellanox ConnectX-3 10GbE SFP+
- **Secondary NICs**: 4 x 1GbE (Broadcom BCM5720)
- **Management**: iDRAC 7 Enterprise

#### Power
- **PSU**: 2 x 750W Redundant Power Supplies
- **Redundancy**: 1+1
- **Typical Power Draw**: 110W idle, 320W under load
- **UPS**: Connected to CyberPower 1500VA UPS

#### Cooling
- **CPU Cooler**: Stock Dell heatsinks
- **Case Fans**: 6 x Dell hot-swap fans
- **Typical Temperatures**:
  - CPU: 40°C idle, 70°C load
  - System: 35°C idle, 45°C load

### Software Configuration

- **Host OS**: Proxmox VE 7.4
- **Kernel**: 5.15.102-1-pve
- **Virtualization**: KVM + LXC
- **Storage**: ZFS for backup storage
- **Backup**: Cross-backup with Main Server

### Virtual Machines

| VM Name | vCPUs | RAM | Storage | Purpose |
|---------|-------|-----|---------|---------|
| backup-manager | 4 | 8GB | 50GB + 30TB ZFS | Backup orchestration |
| duplicati | 2 | 4GB | 20GB | File-level backups |
| syncthing | 2 | 4GB | 20GB + 2TB ZFS | File synchronization |
| monitoring-backup | 2 | 4GB | 20GB | Redundant monitoring |
| test-environment | 8 | 16GB | 100GB | Testing and development |

### Performance Benchmarks

- **CPU (Geekbench 5)**: Single-core: 750, Multi-core: 12000
- **Storage (SSD RAID 1)**: 
  - Sequential Read: 550 MB/s
  - Sequential Write: 520 MB/s
  - 4K Random Read: 95K IOPS
  - 4K Random Write: 90K IOPS
- **Storage (HDD RAID 6)**:
  - Sequential Read: 700 MB/s
  - Sequential Write: 500 MB/s
  - 4K Random Read: 1.5K IOPS
  - 4K Random ### Performance Benchmarks (continued)

- **Storage (HDD RAID 6)**:
  - 4K Random Write: 1.2K IOPS
- **Network**: 9.4 Gbps throughput (iperf3)

### Expansion Capabilities

- **RAM Slots**: 24 (12 occupied)
- **Maximum RAM**: 768GB
- **Storage Bays**: 6 front bays available
- **PCIe Slots**: 2 available
- **Planned Upgrades**: Additional 96GB RAM in Q3 2025

## Network Attached Storage (NAS)

### Overview

- **Role**: Primary storage server
- **Form Factor**: Custom 4U Rackmount
- **Acquisition Date**: March 2023
- **Warranty Status**: Active until March 2026

### Hardware Specifications

#### Processor
- **CPU**: Intel Xeon E-2278G
- **Cores/Threads**: 8 cores, 16 threads
- **Base Clock**: 3.4 GHz
- **Boost Clock**: Up to 5.0 GHz
- **Cache**: 16MB L3 cache
- **TDP**: 80W

#### Memory
- **Total RAM**: 64GB DDR4 ECC
- **Configuration**: 2 x 32GB DIMMs
- **Speed**: 2666 MHz
- **Type**: ECC Unbuffered
- **Manufacturer**: Crucial

#### Storage
- **Boot/OS**:
  - 2 x 500GB Samsung 870 EVO SSD in mirror
  - Controller: Onboard Intel SATA
- **Cache**:
  - 2 x 1TB Samsung 980 Pro NVMe SSD in mirror
  - Controller: Onboard Intel
- **Main Storage**:
  - 12 x 16TB Seagate EXOS X16 in RAIDZ2 (ZFS)
  - Controller: LSI 9300-16i HBA (IT mode)
- **Expansion Slots**:
  - 2 x NVMe slots (both occupied)
  - 16 x SATA/SAS bays (12 occupied)

#### Networking
- **Primary NIC**: Mellanox ConnectX-4 10GbE SFP+
- **Secondary NICs**: 2 x Intel i350-T2 (4 x 1GbE ports total)
- **Management**: IPMI (Supermicro)

#### Power
- **PSU**: Seasonic FOCUS Plus 850W 80+ Platinum
- **Redundancy**: None
- **Typical Power Draw**: 120W idle, 220W under load
- **UPS**: Connected to CyberPower 1500VA UPS

#### Cooling
- **CPU Cooler**: Noctua NH-U12S
- **Case Fans**: 6 x Noctua NF-A12x25 PWM
- **Typical Temperatures**:
  - CPU: 38°C idle, 60°C load
  - System: 32°C idle, 42°C load
  - Drives: 35°C idle, 40°C load

### Software Configuration

- **OS**: TrueNAS Scale
- **Kernel**: Linux-based
- **File Systems**: ZFS
- **Services**:
  - SMB/CIFS
  - NFS
  - iSCSI
  - S3-compatible object storage
  - Replication

### Storage Pools

| Pool Name | Configuration | Raw Capacity | Usable Capacity | Purpose |
|-----------|---------------|--------------|-----------------|---------|
| boot-pool | 2 x 500GB SSD (mirror) | 1TB | 500GB | OS |
| cache-pool | 2 x 1TB NVMe (mirror) | 2TB | 1TB | ZFS cache |
| main-pool | 12 x 16TB HDD (RAIDZ2) | 192TB | 160TB | Primary storage |

### Shares and Datasets

| Name | Type | Quota | Compression | Purpose |
|------|------|-------|-------------|---------|
| media | SMB, NFS | 100TB | lz4 | Media files |
| backups | SMB, NFS | 40TB | zstd | System backups |
| isos | NFS | 1TB | lz4 | Installation media |
| documents | SMB | 5TB | zstd | Personal files |
| photos | SMB | 10TB | lz4 | Photo library |
| vm-storage | NFS, iSCSI | None | lz4 | VM storage |

### Performance Benchmarks

- **CPU (Geekbench 5)**: Single-core: 1350, Multi-core: 9200
- **Storage (NVMe Cache)**:
  - Sequential Read: 6.8 GB/s
  - Sequential Write: 5.2 GB/s
  - 4K Random Read: 420K IOPS
  - 4K Random Write: 380K IOPS
- **Storage (HDD RAIDZ2)**:
  - Sequential Read: 2.2 GB/s
  - Sequential Write: 1.8 GB/s
  - 4K Random Read: 3.5K IOPS
  - 4K Random Write: 2.8K IOPS
- **Network**: 9.7 Gbps throughput (iperf3)

### Expansion Capabilities

- **RAM Slots**: 4 (2 occupied)
- **Maximum RAM**: 128GB
- **Storage Bays**: 4 available
- **PCIe Slots**: 1 available
- **Planned Upgrades**: Additional 4 x 16TB drives in Q4 2025

## GPU Server (Planned)

### Overview

- **Role**: Transcoding and AI workloads
- **Form Factor**: Custom 2U Rackmount
- **Planned Acquisition**: Q3 2025

### Planned Specifications

#### Processor
- **CPU**: AMD Ryzen 9 7950X
- **Cores/Threads**: 16 cores, 32 threads
- **Base Clock**: 4.5 GHz
- **Boost Clock**: Up to 5.7 GHz
- **Cache**: 64MB L3 cache
- **TDP**: 170W

#### Memory
- **Total RAM**: 128GB DDR5
- **Configuration**: 4 x 32GB DIMMs
- **Speed**: 6000 MHz
- **Type**: ECC (if available)

#### Storage
- **Boot/OS**: 2 x 2TB NVMe SSD in RAID 1
- **Data Storage**: NFS from NAS

#### GPU
- **Primary GPU**: NVIDIA RTX 4080
- **VRAM**: 16GB GDDR6X
- **CUDA Cores**: 9728
- **Purpose**: AI inference, transcoding

#### Networking
- **Primary NIC**: 10GbE SFP+
- **Secondary NICs**: 2 x 1GbE

#### Power
- **PSU**: 1000W 80+ Platinum
- **Estimated Power Draw**: 150W idle, 450W under load

### Planned Software Configuration

- **Host OS**: Proxmox VE
- **Virtualization**: KVM with GPU passthrough
- **Containers**: Docker + Kubernetes

### Planned Workloads

- Media transcoding (Jellyfin)
- AI model training and inference
- Computer vision applications
- Machine learning experiments