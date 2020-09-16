import { useEffect, useRef } from 'react';

interface RefInterface {
  current: any;
}

function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef();

  useEffect(() => {
    (savedCallback as RefInterface).current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) {
      return;
    } else {
      let id: any = null;
      const tick = () => {
        const returnValue = (savedCallback as RefInterface).current();
        if (returnValue) {
          if (returnValue instanceof Function) {
            returnValue();
          } else {
            throw new Error('返回值必须是函数！');
          }
          clearTimeout(id);
          return;
        }
        id = setTimeout(tick, delay);
      };
      id = setTimeout(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default useInterval;
