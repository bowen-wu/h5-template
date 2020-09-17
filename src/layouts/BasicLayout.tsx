import React, { ReactNode } from 'react';

const BasicLayout = (props: { children: ReactNode }) => (
  <div>{props.children}</div>
);

export default BasicLayout;
