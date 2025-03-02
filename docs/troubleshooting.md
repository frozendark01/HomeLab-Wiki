# Troubleshooting Guide

This page contains common issues and their solutions for your home lab infrastructure.

## Network Issues

### Internet Connection Down

1. **Check physical connections**:
   - Verify the fiber/cable connection to the modem
   - Check all Ethernet cables between modem, router, and switches

2. **Restart networking equipment in order**:
   - Power off modem, router, and switches
   - Wait 30 seconds
   - Power on modem and wait for it to fully initialize (all lights stable)
   - Power on router and wait for it to fully initialize
   - Power on switches

3. **Check pfSense status**:
   - Access pfSense dashboard at https://pfsense.home.lab
   - Verify WAN interface has an IP address
   - Check system logs for errors

4. **Contact ISP**:
   - If all above steps fail, contact your ISP
   - Reference ticket numbers: [Keep a list of previous outage tickets here]

### Wi-Fi Connectivity Issues

1. **Check access point status**:
   - Verify all APs are online in the Unifi Controller
   - Check for any firmware updates available

2. **Troubleshoot client issues**:
   - Forget the network on the device and reconnect
   - Try connecting to a different SSID (2.4GHz vs 5GHz)
   - Verify the device is not blocked or restricted in the controller

3. **Check for interference**:
   - Use a Wi-Fi analyzer app to check for channel congestion
   - Consider changing channel settings in the Unifi Controller

### VLAN/Routing Problems

1. **Verify VLAN configuration**:
   - Check VLAN definitions in pfSense
   - Verify VLAN tagging on switch ports
   - Ensure trunk ports are configured correctly

2. **Check firewall rules**:
   - Review firewall rules in pfSense for the affected VLANs
   - Temporarily disable rules to test connectivity (remember to re-enable)
   - Check firewall logs for blocked connections

## Server Issues

### Proxmox Host Down

1. **Physical checks**:
   - Verify power and network connections
   - Check front panel for error indicators
   - Listen for unusual sounds (fan noise, beeping)

2. **Remote management**:
   - Try accessing IPMI/iDRAC interface
   - Attempt graceful shutdown if possible
   - Use IPMI to power cycle the server

3. **Data preservation**:
   - If server is unresponsive, focus on protecting data
   - Do not force power off unless necessary
   - Document any error messages

### VM Performance Issues

1. **Check resource utilization**:
   - Review CPU, memory, and disk usage in Proxmox
   - Look for resource contention between VMs
   - Check for runaway processes within the VM

2. **Storage performance**:
   - Verify disk health in TrueNAS
   - Check for disk errors in system logs
   - Run SMART tests on physical drives

3. **Network performance**:
   - Check for network saturation
   - Verify NIC settings (speed, duplex)
   - Test throughput between different network segments

## Service Issues

### Docker Container Failures

1. **Check container status**:
   ```bash
   docker ps -a
   ```

2. **View container logs**:
   ```bash
   docker logs [container_name]
   ```

3. **Restart problematic container**:
   ```bash
   docker restart [container_name]
   ```

4. **Check Docker host resources**:
   ```bash
   docker stats
   ```

### Database Issues

1. **Check database service status**:
   ```bash
   systemctl status mariadb
   # or
   systemctl status postgresql
   ```

2. **Review database logs**:
   ```bash
   tail -n 100 /var/log/mysql/error.log
   # or
   tail -n 100 /var/log/postgresql/postgresql-13-main.log
   ```

3. **Check database connectivity**:
   ```bash
   mysql -u root -p
   # or
   psql -U postgres
   ```

### Web Service Issues

1. **Check web server status**:
   ```bash
   systemctl status nginx
   # or
   systemctl status apache2
   ```

2. **Review web server logs**:
   ```bash
   tail -n 100 /var/log/nginx/error.log
   # or
   tail -n 100 /var/log/apache2/error.log
   ```

3. **Verify SSL certificates**:
   ```bash
   openssl x509 -in /etc/ssl/certs/your-cert.crt -text -noout
   ```

## Backup and Recovery

### Failed Backups

1. **Check backup logs**:
   - Review Veeam or Duplicati logs for errors
   - Verify backup destination is accessible
   - Check for disk space issues

2. **Test backup connectivity**:
   - Verify network path to backup destination
   - Check credentials used for backup
   - Test write permissions to backup location

3. **Restart backup services**:
   - Restart the backup application service
   - Clear any locked or temporary files
   - Run a manual backup to test functionality

### Data Recovery Procedure

1. **Assess the situation**:
   - Determine what data needs to be recovered
   - Identify the most recent good backup
   - Estimate recovery time and impact

2. **Prepare recovery environment**:
   - Ensure sufficient disk space for recovery
   - Verify recovery tools are working
   - Document the recovery plan

3. **Execute recovery**:
   - Restore from backup using appropriate tool
   - Verify data integrity after recovery
   - Document any issues encountered

## Emergency Procedures

### Power Outage

1. **UPS monitoring**:
   - Check UPS status and estimated runtime
   - Initiate graceful shutdown if runtime is insufficient
   - Monitor power status remotely if possible

2. **Automated shutdown sequence**:
   - VMs should automatically shut down via UPS network card
   - Host servers should shut down after VMs
   - Network equipment should remain on UPS power longest

3. **Recovery after power restoration**:
   - Allow UPS to charge to at least 50% before powering on equipment
   - Power on in sequence: networking, storage, servers
   - Verify all services come online properly

### Hardware Failure

1. **Identify failed component**:
   - Use diagnostic tools to identify the failure
   - Check system logs for hardware errors
   - Isolate the failed component

2. **Implement temporary workaround**:
   - Move critical VMs to functioning hardware
   - Adjust resource allocation to maintain essential services
   - Document temporary configuration changes

3. **Replace failed hardware**:
   - Order replacement parts
   - Schedule maintenance window
   - Follow proper ESD procedures during replacement
   - Update documentation with new hardware details