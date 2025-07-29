import { css } from '@emotion/react';
import { theme } from './theme';

export const globalStyles = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    line-height: 1.5;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, sans-serif;
    color: ${theme.colors.gray[800]};
    background-color: ${theme.colors.white};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    font: inherit;
    cursor: pointer;
    border: none;
    background: none;
  }

  input,
  textarea,
  select {
    font: inherit;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 600;
    line-height: 1.3;
    margin-bottom: ${theme.spacing.md};
  }

  p {
    margin-bottom: ${theme.spacing.md};
  }

  img {
    max-width: 100%;
    height: auto;
  }
`; 