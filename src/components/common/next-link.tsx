import { Link as MUILink, type LinkProps as MUILinkProps } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import NextLink, { type LinkProps as NextLinkProps } from 'next/link';
import { forwardRef, type AnchorHTMLAttributes } from 'react';

import { type UiILocators } from '~/constants/ui-locators.constant';

interface NextLinkComposedProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>,
    Omit<NextLinkProps, 'href' | 'as' | 'onMouseEnter' | 'onTouchStart' | 'onClick'> {
  linkAs?: NextLinkProps['as'];
  href: NextLinkProps['href'];
}

type LinkProps = {
  activeClassName?: string;
  noLinkStyle?: boolean;
  linkAs?: NextLinkProps['as'];
  href: NextLinkProps['href'];
  as?: NextLinkProps['as'];
  id: UiILocators | string; // TODO: Delete string type for real project
} & Omit<NextLinkComposedProps, 'to' | 'linkAs' | 'href'> &
  Omit<MUILinkProps, 'href'>;

export const NextLinkComposed = forwardRef<HTMLAnchorElement, NextLinkComposedProps>(
  ({ passHref, replace, shallow, linkAs, locale, scroll, href, ...other }, ref) => (
    <NextLink
      // Disable prefetch for SSR
      // We don't want any pages to be cached on client side
      prefetch={false}
      passHref={passHref}
      replace={replace}
      shallow={shallow}
      locale={locale}
      scroll={scroll}
      href={href}
      ref={ref}
      as={linkAs}
      {...other}
    />
  )
);

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ underline = 'hover', noLinkStyle, href, as: linkAs, sx, passHref, color, ...rest }, ref) => {
    const { palette } = useTheme();
    const modifiedColor = color ?? palette.mode === 'dark' ? 'secondary' : 'primary';
    const isExternal = typeof href === 'string' && (href.indexOf('http') === 0 || href.indexOf('mailto:') === 0);

    if (isExternal) {
      if (noLinkStyle) return <a href={href} ref={ref} {...rest} />;

      return <MUILink underline={underline} href={href} ref={ref} sx={sx} {...rest} />;
    }

    if (noLinkStyle) return <NextLinkComposed ref={ref} href={href} passHref={passHref} {...rest} />;

    return (
      <MUILink
        component={NextLinkComposed}
        underline={underline}
        color={modifiedColor}
        linkAs={linkAs}
        href={href as string}
        ref={ref}
        sx={sx}
        {...rest}
      />
    );
  }
);
