import { Component, useEffect, useState } from "react";
import "../index.css";
import { PokemonCards } from "./PokemonCards";

function Pokemon() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const API = "https://pokeapi.co/api/v2/pokemon?limit=150";

    const fetchPokemon = async () => {
      try {
        const res = await fetch(API);
        const data = await res.json();

        const detailPokemonData = data.results.map(async (currPokemon) => {
          try {
            const res = await fetch(currPokemon.url);
            const data = await res.json();
            return data;
            // console.log(data.id);
          } catch (error) {
            console.log(error);
          }
        });

        const detailResponce = await Promise.all(detailPokemonData);
        // console.log(detailResponce);
        setPokemon(detailResponce);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(error);
      }
    };

    fetchPokemon();
  }, []);

  const searchData = pokemon.filter((currPokemon) =>
    currPokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <h1>{error.message}</h1>
      </div>
    );
  }
  return (
    <>
      <section className="container">
        <header>
          <h1>Lets Catch Pokémon</h1>
        </header>
        <div className="pokemon-search">
          <input
            type="text"
            placeholder="Search Pokemon"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div>
          <ul className="cards">
            {/* {pokemon.map((currPokemon) => { */}
            {searchData.map((currPokemon) => {
              return (
                <PokemonCards key={currPokemon.id} pokemonData={currPokemon} />
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}

export default Pokemon;
