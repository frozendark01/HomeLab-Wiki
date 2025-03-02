import { defineConfig } from 'vitepress';

// refer https://vitepress.dev/reference/site-config for details
export default defineConfig({
  lang: 'en-US',
  title: 'HomeLabWiki',
  description: 'Documentation for your home infrastructure lab.',
  
  themeConfig: {
    logo: '/logo.png',
    siteTitle: 'HomeLabWiki',
    
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Getting Started', link: '/getting-started' },
      { text: 'Network', link: '/network/' },
      { text: 'Services', link: '/services/' },
      { text: 'Hardware', link: '/hardware/' },
      { text: 'Troubleshooting', link: '/troubleshooting' },
    ],

    sidebar: {
      '/network/': [
        {
          text: 'Network',
          items: [
            { text: 'Overview', link: '/network/' },
            { text: 'Router Setup', link: '/network/router' },
            { text: 'Switch Configuration', link: '/network/switch' },
            { text: 'Wi-Fi', link: '/network/wifi' },
          ]
        }
      ],
      '/services/': [
        {
          text: 'Services',
          items: [
            { text: 'Overview', link: '/services/' },
            { text: 'Media Server', link: '/services/media-server' },
            { text: 'Home Automation', link: '/services/home-automation' },
            { text: 'Monitoring', link: '/services/monitoring' },
          ]
        }
      ],
      '/hardware/': [
        {
          text: 'Hardware',
          items: [
            { text: 'Overview', link: '/hardware/' },
            { text: 'Server Specs', link: '/hardware/server-specs' },
            { text: 'Storage', link: '/hardware/storage' },
            { text: 'Peripherals', link: '/hardware/peripherals' },
          ]
        }
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/yourusername/homelab-wiki' }
    ],

    footer: {
      copyright: 'Copyright © 2025 HomeLabWiki'
    },

    search: {
      provider: 'local'
    }
  }
});