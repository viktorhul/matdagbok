const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: '../build',
  pwa: {
    name: 'Matdagboken',
    themeColor: '#2e2e2e',
    backgroundColor: '#2e2e2e',
    appleMobileWebAppCapable: 'yes'
  }
})
