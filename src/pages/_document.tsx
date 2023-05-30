import createEmotionServer from '@emotion/server/create-instance';
import { type AppType } from 'next/dist/shared/lib/utils';
import NextDocument, {
  type DocumentContext as NextDocumentContext,
  type DocumentInitialProps as NextDocumentInitialProps,
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document';
import { type ComponentType } from 'react';

import { PAGE_DESCRIPTION, PAGE_BASE_TITLE } from '~/constants/seo.constant';
import { rubik } from '~/pages/_app';
import { createEmotionCache } from '~/theme/create-emotion-cache';
import { type AppEnhancedProps } from '~/types/app.type';

interface DocumentInitialProps extends NextDocumentInitialProps {
  emotionStyleTags: JSX.Element[];
}

export default class Document extends NextDocument<DocumentInitialProps> {
  private readonly language = 'en';

  public static getInitialProps = async (context: NextDocumentContext): Promise<DocumentInitialProps> => {
    const originalRenderPage = context.renderPage;
    const cache = createEmotionCache();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const { extractCriticalToChunks } = createEmotionServer(cache);

    context.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App: AppType | ComponentType<AppEnhancedProps>) => {
          const EnhanceApp: AppType = (props) => <App emotionCache={cache} {...props} />;

          return EnhanceApp;
        },
      });

    const initialProps = await NextDocument.getInitialProps(context);
    const emotionStyles = extractCriticalToChunks(initialProps.html);
    const emotionStyleTags = emotionStyles.styles.map((style) => (
      <style
        dangerouslySetInnerHTML={{ __html: style.css }}
        data-emotion={`${style.key} ${style.ids.join(' ')}`}
        key={style.key}
      />
    ));

    return {
      ...initialProps,
      emotionStyleTags,
    };
  };

  private renderFavicon() {
    return (
      <>
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
        <meta name="theme-color" content="#ffffff" />
      </>
    );
  }

  private renderSeo() {
    return (
      <>
        <meta name="description" content={PAGE_DESCRIPTION} />
        <meta property="og:title" content={PAGE_BASE_TITLE} />
        <meta property="og:description" content={PAGE_DESCRIPTION} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content={this.language} />
      </>
    );
  }

  private renderFonts() {
    return (
      <>
        {/* <link rel="preconnect" href="https://fonts.googleapis.com" />*/}
        {/* <link rel="preconnect" href="https://fonts.gstatic.com" />*/}
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        {/* <link href="/fonts/fonts.css" rel="stylesheet" />*/}
      </>
    );
  }

  private renderEmotion() {
    return (
      <>
        <meta name="emotion-insertion-point" content="" />
        {this.props.emotionStyleTags}
      </>
    );
  }

  public render() {
    return (
      <Html lang={this.language} className={rubik.className}>
        <Head>
          {this.renderFavicon()}
          {this.renderEmotion()}
          {this.renderFonts()}
          {this.renderSeo()}
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
