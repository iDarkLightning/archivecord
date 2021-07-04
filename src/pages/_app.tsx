import { CSSReset, ThemeProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import { Provider } from "next-auth/client";
import Error from "next/error";
import theme from "../theme";
import axios from "axios";

function App({ Component, pageProps }: AppProps) {
  const { online } = pageProps;

  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <Provider>
        {online ? (
          <Component {...pageProps} />
        ) : (
          <Error statusCode={503} title="LiteBot is not online" />
        )}
      </Provider>
    </ThemeProvider>
  );
}

App.getInitialProps = async () => {
  try {
    await axios.get(process.env.LITEBOT_URL);
  } catch (err) {
    return { pageProps: { online: err.response !== undefined } };
  }
};

export default App;
