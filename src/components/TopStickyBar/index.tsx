import React, { ReactNode } from 'react';
import scopedClasses from '@/utils/scopedClasses';
import './index.scss';

const sc = scopedClasses('top-sticky-bar');

interface TopStickyBarProps {
  children: ReactNode;
  className: string;
}

const TopStickyBar = (props: TopStickyBarProps) => {
  return <div className={`${sc()} ${props.className}`}>{props.children}</div>;
};

export default TopStickyBar;
