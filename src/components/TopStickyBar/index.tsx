import React, { ReactNode } from 'react';
import scopedClasses from '@/utils/scopedClasses';
import './index.scss';

const sc = scopedClasses('top-sticky-bar');

interface TopStickyBarProps {
  children: ReactNode;
}

const TopStickyBar = (props: TopStickyBarProps) => {
  return <div className={sc()}>{props.children}</div>;
};

export default TopStickyBar;
