import React, { Fragment, ReactNode, useCallback } from 'react';
import useGoToPage, {
  WebviewSkipMethod,
} from '@/components/useHooks/useGoToPage';
import scopedClasses from '@/utils/scopedClasses';
import LeftArrow from '@/assets/image/component/left_arrow_top_bar.svg';

import './index.scss';

const sc = scopedClasses('top-sticky-bar');

interface TopStickyBarProps {
  isCustomerStyle?: boolean;
  className?: string;
  children?: ReactNode;
  title?: string;
  leftElement?: boolean | ReactNode;
  leftIconSrc?: string;
  onLeftElementHandle?: (props: TopStickyBarProps) => void;
  rightElement?: boolean | ReactNode;
  rightIconSrc?: string;
  onRightElementHandle?: (props: TopStickyBarProps) => void;
}

const TopStickyBar = (props: TopStickyBarProps) => {
  const goToPage = useGoToPage();

  const onIconHandle = useCallback((fn, type) => {
    if (fn) {
      fn(props);
      return;
    }
    if (type === 'left') {
      goToPage({ method: WebviewSkipMethod.POP });
    }
  }, []);

  const leftIconElement = useCallback(() => {
    if (props.leftElement === false) {
      return null;
    }
    if (props.leftElement === true || props.leftElement === undefined) {
      return (
        <div
          className={sc('back')}
          onClick={onIconHandle.bind(null, props.onLeftElementHandle, 'left')}
        >
          <img src={props.leftIconSrc || LeftArrow} alt="" />
        </div>
      );
    }
    return props.leftElement;
  }, [props.leftElement, props.leftIconSrc]);

  const rightIconElement = useCallback(() => {
    if (props.rightElement === false) {
      return null;
    }
    if (props.rightElement === true || props.rightElement === undefined) {
      if (props.rightIconSrc) {
        return (
          <div
            className={sc({ right: true, icon: true })}
            onClick={onIconHandle.bind(
              null,
              props.onRightElementHandle,
              'right',
            )}
          >
            <img src={props.rightIconSrc} alt="" />
          </div>
        );
      }
      if (props.rightElement === undefined) {
        return null;
      }
      throw new Error('当 rightElement === true 时，必须提供 rightIconSrc');
    }
    return (
      <div
        className={sc('right')}
        onClick={onIconHandle.bind(null, props.onRightElementHandle, 'right')}
      >
        {props.rightElement}
      </div>
    );
  }, [props.rightElement, props.rightIconSrc]);

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
