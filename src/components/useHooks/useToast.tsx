import { useEffect, useState } from 'react';
import { Toast } from 'antd-mobile';

const useToast = (toastVisibleDefault: boolean) => {
  const [toastVisible, setToastVisible] = useState<boolean>(
    toastVisibleDefault,
  );
  useEffect(() => {
    if (toastVisible) {
      Toast.info('敬请期待', 2, () => {
        setToastVisible(false);
      });
    }
  }, [toastVisible]);
  return setToastVisible;
};

export default useToast;
