import { Toast } from 'antd-mobile';
import { RequestConfig } from 'umi';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

interface ErrorInfoStructure {
  success: boolean; // if request is success
  data?: any; // response data
  errorCode?: string; // code for errorType
  errorMessage?: string; // message display to user
  showType?: number; // error display type： 0 silent; 1 message.warn; 2 message.error; 4 notification; 9 page
  traceId?: string; // Convenient for back-end Troubleshooting: unique request ID
  host?: string; // onvenient for backend Troubleshooting: host of current access server
}

interface ResponseData {
  code: number;
  error: string;
  message: string;
  path: string;
  status: number;
  timestamp: string;
}

interface RequestError extends Error {
  data: ResponseData; // 这里是后端返回的原始数据
  info?: ErrorInfoStructure;
}

/**
 * 异常处理程序
 */
const errorHandler = (requestError: RequestError) => {
  const errorMessage = (() => {
    if (requestError.data && requestError.data.status !== 200) {
      if (requestError.data.status === 401) {
        return '登录超时，请重新发起寄售';
      }
      const errorText = codeMessage[requestError.data.status];
      return `请求错误 ${requestError.data.status}: ${requestError.data.path}，${errorText}`;
    }
    if (requestError.data && requestError.data.code !== 0) {
      return requestError.data.message;
    }
    return '网络超时';
  })();
  Toast.fail(errorMessage);
  if (requestError.data.status === 401) {
    // TODO: 跳回商城
  }
  throw new Error(errorMessage);
};

export const request: RequestConfig = {
  timeout: 3000,
  errorHandler, // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
  prefix: `${BASE_URL}${BASE_PREFIX}`, // 前缀, 用于覆盖统一设置的prefix
  errorConfig: {
    adaptor: resData => {
      return {
        ...resData,
        success: resData.errNo === 0,
        errorMessage: resData.errMsg,
      };
    },
  },
  middlewares: [],
  requestInterceptors: [
    (url, options) => ({
      options: {
        ...options,
        interceptors: true,
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'X-Litemall-Token': window.localStorage.getItem('token') || '',
        },
      },
    }),
  ],
  responseInterceptors: [
    async response => {
      const data: ResponseData = await response.clone().json();
      if (response.status !== 200 || data.code !== 0) {
        errorHandler({ data, name: 'business error', message: data.message });
      }
      Toast.hide();
      return response;
    },
  ],
};
