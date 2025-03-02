# Home Automation Setup

This page documents the configuration of the home automation system in your home lab infrastructure.

## Overview

The home automation system provides centralized control of smart home devices, automated routines, and monitoring of environmental conditions throughout your home.

## Hardware Allocation

- **VM Host**: Main Server (Proxmox)
- **CPU**: 4 vCPUs
- **RAM**: 8GB
- **Storage**:
  - System: 40GB SSD (local)
  - Data: 100GB NFS share from NAS
- **Network**: VLAN 20 (Servers), 1GbE

## Software Stack

| Component | Version | Purpose | Configuration |
|-----------|---------|---------|---------------|
| Ubuntu Server | 22.04 LTS | Base OS | Minimal installation |
| Docker | Latest | Container runtime | Default configuration |
| Home Assistant | Latest | Core automation platform | Z-Wave, Zigbee, MQTT integration |
| Node-RED | Latest | Advanced automation flows | Integrated with Home Assistant |
| Mosquitto | Latest | MQTT broker | Secured with username/password |
| ESPHome | Latest | Custom firmware for ESP devices | Multiple device configurations |
| Zigbee2MQTT | Latest | Zigbee device management | Connected to CC2652P coordinator |

## Docker Compose Configuration

The entire home automation stack is deployed using Docker Compose. Here's the configuration file:

```yaml
version: '3'
services:
  homeassistant:
    container_name: homeassistant
    image: ghcr.io/home-assistant/home-assistant:stable
    volumes:
      - /opt/homeassistant:/config
      - /etc/localtime:/etc/localtime:ro
    restart: unless-stopped
    privileged: true
    network_mode: host
    
  nodered:
    container_name: nodered
    image: nodered/node-red:latest
    volumes:
      - /opt/nodered:/data
    ports:
      - 1880:1880
    restart: unless-stopped
    
  mosquitto:
    container_name: mosquitto
    image: eclipse-mosquitto:latest
    volumes:
      - /opt/mosquitto/config:/mosquitto/config
      - /opt/mosquitto/data:/mosquitto/data
      - /opt/mosquitto/log:/mosquitto/log
    ports:
      - 1883:1883
      - 9001:9001
    restart: unless-stopped
    
  esphome:
    container_name: esphome
    image: esphome/esphome:latest
    volumes:
      - /opt/esphome:/config
      - /etc/localtime:/etc/localtime:ro
    restart: unless-stopped
    privileged: true
    network_mode: host
    
  zigbee2mqtt:
    container_name: zigbee2mqtt
    image: koenkk/zigbee2mqtt:latest
    volumes:
      - /opt/zigbee2mqtt:/app/data
      - /run/udev:/run/udev:ro
    ports:
      - 8080:8080
    restart: unless-stopped
    privileged: true
    environment:
      - TZ=America/New_York
```

## Connected Devices

### Smart Home Hubs

| Device | Connection | Protocol | Location | Purpose |
|--------|------------|----------|----------|---------|
| Sonoff Zigbee 3.0 USB Dongle Plus | USB | Zigbee | Server Rack | Zigbee coordinator |
| Aeotec Z-Stick Gen5 | USB | Z-Wave | Server Rack | Z-Wave controller |
| Raspberry Pi 4 | Ethernet | Wi-Fi/BLE | Living Room | Bluetooth proxy |

### Lighting

| Device | Protocol | Room | Integration |
|--------|----------|------|-------------|
| Philips Hue Bridge | Ethernet | N/A | Direct API |
| Philips Hue Bulbs (x12) | Zigbee | Various | Via Hue Bridge |
| LIFX Bulbs (x4) | Wi-Fi | Various | Direct API |
| Lutron Caseta Bridge | Ethernet | N/A | Direct API |
| Lutron Dimmers (x8) | Proprietary | Various | Via Caseta Bridge |

### Climate Control

| Device | Protocol | Room | Integration |
|--------|----------|------|-------------|
| Ecobee Thermostat | Wi-Fi | Hallway | Direct API |
| Ecobee Room Sensors (x4) | Proprietary | Various | Via Ecobee |
| Smart Vents (x6) | Zigbee | Various | Zigbee2MQTT |

### Security

| Device | Protocol | Location | Integration |
|--------|----------|----------|-------------|
| Door Sensors (x5) | Z-Wave | Entry Points | Z-Wave |
| Motion Sensors (x8) | Zigbee | Various | Zigbee2MQTT |
| IP Cameras (x4) | Ethernet | Perimeter | Frigate NVR |
| Smart Locks (x2) | Z-Wave | Front/Back Doors | Z-Wave |

### Media

| Device | Protocol | Room | Integration |
|--------|----------|------|-------------|
| Roku TVs (x3) | Wi-Fi | Living Areas | Roku API |
| Sonos Speakers (x5) | Wi-Fi | Various | Sonos API |
| Chromecast (x2) | Wi-Fi | Bedrooms | Cast API |

### Custom Devices

| Device | Protocol | Location | Purpose |
|--------|----------|----------|---------|
| ESP32 Weather Station | Wi-Fi/MQTT | Outside | Temperature, humidity, pressure |
| ESP8266 Plant Monitors (x4) | Wi-Fi/MQTT | Various | Soil moisture, light levels |
| ESP32 Garage Controller | Wi-Fi/MQTT | Garage | Door control, temperature |
| ESP8266 Energy Monitor | Wi-Fi/MQTT | Electrical Panel | Power consumption |

