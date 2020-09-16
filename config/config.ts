import { defineConfig } from 'umi';
import routes from './routes';

export default defineConfig({
  dva: {
    immer: true,
    hmr: true,
  },
  nodeModulesTransform: {
    type: 'none',
  },
  define: {},
  routes,
});
