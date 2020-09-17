import React, { ReactNode } from 'react';
import TopStickyBar from '@/components/TopStickyBar';

const BasicLayout = (props: { children: ReactNode }) => (
  <div>
    <TopStickyBar>测试</TopStickyBar>
    {props.children}
  </div>
);

export default BasicLayout;
