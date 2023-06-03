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
        <Head>{this.renderEmotion()}</Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
