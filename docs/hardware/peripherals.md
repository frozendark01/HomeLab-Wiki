# Peripherals and Accessories

This page documents the various peripheral devices and accessories used in your home lab infrastructure.

## Rack and Enclosure

### Server Rack

- **Model**: StarTech 12U Open Frame Rack
- **Dimensions**: 22" W x 16" D x 25" H
- **Weight Capacity**: 350 lbs
- **Features**:
  - Adjustable depth
  - Casters with locks
  - Cable management hooks
  - Numbered rack units

### Rack Accessories

| Item | Model | Quantity | Purpose |
|------|-------|----------|---------|
| Blanking Panels | StarTech 1U | 4 | Airflow management |
| Cable Management | AC Infinity 1U | 2 | Horizontal cable routing |
| Vertical Cable Channels | StarTech | 2 | Vertical cable routing |
| Shelf | StarTech 1U Vented | 1 | Non-rackmount equipment |
| Drawer | StarTech 2U Lockable | 1 | Tools and spare parts |

## Power Management

### Uninterruptible Power Supply (UPS)

- **Model**: CyberPower PR1500LCD
- **Capacity**: 1500VA / 1000W
- **Form Factor**: 2U Rackmount
- **Runtime**: 
  - Full load: ~7 minutes
  - Half load: ~18 minutes
- **Features**:
  - Pure sine wave output
  - LCD status display
  - Network management card
  - Automatic voltage regulation
  - USB and serial connectivity

### Power Distribution Unit (PDU)

- **Model**: Tripp Lite PDUMH15
- **Outlets**: 8 x NEMA 5-15R
- **Input**: NEMA 5-15P, 15A, 120V
- **Form Factor**: 1U Rackmount
- **Features**:
  - Digital load meter
  - Circuit breaker
  - 15-foot power cord

### Power Monitoring

- **Software**: Network UPS Tools (NUT)
- **Integration**: Proxmox, TrueNAS, Home Assistant
- **Automated Actions**:
  - Graceful shutdown sequence on low battery
  - Power event notifications
  - Power consumption logging

## Cooling and Environmental Control

### Rack Cooling

- **Fans**: 2 x AC Infinity CLOUDPLATE T7-N, 2U rack mount fan panel
- **Airflow**: Front-to-back
- **Control**: Thermal controller with display
- **Noise Level**: 30-45 dBA depending on load

### Temperature Monitoring

- **Sensors**: 5 x Raspberry Pi Pico with DHT22 sensors
- **Locations**:
  - Top of rack
  - Middle of rack
  - Bottom of rack
  - Room ambient
  - HVAC return
- **Monitoring**: Data logged to Prometheus/Grafana
- **Alerts**: Configured for high temperature conditions

### Environmental Controls

- **Room Air Conditioning**: Dedicated mini-split system
  - **Model**: Mitsubishi MSZ-GL12NA
  - **Capacity**: 12,000 BTU
  - **Control**: Wi-Fi enabled, integrated with Home Assistant
- **Humidity Control**: Integrated dehumidifier function in mini-split

## Network Connectivity

### Patch Panels

- **Model**: TRENDnet 24-port Cat6 Patch Panel
- **Quantity**: 2
- **Features**:
  - Color-coded for different VLANs
  - Numbered ports
  - Cable management bar

### Cables

| Type | Category | Length | Quantity | Color Coding |
|------|----------|--------|----------|--------------|
| Ethernet | Cat6 | 1ft | 24 | Blue (Management) |
| Ethernet | Cat6 | 1ft | 12 | Green (Servers) |
| Ethernet | Cat6 | 1ft | 8 | Yellow (IoT) |
| Ethernet | Cat6 | 1ft | 6 | Red (Guest) |
| Ethernet | Cat6 | 1ft | 6 | Purple (Media) |
| Ethernet | Cat6 | 3ft | 12 | Various |
| Ethernet | Cat6 | 5ft | 8 | Various |
| Ethernet | Cat6 | 10ft | 4 | Various |
| Fiber | OM4 | 3ft | 4 | Aqua |
| Power | C13 to C14 | 2ft | 8 | Black |
| Power | C13 to 5-15P | 6ft | 4 | Black |

### SFP+ Modules and DACs

| Type | Speed | Compatibility | Quantity | Purpose |
|------|-------|---------------|----------|---------|
| DAC Cable | 10GbE | Unifi/Mellanox | 3 | Server to switch connections |
| SFP+ SR Transceiver | 10GbE | Unifi/Mellanox | 2 | Fiber connections |
| SFP+ to RJ45 | 10GbE | Unifi | 1 | 10GbE copper connection |

