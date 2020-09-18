import React, { Fragment, ReactNode, useCallback } from 'react';
import useGoToPage from '@/components/useHooks/useGoToPage';
import scopedClasses from '@/utils/scopedClasses';
import LeftArrow from '@/assets/image/component/left_arrow_top_bar.svg';

import './index.scss';

const sc = scopedClasses('top-sticky-bar');

interface TopStickyBarProps {
  isCustomerStyle?: boolean;
  className?: string;
  children?: ReactNode;
  title?: string;
  leftIcon?: boolean | ReactNode;
  leftIconSrc?: string;
  onLeftIconHandle?: (props: TopStickyBarProps) => void;
  rightIcon?: boolean | ReactNode;
  rightIconSrc?: string;
  onRightIconHandle?: (props: TopStickyBarProps) => void;
}

const TopStickyBar = (props: TopStickyBarProps) => {
  const goToPage = useGoToPage();

  const onIconHandle = useCallback((fn, type) => {
    if (fn) {
      fn(props);
      return;
    }
    if (type === 'left') {
      goToPage({ method: 'Controller.pop' });
    }
  }, []);

  const leftIconElement = useCallback(() => {
    if (props.leftIcon === false) {
      return null;
    }
    if (props.leftIcon === true || props.leftIcon === undefined) {
      return (
        <div
          className={sc('back')}
          onClick={onIconHandle.bind(null, props.onLeftIconHandle, 'left')}
        >
          <img src={props.leftIconSrc || LeftArrow} alt="" />
        </div>
      );
    }
    return props.leftIcon;
  }, [props.leftIcon, props.leftIconSrc]);

  const rightIconElement = useCallback(() => {
    if (props.rightIcon === false) {
      return null;
    }
    if (props.rightIcon === true || props.rightIcon === undefined) {
      if (props.rightIconSrc) {
        return (
          <div
            className={sc('right')}
            onClick={onIconHandle.bind(null, props.onRightIconHandle, 'right')}
          >
            <img src={props.rightIconSrc} alt="" />
          </div>
        );
      }
      return null;
    }
    return props.rightIcon;
  }, [props.rightIcon, props.rightIconSrc]);

  return (
    <div className={`${sc()} ${props.className}`}>
      {props.isCustomerStyle ? (
        props.children
      ) : (
        <Fragment>
          {leftIconElement()}
          <div className={sc('title')}>{props.title}</div>
          {rightIconElement()}
        </Fragment>
      )}
    </div>
  );
};

export default TopStickyBar;
