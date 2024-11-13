
module.exports = {
  publicPath: '/chatapp',
  pwa: {
    manifestOptions: {
      name: 'Chat App',
      shortName: 'Chatapp',
      description: 'A chatapp progressive web app',
      startUrl: '/chatapp',
      start_url: '/chatapp',
      display: 'standalone',
      theme_color: '#000000',
      icons: [
        {
          src: "./img/icons/android-chrome-192x192.png",
          sizes: "192x192",
          type: "image/png",
        }
      ]
    },
    backgroundColor: '#000000',
    themeColor: '#000000',
    display: "standalone",
  },
}