## KVM and Remote Management

### KVM Switch

- **Model**: TESmart 8-Port HDMI KVM
- **Features**:
  - 8 ports with HDMI and USB
  - 4K resolution support
  - Hotkey switching
  - Front panel buttons
  - Remote control

### KVM Accessories

| Item | Model | Quantity | Purpose |
|------|-------|----------|---------|
| KVM Cables | HDMI + USB | 4 | Server connections |
| Monitor | Dell P2419H 24" | 1 | Local display |
| Keyboard | Logitech K120 | 1 | Local input |
| Mouse | Logitech M100 | 1 | Local input |
| USB Hub | Anker 4-Port | 1 | Additional USB connections |

### Remote Management

- **IPMI/iDRAC**: All servers equipped with remote management
- **Network KVM**: Raritan Dominion KX III
- **Serial Console Server**: Avocent ACS 8000
- **VPN Access**: WireGuard for secure remote access

## Storage Accessories

### Disk Handling

| Item | Purpose | Quantity |
|------|---------|----------|
| Drive Sleds | Hot-swap drive carriers | 24 |
| Anti-Static Bags | Drive storage | 20 |
| Drive Shipping Cases | Secure transport | 4 |
| Drive Labels | Identification | 1 pack |

### Backup Media

- **External Drives**: 4 x 14TB WD Elements
- **Storage Case**: Waterproof/fireproof safe
- **Offsite Storage**: Safety deposit box

## Tools and Maintenance Equipment

### Hand Tools

| Tool | Purpose | Quantity |
|------|---------|----------|
| Precision Screwdriver Set | Server maintenance | 1 |
| Cable Tester | Network troubleshooting | 1 |
| Crimping Tool | Custom cable creation | 1 |
| Wire Cutters/Strippers | Cable management | 1 |
| Flashlight | Working in dark areas | 2 |
| Label Maker | Equipment labeling | 1 |

### Cleaning Supplies

| Item | Purpose | Quantity |
|------|---------|----------|
| Compressed Air | Dust removal | 3 cans |
| Microfiber Cloths | Surface cleaning | 10 |
| Isopropyl Alcohol | Contact cleaning | 1 bottle |
| Cable Ties | Cable management | 100 pack |
| Velcro Straps | Reusable cable management | 50 pack |

### Spare Parts

| Part | Compatibility | Quantity | Purpose |
|------|---------------|----------|---------|
| Power Supplies | Various | 2 | Emergency replacement |
| Network Cards | Intel i350-T2 | 1 | Emergency replacement |
| Hard Drives | 4TB, 8TB, 16TB | 1 each | Hot spares |
| Memory Modules | DDR4 ECC | 2 | Emergency replacement |
| Fans | 80mm, 120mm | 2 each | Emergency replacement |

## Documentation and Labeling

### Physical Documentation

- **Binder**: Contains printed network diagrams, passwords, and procedures
- **Asset Tags**: All equipment labeled with asset ID
- **Cable Labels**: All cables labeled at both ends
- **Port Labels**: All switch and patch panel ports labeled
- **QR Codes**: Link to wiki pages for specific equipment

### Emergency Procedures

- **Laminated Cards**: Step-by-step shutdown and recovery procedures
- **Contact List**: Emergency contacts and service providers
- **Service Credentials**: Stored in sealed envelope in secure location

## Mobile Access Kit

### Portable Toolkit

- **Laptop**: Lenovo ThinkPad X1 Carbon
  - **OS**: Ubuntu 22.04 LTS
  - **Software**: SSH, IPMI tools, network diagnostics
- **USB Console Cable**: FTDI-based serial adapter
- **Portable Switch**: 8-port gigabit switch
- **Power Inverter**: For vehicle power
- **Wi-Fi Analyzer**: For wireless troubleshooting
- **Portable Battery**: For powering small devices

## Environmental Monitoring

### Sensors

| Sensor Type | Location | Quantity | Measurement |
|-------------|----------|----------|-------------|
| Temperature | Throughout rack | 5 | °C/°F |
| Humidity | Rack and room | 3 | %RH |
| Power Consumption | PDU | 1 | Watts |
| Water Detection | Floor near rack | 2 | Presence |
| Motion | Room entry | 1 | Movement |

### Camera System

- **Model**: Reolink RLC-810A
- **Resolution**: 4K (8MP)
- **Features**:
  - Person/vehicle detection
  - Night vision
  - Motion alerts
  - Local NVR recording
  - Integration with Home Assistant