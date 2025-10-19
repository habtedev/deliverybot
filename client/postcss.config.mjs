// Export PostCSS plugins using string keys (plugin name -> options) which
// Next.js expects when integrating PostCSS with Webpack.
export default {
  plugins: {
    '@tailwindcss/postcss': {},
    'autoprefixer': {},
  },
};
