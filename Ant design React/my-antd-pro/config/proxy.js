/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */
export default {
  dev: {
    //代理所有/api/开头的
    '/service': {
      //代理的后台的后台代理
      target: 'http://localhost:8089/',
      //是否有多个虚拟站点
      changeOrigin: true,
      // 代理路径中将属性路径去除，不设置的话会报404
      pathRewrite: {
        '^/service':
          '',
      }
    },
  }
}

