import React from 'react';
import Document from 'next/document';
import {
  AmpScripts,
  AmpScriptsManager,
  headerBoilerplate,
} from 'react-amphtml';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static getInitialProps({ req, renderPage }) {
    const ampScripts = new AmpScripts();
    const sheet = new ServerStyleSheet();

    const page = renderPage((
      App => props => (
        sheet.collectStyles((
          <AmpScriptsManager ampScripts={ampScripts}>
            <App {...props} />
          </AmpScriptsManager>
        ))
      )
    ));

    const ampScriptTags = ampScripts.getScriptElements();

    // AMP only allows for 1 style tag, so we need to compbine all the style
    // tags generated by styled-components
    /* eslint-disable react/no-danger */
    const ampStyleTag = (
      <style
        amp-custom=""
        dangerouslySetInnerHTML={{
          __html: sheet.getStyleElement().reduce(
            (
              css,
              {
                props: {
                  dangerouslySetInnerHTML: {
                    __html = '',
                  } = {},
                } = {},
              } = {},
            ) => (
              `${css}${__html}`
            ),
            '',
          ),
        }}
      />
    );
    /* eslint-enable */

    // Get the dynamic `<title />` from the head generated by next.js
    const title = (
      page.head.filter(({ type }) => type === 'title')[0] ||
      <title>hrfmmymt</title>
    );

    return {
      ...page,
      title,
      url: req.url,
      ampScriptTags,
      ampStyleTag,
    };
  }

  render() {
    const {
      title,
      url,
      ampScriptTags,
      ampStyleTag,
      html,
    } = this.props;

    /* eslint-disable react/no-danger */
    return (
      <html amp="">
        <head>
          {title}
          {headerBoilerplate(url)}
          {ampScriptTags}
          {ampStyleTag}
        </head>
        <body dangerouslySetInnerHTML={{ __html: html }} />
      </html>
    );
    /* eslint-enable */
  }
}
