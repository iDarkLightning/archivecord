import { CSSReset, ThemeProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import { Provider } from "next-auth/client";
import theme from "../theme";

function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <Provider>
        <Component {...pageProps} />
      </Provider>
    </ThemeProvider>
  );
}

export default App;
