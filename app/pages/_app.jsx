import NextApp from 'next/app';
import React from 'react';
import withApolloClient from '../config/with_apollo_client';
import { ApolloProvider } from '@apollo/react-hooks';
import {ThemeProvider as StyledThemeProvider} from 'styled-components';
import {ThemeProvider as MaterialThemeProvider, createMuiTheme} from '@material-ui/core/styles';

const theme = {
    primary: '#f2f2f2',
    ...createMuiTheme()
};

class App extends NextApp {
    render() {
        const {Component, pageProps, apolloClient} = this.props;

        return (
            <StyledThemeProvider theme={theme}>
                <MaterialThemeProvider theme={theme}>
                    <ApolloProvider client={apolloClient}>
                        <Component {...pageProps} />
                    </ApolloProvider>
                </MaterialThemeProvider>
            </StyledThemeProvider>
        )
    }
}

export default withApolloClient(App);