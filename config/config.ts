import { defineConfig } from 'umi';
import routes from './routes';

export default defineConfig({
  plugins: ['@alitajs/hd'],
  dva: {
    immer: true,
    hmr: true,
  },
  nodeModulesTransform: {
    type: 'none',
  },
  define: {},
  routes,
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
});
