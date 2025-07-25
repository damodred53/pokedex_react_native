import Card from "@/components/Card";
import PokemonSpec from "@/components/pokemon/PokemonSpec";
import PokemonType from "@/components/PokemonType";
import RootView from "@/components/RootView";
import { Row } from "@/components/Row";
import ThemesText from "@/components/ThemesText";
import { Colors } from "@/constants/Colors";
import { formatWeight, getPokemonArtwork } from "@/functions/pokemon";
import { useFetchQuery } from "@/hook/useFetchQuery";
import { useThemeColors } from "@/hook/useThemeColors";
import { router, useLocalSearchParams } from "expo-router";
import { Image, Pressable, StyleSheet, View } from "react-native";

const Pokemon = () => {
    const colors = useThemeColors()
    const params = useLocalSearchParams() as {id: string}
    const {data: pokemon} = useFetchQuery("/pokemon/[id]" ,  {id: params.id});
    const mainType = pokemon?.types?.[0].type.name;
    const pokemonTypes = pokemon?.types ?? [];
   
    const colorType = mainType ? Colors.type[mainType] : colors.tint
     console.log(mainType, colorType)

     return (
        <RootView style={{backgroundColor: colorType}}>
            <View>
                <Image style={styles.pokeball} source={require('@/assets/images/icons/pokeball-2.png')} width={208} height={208} />
            <Pressable onPress={router.back}>
                <Row style={styles.header} >
                    <Row gap={8}>
                        <Image source={require('@/assets/images/icons/back.png')} width={32} height={32} />
                        <ThemesText color="grayWhite" variant="subtitle2" style={{ textTransform: "capitalize"}}>{pokemon?.name} </ThemesText>
                    </Row>
                    <ThemesText color="grayWhite" variant="subtitle2">#{params.id.padStart(3,'0')}</ThemesText>
                </Row>
            </Pressable>
            
                <View style={styles.body}>
                    <Image  style={styles.artwork}
                        source={{uri: getPokemonArtwork(params.id)}}
                        width={200}
                        height={200}>
                        </Image>
                    <Card style={styles.card}>
                        <Row  gap={16}>
                            {pokemonTypes.map(type => <PokemonType name={type.type.name} key={type.type.name}/>)}
                        </Row>
                        <ThemesText color="grayWhite" style={{color: colorType}} variant="subtitle1">About</ThemesText>
                        <Row>
                            <PokemonSpec title={formatWeight(pokemon?.weight)} description="Weight" image={require("@/assets/images/icons/Vector-14.png")} />
                            <PokemonSpec title={formatWeight(pokemon?.height)} description="Height" image={require("@/assets/images/icons/Vector-13.png")} />
                            <PokemonSpec title={pokemon?.moves.slice(0,2).map(m => m.move.name).join("\n")} description="Moves"  />
                        </Row>
                        <ThemesText color="grayWhite" style={{color: colorType}} variant="subtitle1">Base stats</ThemesText>
                    </Card>
                </View>
            </View>
        </RootView>
     )
}

const styles = StyleSheet.create({
    header: {
        margin: 20,
        justifyContent: "space-between",
    },
    pokeball: {
        position: "absolute",
        top: 8,
        right: 8
    },
    artwork: {
        alignSelf: "center",
        position: 'absolute',
        top: -140,
        zIndex: 2,
    },
    body: {
        marginTop: 144,
    },
    card: {
        paddingHorizontal: 20,
        paddingTop: 60,
        gap: 16,
        alignItems: "center",
    }
})

export default Pokemon;