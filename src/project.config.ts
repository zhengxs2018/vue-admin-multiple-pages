export default {
  debug: process.env.NODE_ENV === 'development',

  // 主题配置
  themeConfig: {
    layout: {
      context: require.context('./layouts', false, /\.vue$/),
      default: 'basic'
    }
  }
}
