export const getAllPokemon = async (limit) => {
  const data = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=0`
  )
  const res = await data.json()

  const pokemonUrls = res.results.map((pokemon) => pokemon.url)

  const pokemonDataPromises = pokemonUrls.map((url) =>
    fetch(url).then((response) => response.json())
  )

  const allPokemonData = await Promise.all(pokemonDataPromises)
  return allPokemonData
}

export const getDetailChain = async (url) => {
  const detailSpecies = await fetch(url)
  const resSpecies = await detailSpecies.json()
  if (resSpecies) {
    let arrOfchain = []
    const evolutionChain = await fetch(resSpecies.evolution_chain.url)
    const resEvolutionChain = await evolutionChain.json()
    arrOfchain.push(resEvolutionChain?.chain?.species?.url || "")
    arrOfchain.push(resEvolutionChain?.chain?.evolves_to[0]?.species?.url || "")
    arrOfchain.push(
      resEvolutionChain?.chain?.evolves_to[0]?.evolves_to[0]?.species?.url || ""
    )
    let arrOfDetailChain = []
    arrOfchain
      .filter((_) => _)
      .forEach((url) => {
        let parts = url.split("/")
        arrOfDetailChain.push(parts[parts.length - 2])
      })
    const detailChainUrl = arrOfDetailChain.map((_) =>
      fetch(`https://pokeapi.co/api/v2/pokemon/${_}/`).then((response) =>
        response.json()
      )
    )
    const allDetailChain = await Promise.all(detailChainUrl)
    const resAllDetailChain = allDetailChain.map((_) => {
      return {
        name: _.name,
        url: _.sprites?.other?.dream_world?.front_default,
      }
    })
    return resAllDetailChain
  }
}
