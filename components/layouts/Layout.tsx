import Head from "next/head";
import { FC } from "react";
import { Navbar } from "../ui";

interface LayoutProps {
  title?: string;
  children?: JSX.Element;
}

export const Layout: FC<LayoutProps> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title> {title || "Pokemon App"} </title>
        <meta
          name="Author"
          content={`Información sobre el pokémon ${title}`}
        ></meta>
        <meta name="description" content={`${title}, pokemon, pokedex`} />
      </Head>

      <Navbar />

      <main style={{ padding: "0px 20px" }}>{children}</main>
    </>
  );
};
