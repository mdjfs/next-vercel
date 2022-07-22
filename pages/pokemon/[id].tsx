import { Button, Card, Container, Grid, Image, Text } from "@nextui-org/react";
import confetti from "canvas-confetti";
import { GetStaticPaths, GetStaticProps } from "next";
import { FC } from "react";
import { pokeApi } from "../../api";
import { Layout } from "../../components/layouts";
import { useFavorite } from "../../hooks";
import { useRememberScroll } from "../../hooks/useRememberScroll";
import { Pokemon, PokemonListResponse } from "../../interfaces";

interface Props {
  pokemon: Pokemon;
}

const PokemonPage: FC<Props> = ({ pokemon }) => {
  const { isFavorite, setFavorite, removeFavorite } = useFavorite(pokemon.id);

  const setFavoriteAndFUN = () => {
    setFavorite();
    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 160,
      angle: -100,
      origin: {
        x: 1,
        y: 0,
      },
    });
  };

  return (
    <Layout title={pokemon.name}>
      <Grid.Container css={{ marginTop: "5px" }} gap={2}>
        <Grid xs={12} sm={4}>
          <Card isHoverable css={{ padding: "30px" }}>
            <Card.Body>
              <Card.Image
                src={
                  pokemon.sprites.other?.dream_world.front_default ??
                  "/no-image.png"
                }
                alt={pokemon.name}
                width="100%"
                height={200}
              />
            </Card.Body>
          </Card>
        </Grid>

        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header>
              <Grid.Container>
                <Grid xs={12} sm={8} justify="flex-start" alignItems="center">
                  <Text css={{ margin: 5 }} h1 transform="capitalize">
                    {pokemon.name}
                  </Text>
                </Grid>
                <Grid xs={12} sm={4} justify="flex-start" alignItems="center">
                  <Button
                    css={{ margin: 5 }}
                    color="gradient"
                    ghost
                    onClick={isFavorite ? removeFavorite : setFavoriteAndFUN}
                  >
                    {isFavorite ? "En favoritos" : "Guardar en Favoritos"}
                  </Button>
                </Grid>
              </Grid.Container>
            </Card.Header>
            <Card.Body>
              <Text size={30}>Sprites:</Text>
              <Container direction="row" display="flex" gap={0}>
                <Image
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.front_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
              </Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // const { data } = await pokeApi.get<PokemonListResponse>("/pokemon?limit=151");

  const { id } = params as { id: string };

  const { data } = await pokeApi.get<Pokemon>(`/pokemon/${id}`);

  return {
    props: {
      pokemon: {
        id,
        name: data.name,
        sprites: data.sprites,
      },
    },
  };
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const { data } = await pokeApi.get<PokemonListResponse>("/pokemon?limit=151");

  const paths = data.results.map((v) => ({
    params: { id: v.name },
  }));

  return {
    paths: paths,
    fallback: false,
  };
};

export default PokemonPage;
