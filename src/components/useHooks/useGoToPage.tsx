import { history } from 'umi';
import * as queryString from 'querystring';

export enum TypeEnum {
  'URL' = 'url',
}

export enum DirectionEnum {
  TOP_TO_BOTTOM = 'TOP_TO_BOTTOM',
  BOTTOM_TO_TOP = 'BOTTOM_TO_TOP',
  LEFT_TO_RIGHT = 'LEFT_TO_RIGHT',
  RIGHT_TO_LEFT = 'RIGHT_TO_LEFT',
  TOP_RIGHT_TO_BOTTOM_LEFT = 'TOP_RIGHT_TO_BOTTOM_LEFT',
  BOTTOM_LEFT_TO_TOP_RIGHT = 'BOTTOM_LEFT_TO_TOP_RIGHT',
  TOP_LEFT_TO_BOTTOM_RIGHT = 'TOP_LEFT_TO_BOTTOM_RIGHT',
  BOTTOM_RIGHT_TO_TOP_LEFT = 'BOTTOM_RIGHT_TO_TOP_LEFT',
}

export interface JSBridgeConfigInterface {
  timestamp?: number;
  type?: TypeEnum;
  title?: string;
  showNavigationBar?: boolean;
  tabIndex?: number;
  route?: string;
  query?: { [propsName: string]: any };

  // setNavigationBar
  animated?: boolean;

  // left 仅限图标
  leftElement?: {
    icon?: string;
    onClick?: () => void;
  };

  // right 这个只能传一个
  rightElement?: {
    icon?: string;
    text?: string;
    onClick?: () => void;
  };

  // 背景
  background?:
    | string
    | {
        startColor?: string;
        endColor?: string;
        direction?: DirectionEnum;
      };
}

export enum WebviewSkipMethod {
  'POP' = 'Controller.pop', // 弹出
  'PUSH' = 'Controller.push',
  'POP_TO_ROOT' = 'Controller.popToRoot',
  'SELECT_ANT_PUSH' = 'Controller.selectAndPush', // 选择 tab 之后 push 必须传 tabIndex
  'SET_NAVIGATION_BAR' = 'Controller.setNavigationBar', // 设置 bar
}

export interface PageInfoInterface {
  method: WebviewSkipMethod;
  params?: JSBridgeConfigInterface;
  callback?: (response: { code: number; data: any }) => void;
}

const useGoToPage = () => {
  const { userAgent } = navigator;

  return (pageInfo: PageInfoInterface) => {
    const { method, params, callback } = pageInfo;
    if (userAgent.indexOf('Safari') >= 0) {
      // h5
      if (method === WebviewSkipMethod.POP) {
        history.goBack();
      }
      if (params && params.route) {
        history.push({
          pathname: params.route,
          query: params.query || {},
        });
      }
    } else {
      // App
      const route = params?.route;
      const extraConfig = (() => {
        if (params?.type === TypeEnum.URL) {
          return {
            type: TypeEnum.URL,
            url: `${window.location.origin}${route}?${queryString.stringify(
              params.query,
            )}`,
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
