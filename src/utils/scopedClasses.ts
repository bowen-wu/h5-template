interface AttributeInterface {
  [propsName: string]: boolean;
}

const scopedClasses = (prefixClassName: string) => (name: AttributeInterface | string = '') => Object.entries(name).filter(item => item[1]).map(item => item[0]).map(item => [ prefixClassName, item ].join('-')).join(' ');

export default scopedClasses;

