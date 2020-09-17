import React from 'react';
import './index.scss';
import { Button } from 'antd-mobile';
import TopStickyBar from '@/components/TopStickyBar';
import LeftArrow from '@/assets/image/component/left_arrow_top_bar.svg';
import Setting from '@/assets/image/my/setting.svg';
import scopedClasses from '@/utils/scopedClasses';

const sc = scopedClasses('my');

export default () => {
  return (
    <div>
      <TopStickyBar className={sc('top-bar')}>
        <div className={sc('top-bar-icon')}>
          <img src={LeftArrow} alt="" />
        </div>
        <div className={sc('top-bar-setting')}>
          <img src={Setting} alt="" />
        </div>
      </TopStickyBar>
      <h1 className="title">My Page index</h1>
      <Button>My</Button>
    </div>
  );
};
