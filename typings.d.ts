declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.gif';
declare module "*.png";
declare module '*.svg' {
  export function ReactComponent(props: React.SVGProps<SVGSVGElement>): React.ReactElement
  const url: string
  export default url
}


// google analytics interface
interface Window {}

declare const BASEURL: string;
declare const BASE_PREFIX: string;
