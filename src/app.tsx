import { Toast } from 'antd-mobile';
import { RequestConfig } from 'umi';

// const codeMessage = {
//   200: '服务器成功返回请求的数据。',
//   201: '新建或修改数据成功。',
//   202: '一个请求已经进入后台排队（异步任务）。',
//   204: '删除数据成功。',
//   400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
//   401: '用户没有权限（令牌、用户名、密码错误）。',
//   403: '用户得到授权，但是访问是被禁止的。',
//   404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
//   406: '请求的格式不可得。',
//   410: '请求的资源被永久删除，且不会再得到的。',
//   422: '当创建一个对象时，发生一个验证错误。',
//   500: '服务器发生错误，请检查服务器。',
//   502: '网关错误。',
//   503: '服务不可用，服务器暂时过载或维护。',
//   504: '网关超时。',
// };

/**
 * 异常处理程序
 */
const errorHandler = (error: { response: Response; message: string }) => {
  const { response } = error;

  if (response && response.status) {
    // const errorText = codeMessage[response.status] || response.statusText;
    const errorText = response.statusText;

    const { status, url } = response;

    Toast.fail(`请求错误 ${status}: ${url}，${errorText}`);
  } else if (!response) {
    Toast.fail(error.message);
  }
  return response;
};

export const request: RequestConfig = {
  timeout: 1000,
  errorHandler, // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
  prefix: `${BASEURL}${BASE_PREFIX}`, // 前缀, 用于覆盖统一设置的prefix
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
      const data = await response.clone().json();
      if (data.code === '1000002') {
        // TODO: 重新登录逻辑
      }

      // TODO：报错逻辑
      if (
        (data.code !== undefined && data.code !== 0 && data.code !== '0') ||
        data.status === 0
      ) {
        throw new Error(data.msg || data.message);
      }
      return response;
    },
  ],
};
