import { history } from 'umi';

export interface PageInfoInterface {
  method: string;
  params?: JSBridgeConfigInterface;
  callback?: (response?: any) => void;
}

const useGoToPage = () => {
  const { userAgent } = navigator;

  return (pageInfo: PageInfoInterface) => {
    const { method, params, callback } = pageInfo;
    if (userAgent.indexOf('Safari') >= 0) {
      // h5
      if (method === 'Controller.pop') {
        history.goBack();
      }
      if (params && params.route) {
        history.push(params.route);
      }
    } else {
      // App
      const route = params?.route;
      const extraConfig = (() => {
        if (params?.type === TypeEnum.url) {
          return {
            type: TypeEnum.url,
            url: `${window.location.origin}${route}`,
          };
        }
        return {};
      })();
      const config = Object.assign({ ...params, ...extraConfig });
      window.JSBridge.callNative(method, config, callback);
    }
  };
};

export default useGoToPage;
