/**
 * TODO:
 * 1. callback queue
 * 2. Dynamically resolve property type based on another prototype value
 */

import { history } from 'umi';
import * as queryString from 'querystring';
import { BasicBarItemElement } from '@/components/interface';
import { Toast } from 'antd-mobile';

export enum TypeEnum {
  'CLASS' = 'class',
  'URL' = 'url',
  'FRONT' = '0',
  'BACK' = '1',
  'HAND_HELD' = '2',
}

export enum SkipType {
  ROUTE = 'route',
  WEBVIEW = 'webview',
}

export enum DirectionEnum {
  TOP_BOTTOM = 'TOP_BOTTOM',
  BOTTOM_TOP = 'BOTTOM_TOP',
  TR_BL = 'TR_BL',
  BL_TR = 'BL_TR',
  RIGHT_LEFT = 'RIGHT_LEFT',
  LEFT_RIGHT = 'LEFT_RIGHT',
  BR_TL = 'BR_TL',
  TL_BR = 'TL_BR',
}

export enum RightItemType {
  IMAGE = 'image',
  TEXT = 'text',
}

export enum WebviewSkipMethod {
  'POP' = 'Controller.pop', // 弹出
  'PUSH' = 'Controller.push',
  'APP_CLIPBOARD' = 'App.clipboard', // 复制
  'SET_BAR_RIGHT_ITEMS' = 'NavBar.setRightItems', // 设置右侧区域的元素
  'SET_BAR_LEFT_ITEMS' = 'NavBar.setLeftItems', // 设置右侧区域的元素
  'POP_AND_PUSH' = 'Controller.popAndPush', // 先 pop 到指定的层级，之后 push，参数：{tag: '', push: {tag: ''}}

  // 功夫贷 JSBridge 方法
  'SET_BAR_COLOR' = 'NavBar.setBarColor',
}

export interface BarItemElement extends BasicBarItemElement {
  key: string;
}

interface BarConfig {
  startColor: string;
  endColor: string;
  direction?: DirectionEnum;
  titleColor?: string;
}

interface BasicParams {
  timestamp?: number;
  callback?: (response: { code: number; data: any }) => void;
}

interface PushParams {
  title: string;
  type: TypeEnum;
  route: string;
  barConfig?: BarConfig;
  tag?: string;
  query?: { [propsName: string]: any };
  url?: string;
}

interface Push extends BasicParams {
  method: WebviewSkipMethod.PUSH;
  skipType?: SkipType;
  params: PushParams;
}

interface Pop extends BasicParams {
  method: WebviewSkipMethod.POP;
  skipType?: SkipType;
  params?: {
    tag: string;
  };
}

interface AppClipboard extends BasicParams {
  method: WebviewSkipMethod.APP_CLIPBOARD;
  params: {
    copyContent: string;
  };
}

interface SetBarColor extends BasicParams {
  method: WebviewSkipMethod.SET_BAR_COLOR;
  params: {
    barConfig?: BarConfig;
  };
}

interface SetBarRightItems extends BasicParams {
  method: WebviewSkipMethod.SET_BAR_RIGHT_ITEMS;
  params?: {
    rightItemList: BarItemElement[];
  };
}

interface PopAndPush extends BasicParams {
  method: WebviewSkipMethod.POP_AND_PUSH;
  params: {
    tag: string;
    push: PushParams;
  };
}

interface SetBarLeftItems extends BasicParams {
  method: WebviewSkipMethod.SET_BAR_LEFT_ITEMS;
  params?: {
    leftItem: BarItemElement;
  };
}

export type PageInfoInterface =
  | AppClipboard
  | Push
  | Pop
  | SetBarColor
  | SetBarRightItems
  | SetBarLeftItems
  | PopAndPush;

const defaultBarConfig = {
  startColor: '#DAC0AB',
  endColor: '#CCAC95',
  direction: DirectionEnum.TOP_BOTTOM,
};

const getPushConfig = (params: PushParams) => {
  const { query, route, ...rest } = params;
  const host = window.location.origin;
  const queryStr = queryString.stringify(query);
  const defaultTag = params.route;
  return {
    tag: defaultTag,
    barConfig: defaultBarConfig,
    url: `${host}${route}?${queryStr}`,
    ...rest,
  };
};

const fn = (pageInfo: PageInfoInterface) => {
  const { userAgent } = navigator;
  const { method, callback } = pageInfo;
  const InAppAndUseWebview = (() => {
    if (APP_MARK.split(',').some(mark => userAgent.indexOf(mark) >= 0)) {
      if (
        method === WebviewSkipMethod.PUSH ||
        method === WebviewSkipMethod.POP
      ) {
        return (pageInfo as Push | Pop).skipType !== SkipType.ROUTE;
      }
      return true;
    }
    return false;
  })();
  if (InAppAndUseWebview) {
    // App
    const configParams = (() => {
      switch (method) {
        case WebviewSkipMethod.PUSH:
          return getPushConfig((pageInfo as Push).params);
        case WebviewSkipMethod.SET_BAR_COLOR:
          return Object.assign(
            { barConfig: defaultBarConfig },
            pageInfo.params ? { ...pageInfo.params } : {},
          );
        case WebviewSkipMethod.POP_AND_PUSH: {
          const { params } = pageInfo as PopAndPush;
          const { tag, push: pushParams } = params;
          return {
            tag,
            push: getPushConfig(pushParams),
          };
        }
        default:
          return Object.assign(
            {},
            pageInfo.params ? { ...pageInfo.params } : {},
          );
      }
    })();

    const config = { ...configParams, timestamp: Date.now() };
    window.JSBridge.callNative(method, config, callback);
  } else {
    // h5
    if (method === WebviewSkipMethod.POP) {
      history.goBack();
      return;
    }
    if (method === WebviewSkipMethod.PUSH) {
      const { params } = pageInfo as Push;
      history.push({
        pathname: params.route,
        query: { ...params.query, title: params.title },
      });
      return;
    }
    Toast.fail('暂不支持该方法！');
  }
};

const JSBridgeCallNative = (pageInfo: PageInfoInterface) => {
  if (IS_APP && !window.JSBridge) {
    document.addEventListener('JSBridgeReady', fn.bind(null, pageInfo));
  } else {
    fn(pageInfo);
  }
};

export default JSBridgeCallNative;
