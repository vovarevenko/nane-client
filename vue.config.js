module.exports = {
  publicPath: process.env.VUE_APP_PUBLIC_PATH ?? '/',
  pluginOptions: {
    quasar: {
      importStrategy: 'kebab',
      rtlSupport: false,
    },
  },
  transpileDependencies: ['quasar'],
}
