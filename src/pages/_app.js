import "../styles/globals.css";
import { AppProvider } from "../contexts/app.context";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <AppProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppProvider>
  );
}

export default MyApp;
