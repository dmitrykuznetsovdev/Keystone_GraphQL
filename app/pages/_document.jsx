import React from "react";
import NextDocument, {Head, Main, NextScript} from 'next/document';
import {ServerStyleSheet} from 'styled-components';
import {ServerStyleSheets as MaterialUiServerStyleSheets} from '@material-ui/styles'

export default class MyDocument extends NextDocument {
    static async getInitialProps(ctx) {
        const styledComponentSheet = new ServerStyleSheet();
        const materialUiSheets = new MaterialUiServerStyleSheets();
        const originalRenderPage = ctx.renderPage;

        try {
            ctx.renderPage = () => {
                return originalRenderPage({
                    enhanceApp: App => props =>
                        styledComponentSheet.collectStyles(
                            materialUiSheets.collect(<App {...props} />),
                        ),
                });
            }


            const initialProps = await NextDocument.getInitialProps(ctx);
            return {
                ...initialProps,
                styles: [
                    <React.Fragment key="styles">
                        {initialProps.styles}
                        {materialUiSheets.getStyleElement()}
                        {styledComponentSheet.getStyleElement()}
                    </React.Fragment>,
                ],
            }
        } finally {
            styledComponentSheet.seal()
        }
    }

    render() {
        return (
            <html>
            <Head>
                {this.props.styles}
            </Head>
            <body>
            <Main/>
            <NextScript/>
            </body>
            </html>
        )
    }
}