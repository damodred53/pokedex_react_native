export const getPokemonId = (url: string): number => {
  return parseInt(url.split("/").at(-2)!, 10);
};

export const getPokemonArtwork = (id: number | string): string => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
};

export interface FormatWeight {
  (weight?: number): string;
}

export const formatWeight: FormatWeight = (weight?: number): string => {
  if (!weight) {
    return "";
  }
  return (weight / 10).toString().replace(".", ",") + " kg";
};

export const formatSize: FormatWeight = (size?: number): string => {
  if (!size) {
    return "";
  }
  return (size / 10).toString().replace(".", ",") + " m";
};
