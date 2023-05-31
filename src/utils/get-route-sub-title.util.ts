import { PAGE_BASE_TITLE } from '~/constants/seo.constant';

export const getRouteTitle = (sub: string = '', custom: string = '') => {
  const subTitle = custom || sub || '';
  const modifiedSubTitle = subTitle ? ` | ${subTitle}` : '';

  return `${PAGE_BASE_TITLE}${modifiedSubTitle}`;
};
