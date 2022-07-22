import Head from "next/head";
import { FC, useEffect, useState } from "react";
import { Navbar } from "../ui";

interface LayoutProps {
  title?: string;
  description?: string;
  image?: string;
  children?: JSX.Element;
}

export const Layout: FC<LayoutProps> = ({
  title,
  children,
  description,
  image,
}) => {
  const [origin, setOrigin] = useState<string>("");

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  return (
    <>
      <Head>
        <title> {title || "Pokemon App"} </title>
        <meta name="description" content={description || "Pokedex"}></meta>
        <meta name="keywords" content={`${title}, pokemon, pokedex`} />
        <meta property="og:title" content={title || "Pokémon App"} />
        <meta property="og:description" content={description || "Pokedex"} />
        <meta property="og:image" content={image || `${origin}/banner.png`} />
      </Head>

      <Navbar />

      <main style={{ padding: "0px 20px" }}>
        <div style={{ marginTop: "70px" }}>{children}</div>
      </main>
    </>
  );
};
