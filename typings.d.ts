declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.gif';
declare module '*.png';
declare module '*.svg' {
  export function ReactComponent(
    props: React.SVGProps<SVGSVGElement>,
  ): React.ReactElement;
  const url: string;
  export default url;
}

declare enum TypeEnum {
  'class' = 'class',
  'url' = 'url',
  'front' = '0',
  'back' = '1',
  'handHeld' = '2',
}

interface JSBridgeConfigInterface {
  type?: TypeEnum;
  route?: string;
  title?: string;
  animated?: boolean;
  className?: string;
  tabIndex?: number;
  url?: string;
  timestamp?: number;
  hiddenAlert?: boolean;
}

interface JSBridgeInterface {
  registerJSEventHandler: (method: string, callback: () => void) => void;
  removeJSEventHandler: (method: string, callback: () => void) => void;
  callNative: (
    method: string,
    config?: JSBridgeConfigInterface,
    callback?: (response?: any) => void,
  ) => void;
}

// google analytics interface
interface Window {
  JSBridge: JSBridgeInterface;
  onNativeLeftButtonClick: () => void;
}

declare const BASEURL: string;
declare const BASE_PREFIX: string;
