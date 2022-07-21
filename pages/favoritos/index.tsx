import { Grid } from "@nextui-org/react";
import type { GetStaticProps, NextPage } from "next";
import { pokeApi } from "../../api";
import { Layout } from "../../components/layouts";
import { PokemonCard } from "../../components/pokemon";
import { PokemonListResponse, SmallPokemon } from "../../interfaces";

interface Props {
  pokemons: SmallPokemon[];
}

const Home: NextPage<Props> = ({ pokemons }) => {
  return (
    <Layout title="Pokemon App">
      <Grid.Container gap={2} justify="flex-start">
        {pokemons.map((p) => (
          <PokemonCard key={p.id} pokemon={p} />
        ))}
      </Grid.Container>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await pokeApi.get<PokemonListResponse>("/pokemon?limit=151");

  function parse(pokemon: SmallPokemon): SmallPokemon {
    const fragments = pokemon.url.split("/");
    const id = parseInt(fragments[fragments.length - 2]);

    return {
      ...pokemon,
      id,
      img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`,
    };
  }

  const results: SmallPokemon[] = data.results.map(parse);

  return {
    props: {
      pokemons: results,
    },
  };
};

export default Home;
