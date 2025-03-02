---
layout: home

hero:
  name: HomeLabWiki
  text: Your Home Infrastructure Documentation
  tagline: A centralized knowledge base for your home lab setup, configurations, and troubleshooting guides.
  image:
    src: /bghero.png
    alt: Home Network Infrastructure Diagram
     
  actions:
    - theme: brand
      text: Get Started
      link: /getting-started
    - theme: alt
      text: Network Setup
      link: /network/
    - theme: alt
      text: Services
      link: /services/

features:
  - icon: 🖧
    title: Network Infrastructure
    details: Documentation for your network setup including router, switch configurations, VLANs, and Wi-Fi settings.
  - icon: 🖥️
    title: Server Hardware
    details: Detailed specifications of your server hardware, storage solutions, and peripheral devices.
  - icon: 🚀
    title: Services & Applications
    details: Configuration guides for all services running in your home lab including media servers, home automation, and more.
  - icon: 📊
    title: Monitoring & Maintenance
    details: Keep track of your infrastructure with monitoring tools and regular maintenance procedures.
  - icon: 🔒
    title: Security Best Practices
    details: Implement security measures to protect your home network and services from threats.
  - icon: 🛠️
    title: Troubleshooting
    details: Common issues and their solutions to quickly resolve problems in your home lab.
---



<style>
:root {
  --primary-color: #3a86ff;
  --secondary-color: #8338ec;
  --accent-color: #ff006e;
  --success-color: #38b000;
  --warning-color: #ffbe0b;
  --danger-color: #ff006e;
  --text-color: #2b2d42;
  --text-light: #8d99ae;
  --bg-color: #f8f9fa;
  --card-bg: #ffffff;
  --card-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  --border-radius: 12px;
  --transition: all 0.3s ease;
}

.home-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;
}

/* Status Dashboard */
.dashboard-section h2,
.quick-access-section h2,
.updates-section h2,
.resource-section h2 {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: var(--text-color);
  position: relative;
  padding-bottom: 0.5rem;
}

.dashboard-section h2::after,
.quick-access-section h2::after,
.updates-section h2::after,
.resource-section h2::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 60px;
  height: 4px;
  background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
  border-radius: 2px;
}

.status-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
}

.status-card {
  background: var(--card-bg);
  border-radius: var(--border-radius);
  box-shadow: var(--card-shadow);
  padding: 1.5rem;
  display: flex;
  align-items: center;
  transition: var(--transition);
}

.status-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
}

.status-card.online {
  border-left: 4px solid var(--success-color);
}

.status-card.warning {
  border-left: 4px solid var(--warning-color);
}

.status-card.danger {
  border-left: 4px solid var(--danger-color);
}

.status-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: bold;
  margin-right: 1rem;
}

.online .status-icon {
  background-color: rgba(56, 176, 0, 0.15);
  color: var(--success-color);
}

.warning .status-icon {
  background-color: rgba(255, 190, 11, 0.15);
  color: var(--warning-color);
}

.danger .status-icon {
  background-color: rgba(255, 0, 110, 0.15);
  color: var(--danger-color);
}

.status-info h3 {
  margin: 0;
  font-size: 1.1rem;
  color: var(--text-color);
}

.status-info p {
  margin: 0.3rem 0 0;
  color: var(--text-light);
  font-size: 0.9rem;
}

/* Quick Access */
.quick-access-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1.5rem;
}

.quick-link {
  background: var(--card-bg);
  border-radius: var(--border-radius);
  box-shadow: var(--card-shadow);
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  transition: var(--transition);
  text-decoration: none;
  color: var(--text-color);
}

.quick-link:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
  color: var(--primary-color);
}

.quick-icon {
  font-size: 2rem;
  margin-bottom: 0.8rem;
}

/* Timeline */
.timeline {
  position: relative;
  max-width: 100%;
}

.timeline::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 20px;
  width: 2px;
  background: linear-gradient(to bottom, var(--primary-color), var(--secondary-color));
}

.timeline-item {
  position: relative;
  padding-left: 45px;
  padding-bottom: 2rem;
}

.timeline-item:last-child {
  padding-bottom: 0;
}

.timeline-date {
  position: absolute;
  left: 0;
  top: 0;
  width: 40px;
  height: 40px;
  background: var(--card-bg);
  border: 2px solid var(--primary-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: bold;
  color: var(--primary-color);
  z-index: 1;
}

.timeline-content {
  background: var(--card-bg);
  border-radius: var(--border-radius);
  box-shadow: var(--card-shadow);
  padding: 1.5rem;
  transition: var(--transition);
}

.timeline-content:hover {
  transform: translateX(5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
}

.timeline-content h3 {
  margin: 0 0 0.5rem;
  font-size: 1.1rem;
  color: var(--text-color);
}

.timeline-content p {
  margin: 0;
  color: var(--text-light);
  font-size: 0.95rem;
}

.read-more {
  display: inline-block;
  margin-top: 0.8rem;
  color: var(--primary-color);
  font-size: 0.9rem;
  font-weight: 500;
  text-decoration: none;
  transition: var(--transition);
}

.read-more:hover {
  color: var(--secondary-color);
  text-decoration: underline;
}

/* Resource Usage */
.resource-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
}

.resource-card {
  background: var(--card-bg);
  border-radius: var(--border-radius);
  box-shadow: var(--card-shadow);
  padding: 1.5rem;
  transition: var(--transition);
}

.resource-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
}

.resource-card h3 {
  margin: 0 0 1rem;
  font-size: 1.1rem;
  color: var(--text-color);
}

.progress-container {
  width: 100%;
  height: 10px;
  background-color: #edf2f7;
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
  border-radius: 5px;
  transition: width 0.5s ease;
}

.progress-bar.warning {
  background: linear-gradient(90deg, var(--warning-color), #ff9e00);
}

.progress-bar.danger {
  background: linear-gradient(90deg, var(--danger-color), #ff5400);
}

.resource-details {
  font-size: 0.9rem;
  color: var(--text-light);
  text-align: right;
}

/* Responsive adjustments */
@media (min-width: 768px) {
  .home-container {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .dashboard-section,
  .resource-section {
    grid-column: span 2;
  }
}

@media (min-width: 1024px) {
  .timeline::before {
    left: 50%;
    transform: translateX(-50%);
  }
  
  .timeline-item {
    padding-left: 0;
    padding-right: 0;
    width: 50%;
  }
  
  .timeline-item:nth-child(odd) {
    margin-right: auto;
    padding-right: 45px;
  }
  
  .timeline-item:nth-child(even) {
    margin-left: auto;
    padding-left: 45px;
  }
  
  .timeline-date {
    left: auto;
    right: 0;
  }
  
  .timeline-item:nth-child(even) .timeline-date {
    left: 0;
    right: auto;
  }
}

@media (max-width: 767px) {
  .status-grid,
  .quick-access-grid,
  .resource-grid {
    grid-template-columns: 1fr;
  }
}
</style>