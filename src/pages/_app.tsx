import type { AppProps } from 'next/app';
import { Global, ThemeProvider } from '@emotion/react';
import { theme } from '@/styles/theme';
import { globalStyles } from '@/styles/globals';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Global styles={globalStyles} />
      <Component {...pageProps} />
    </ThemeProvider>
  );
} 