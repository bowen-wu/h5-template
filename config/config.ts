import { defineConfig } from 'umi';
import routes from './routes';

export default defineConfig({
  plugins: ['@alitajs/hd'],
  dva: {
    hmr: true,
  },
  nodeModulesTransform: {
    type: 'none',
  },
  define: {
    APP_MARK: 'AldtMall,GongFuDai',
    PRODUCT_NAME: '寄速麦',
  },
  hash: true,
  routes,
  theme: {
    hd: '1px',
  },
  hd: {
    theme: {},
    px2rem: {
      /**
       * umi 默认 designWidth === 750, px2rem 默认 rootValue === 100
       * designWidthDefault / rootValueDefault === designWidthCurrent / rootValueCurrent
       */
      rootValue: 50,
      unitPrecision: 5,
      propWhiteList: [],
      propBlackList: [],
      exclude: false,
      selectorBlackList: [],
      ignoreIdentifier: false,
      replace: true,
      mediaQuery: false,
      minPixelValue: 0,
    },
  },
  sass: {},
  chainWebpack: config => {
    const oneOfsMap = config.module.rule('sass').oneOfs.values();
    oneOfsMap.forEach(item => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          /**
           * scss 全局文件
           * 注意：此处是 ./src/**
           */
          resources: [
            './src/assets/styles/_variable.scss',
            './src/assets/styles/_mixin.scss',
            './src/assets/styles/_zIndex.scss',
            './src/assets/styles/_function.scss',
          ],
        })
        .end();
    });
  },
});
