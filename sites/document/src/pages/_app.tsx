import "@/styles/globals.css";
import {ThemeProvider} from "@centella/react-tw-core";
import type {AppProps} from "next/app";
import {theme} from "../theme";

export default function App({Component, pageProps}: AppProps) {
  return <Component {...pageProps} />;
}
