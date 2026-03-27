export const getRandomAnime = async () => {
  const response = await fetch("https://api.jikan.moe/v4/random/anime");
  const {
    data: {
      title,
      images: {
        webp: { image_url },
      },
    },
  } = await response.json();
  return { title, image_url };
};
