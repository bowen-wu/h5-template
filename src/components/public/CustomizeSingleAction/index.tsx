import React from 'react';
import scopedClasses from '@/utils/scopedClasses';

import './index.scss';

const sc = scopedClasses('public-single-action');

export enum CustomizeSingleActionType {
  button = 'BUTTON',
  normal = 'NORMAL',
}

const CustomizeSingleAction = (props: {
  text: string;
  type: CustomizeSingleActionType;
  disabled?: boolean;
}) => {
  const { text, type, disabled = false } = props;
  return (
    <div className={sc()}>
      {type === CustomizeSingleActionType.button ? (
        <button type="submit" className={sc({ text: true, disabled })}>
          {text}
        </button>
      ) : (
        <div className={sc({ text: true, disabled })}>{text}</div>
      )}
    </div>
  );
};

export default CustomizeSingleAction;
