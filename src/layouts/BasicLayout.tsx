import React, { ReactNode } from 'react';

const BasicLayout = (props: { children: ReactNode }) => (
  <div className="page-container">{props.children}</div>
);

export default BasicLayout;
