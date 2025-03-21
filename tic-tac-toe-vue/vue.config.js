const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  // Basic configuration options
  publicPath: process.env.NODE_ENV === 'production' ? '/tic-tac-toe/' : '/', // Base URL for deployed app
  outputDir: 'dist', // Output directory for the production build
  assetsDir: 'assets', // Directory for static assets (relative to outputDir)
  lintOnSave: process.env.NODE_ENV !== 'production', // Enable ESLint on save in development
  productionSourceMap: false, // Disable source maps in production for smaller build size

  // Dev server configuration
  devServer: {
    port: 8080, // Port for the development server
    open: true, // Automatically open the browser when the server starts
    hot: true, // Enable Hot Module Replacement (HMR)
    proxy: {
      // Proxy API requests to a backend server
      '/api': {
        target: 'http://localhost:3000', // Backend server URL
        changeOrigin: true, // Needed for virtual hosted sites
        pathRewrite: { '^/api': '' }, // Rewrite the API path
      },
    },
  },

  // Webpack configuration
  configureWebpack: {
    // Add custom webpack plugins or modify the config
    plugins: [],
    optimization: {
      splitChunks: {
        chunks: 'all', // Split chunks for better caching
      },
    },
  },

  // CSS configuration
  css: {
    loaderOptions: {
      // Pass options to CSS pre-processors
      sass: {
        additionalData: `@import "@/assets/styles/variables.scss";`, // Global SCSS variables
      },
      css: {
        modules: {
          auto: true, // Enable CSS modules for files ending in .module.css
        },
      },
    },
  },

  // Plugin options
  pluginOptions: {
    // Options for third-party plugins
    i18n: {
      locale: 'en', // Default locale for i18n
      fallbackLocale: 'en', // Fallback locale
      localeDir: 'locales', // Directory for locale files
      enableInSFC: true, // Enable i18n in Single File Components
    },
  },
});