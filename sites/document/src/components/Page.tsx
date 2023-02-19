import Head from "next/head";
import {ReactNode} from "react";

type PageHeadProps = {
  subtilte?: string;
  description?: string;
  children: ReactNode[] | ReactNode;
};
const DEFAULT_DESCRIPTION = "The React UI Library build with Tailwind CSS";
const DEFAULT_TITLE = "Rapid Tailwind React Document";

export const Page = (props: PageHeadProps) => {
  const title = `${DEFAULT_TITLE}  ${props.subtilte ? ` - ${props.subtilte}` : ""}`;
  const description = `${props.description ?? DEFAULT_DESCRIPTION}`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.svg" />
      </Head>

      {props.children}
    </>
  );
};
