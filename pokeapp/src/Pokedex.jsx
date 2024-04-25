import React from "react";
const Pokedex = ({children}) => {
  const [pokemon, setPokemon] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [searchPokemon, setSearchPokemon] = React.useState(""); //state for search bar

  //Search bar
  const searchResults = pokemon.filter((pokemons) =>
    JSON.stringify(pokemons).toLowerCase().includes(searchPokemon.toLowerCase())
  );

  const handleInput = (e) => {
    setSearchPokemon(e.target.value); //getting the user input
  };

  React.useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon");
        //throw new Error('something happened')
        setLoading(false);
        const data = await response.json();
        setPokemon(data.results);
        console.log(data);
      } catch (err) {
        setError(err);
      }
    };
    fetchPokemon();
  }, []);
  if (error) {
    return <p>Try Reloading again</p>;
  }
  loading && <p>Loading...</p>;

  return (
    <>
      <h1>Pokemon List</h1>
      <h2>Search your fav pokemon</h2>
      <div>
        <input
          type="text"
          id="searchbar"
          name="searchbar"
          placeholder="search..."
          onChange={handleInput}
        />
      </div>
      <ul>
        {searchResults.map((poke) => (
          <li key={poke.id}>
          
            {poke.name}</li>
        ))}
      </ul>
    </>
  );
};
export default Pokedex;
