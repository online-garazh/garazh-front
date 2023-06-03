export const getRouteTitle = (sub: string = '', custom: string = '') => {
  const subTitle = custom || sub || '';
  const modifiedSubTitle = subTitle ? ` | ${subTitle}` : '';

  return `Online Garazh${modifiedSubTitle}`;
};