## Home Assistant Configuration

### Integrations

| Integration | Purpose | Authentication |
|-------------|---------|---------------|
| Z-Wave JS | Z-Wave device control | Local |
| Zigbee2MQTT | Zigbee device control | Local MQTT |
| MQTT | Message broker | Username/Password |
| ESPHome | Custom ESP devices | API Key |
| Google Cast | Media control | Local discovery |
| Philips Hue | Lighting control | Bridge API |
| Ecobee | Climate control | OAuth |
| Frigate | Camera NVR | Local API |
| Node-RED | Advanced automation | Local |
| Sonos | Audio control | Local discovery |
| Weather | Weather data | API Key |
| Energy | Energy monitoring | Local |

### Dashboards

| Dashboard | Purpose | Access Level |
|-----------|---------|-------------|
| Main | General home control | All users |
| Climate | HVAC and temperature | All users |
| Security | Cameras and sensors | Admin only |
| Energy | Power monitoring | Admin only |
| Media | Entertainment control | All users |
| Mobile | Optimized for phones | All users |

### Automations

| Automation | Trigger | Actions | Conditions |
|------------|---------|---------|------------|
| Morning Routine | Time (6:30 AM) | Lights on, HVAC adjust, Weather report | Weekdays only |
| Evening Mode | Sunset | Exterior lights on, adjust indoor lighting | Home occupied |
| Away Mode | All phones leave home | HVAC eco mode, lights off, security arm | Manual override check |
| Bedtime | Time (11:00 PM) | Lights off, HVAC night mode, lock doors | Home occupied |
| Motion Lighting | Motion sensors | Turn on relevant lights | Only when dark |
| Weather Alerts | Weather API | Notifications, close smart vents | Severe weather only |

## Node-RED Flows

| Flow | Purpose | Complexity |
|------|---------|------------|
| HVAC Optimization | Smart temperature control based on occupancy | High |
| Presence Detection | Multi-sensor fusion for accurate presence | High |
| Lighting Scenes | Advanced lighting control | Medium |
| Notification Manager | Centralized notifications | Medium |
| Energy Management | Load balancing and usage optimization | High |
| Security Monitor | Advanced security logic | High |

## ESPHome Devices

### Weather Station

```yaml
esphome:
  name: weather_station
  platform: ESP32
  board: esp32dev

sensor:
  - platform: bme280
    temperature:
      name: "Outside Temperature"
    pressure:
      name: "Outside Pressure"
    humidity:
      name: "Outside Humidity"
    address: 0x76
    update_interval: 60s
    
  - platform: adc
    pin: A0
    name: "Rain Sensor"
    update_interval: 30s
    
  - platform: adc
    pin: A1
    name: "Light Level"
    update_interval: 60s
```

### Garage Controller

```yaml
esphome:
  name: garage_controller
  platform: ESP32
  board: esp32dev

binary_sensor:
  - platform: gpio
    pin: D2
    name: "Garage Door Status"
    device_class: garage_door
    
switch:
  - platform: gpio
    pin: D1
    name: "Garage Door Control"
    
sensor:
  - platform: dht
    pin: D4
    temperature:
      name: "Garage Temperature"
    humidity:
      name: "Garage Humidity"
    model: DHT22
    update_interval: 60s
```

## MQTT Configuration

### Broker Settings

- **Authentication**: Username/password
- **TLS/SSL**: Enabled
- **ACL**: Configured for device-specific access
- **Persistence**: Enabled
- **Retention**: Messages retained for 24 hours

### Topic Structure

- `homeassistant/`: Auto-discovery
- `zigbee/`: Zigbee2MQTT devices
- `esp/`: ESPHome devices
- `sensors/`: General sensor data
- `controls/`: Device control commands
- `status/`: Device status information

## Backup Strategy

- **Config Backups**:
  - All container configurations backed up daily
  - Home Assistant configuration in Git repository
  - ESPHome configurations in Git repository
  - Node-RED flows exported weekly
- **Data Backups**:
  - Database backed up daily
  - Historical data archived monthly
  - Retention: 90 days

## Maintenance Tasks

- **Database Maintenance**: Monthly
- **Device Check**: Weekly
- **Battery Check**: Monthly notification for battery-powered devices
- **Automation Review**: Quarterly
- **System Updates**: Monthly (scheduled maintenance window)

## Troubleshooting

### Common Issues

#### Z-Wave/Zigbee Device Connectivity

1. Check USB stick connection
2. Verify device is within range
3. Try re-pairing the device
4. Check for interference sources

#### Automation Failures

1. Review automation triggers and conditions
2. Check entity availability
3. Verify service calls are correct
4. Check Home Assistant logs

#### MQTT Communication Issues

1. Verify broker is running
2. Check client authentication
3. Review topic structure
4. Monitor MQTT logs

## Access Information

| Service | Internal URL | External URL | Notes |
|---------|--------------|--------------|-------|
| Home Assistant | http://homeassistant.home.lab:8123 | https://ha.yourdomain.com | Reverse proxied |
| Node-RED | http://nodered.home.lab:1880 | Not exposed | Internal only |
| Mosquitto | mqtt://mqtt.home.lab:1883 | Not exposed | Internal only |
| ESPHome | http://esphome.home.lab:6052 | Not exposed | Internal only |
| Zigbee2MQTT | http://zigbee.home.lab:8080 | Not exposed | Internal only |