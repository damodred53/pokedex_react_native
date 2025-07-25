import Card from "@/components/Card";
import PokemonCard from "@/components/pokemon/PokemonCard";
import RootView from "@/components/RootView";
import { Row } from "@/components/Row";
import SearchBar from "@/components/SearchBar";
import SortButton from "@/components/SortButton";
import ThemesText from "@/components/ThemesText";
import { getPokemonId } from "@/functions/pokemon";
import { useInfiniteFetchQuery } from "@/hook/useFetchQuery";
import { useThemeColors } from "@/hook/useThemeColors";
import { useState } from "react";
import { ActivityIndicator, FlatList, Image, StyleSheet } from "react-native";

export default function Index() {
  const colors = useThemeColors();
  const [search, setSearch] = useState('');
  const [ sortKey, setSortKey ] = useState<"id" | "name">("id");

  const {data, isFetching, fetchNextPage} = useInfiniteFetchQuery("/pokemon?limit=21");
  const pokemons = data?.pages.flatMap(page => page.results.map(r => ({name: r.name, id: getPokemonId(r.url)}))) ?? [];

  const filteredPokemon = [... (search ? pokemons.filter(p => p.name.includes(search.toLowerCase()) 
    ||
     p.id.toString() === search) : pokemons)].sort((a, b) => {
    if (a[sortKey] < b[sortKey]) return -1;
    if (a[sortKey] > b[sortKey]) return 1;
    return 0;
  });

  return (
    <RootView
      style={{
        backgroundColor: colors.tint
      }}
    >
      <Row style={styles.header} gap={16} >
        <Image source={require('@/assets/images/pokeball.png')} width={24} height={24}/>
        <ThemesText variant="headline" color="grayLight">Pokédex</ThemesText>
      </Row>

      <Row gap={16} style={styles.form}>
        <SearchBar value={search} onChange={setSearch} />
        <SortButton value={sortKey} onChange={setSortKey} />
      </Row>

      <Card style={styles.body}>
        <FlatList data={filteredPokemon} 
        numColumns={3} 
        columnWrapperStyle={styles.gridGap} 
        contentContainerStyle={[styles.gridGap, styles.list]} 
        onEndReached= {search ? undefined : () => fetchNextPage()}
        ListFooterComponent={
          isFetching ? <ActivityIndicator color={colors.tint} />  : null
        }
        renderItem={({item}) => 
          <PokemonCard id={item.id} name={item.name} style={{flex: 1/3}}/>
        } keyExtractor={(item) => item.id.toString()}
        />
      </Card>
    </RootView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  body: {
    flex: 1,
    marginTop: 16,
  },
  gridGap: {
    gap: 8,
  },
  list: {
    padding: 12,
    paddingTop: 24,
  },
  form: {
    paddingHorizontal: 12,
  }
})
