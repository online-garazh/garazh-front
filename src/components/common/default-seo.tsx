import { DefaultSeo as NextDefaultSeo } from 'next-seo';
import { type NextSeoProps, type OpenGraphMedia, type MetaTag } from 'next-seo/lib/types';
import { type FunctionComponent } from 'react';

import { useOrigin } from '~/hooks/use-origin.hook';
import { usePathname } from '~/hooks/use-pathname.hook';

type ReadonlyArrayItem<T> = T extends ReadonlyArray<infer I> ? I : never;

type LinkTag = ReadonlyArrayItem<NextSeoProps['additionalLinkTags']>;

interface Seo {
  title: string;
  description: string;
  keywords: string[];
  image: OpenGraphMedia;
  favicon: {
    links: LinkTag[];
    metas: MetaTag[];
  };
}

export const DefaultSeo: FunctionComponent = () => {
  const origin = useOrigin();
  const pathname = usePathname();
  const url = `${origin}${pathname}`;
  const seo: Seo = {
    title: 'Online Garazh',
    description: 'Online Garazh common page description',
    keywords: ['Online Garazh', 'Cars', 'Cars repair', 'Cars communities', 'create car blog'],
    image: {
      url: `${origin}/images/logo.png`,
      type: 'image/png',
      width: 148,
      height: 120,
    },
    favicon: {
      links: [
        {
          rel: 'apple-touch-icon',
          sizes: '144x144',
          href: '/favicon/apple-touch-icon.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/favicon/favicon-32x32.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/favicon/favicon-16x16.png',
        },
        {
          rel: 'icon',
          href: '/favicon/favicon.ico',
        },
        {
          rel: 'manifest',
          href: '/favicon/site.webmanifest',
        },
        {
          rel: 'mask-icon',
          color: '#5bbad5',
          href: '/favicon/safari-pinned-tab.svg',
        },
      ],
      metas: [
        {
          name: 'msapplication-TileColor',
          content: '#da532c',
        },
        {
          name: 'msapplication-config',
          content: '/favicon/browserconfig.xml',
        },

        {
          name: 'theme-color',
          content: '#ffffff',
        },
      ],
    },
  };

  return (
    <NextDefaultSeo
      additionalLinkTags={[...seo.favicon.links]}
      additionalMetaTags={[
        {
          name: 'keywords',
          content: seo.keywords.join(', '),
        },
        ...seo.favicon.metas,
      ]}
      // defaultTitle={seo.title}
      titleTemplate={`${seo.title} | %s`} // Replaces %s with title when provided in other pages
      description={seo.description}
      canonical={url}
      openGraph={{
        images: [seo.image],
        type: 'website',
      }}
    />
  );
};
