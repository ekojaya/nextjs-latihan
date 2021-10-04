// import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import ReduxToastr from "react-redux-toastr";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "@/states/store";
import "../styles/globals.css";
// import { getAccessToken } from "../utils";

// const backEndUrl =
//   typeof process.env.NEXT_PUBLIC_BACKEND_URL === "string"
//     ? process.env.NEXT_PUBLIC_BACKEND_URL
//     : "";

// const client = new ApolloClient({
//   uri: `${backEndUrl}/graphql`,
//   cache: new InMemoryCache(),
//   // credentials: 'include',
//   headers: {
//     authorization: `Bearer ${getAccessToken()}`,
//   },
// });

const theme = extendTheme({
  fonts: {
    body: "Roboto Condensed, sans-serif",
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {/* <ApolloProvider client={client}> */}
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
          <ReduxToastr />
        </ChakraProvider>
        {/* </ApolloProvider> */}
      </PersistGate>
    </Provider>
  );
}
export default MyApp;
