
module.exports = {
  pwa: {
    manifestOptions: {
      name: 'Chat App',
      shortName: 'Chatapp',
      description: 'A chatapp progressive web app',
      startUrl: '/',
      display: 'standalone',
      theme_color: '#000000',
      icons: [
        {
          src: "./img/icons/android-chrome-192x192.png",
          sizes: "192x192",
          type: "image/png"
        }
      ]
    },
    backgroundColor: '#000000',
    themeColor: '#000000',
  },
}
