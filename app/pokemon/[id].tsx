import Card from "@/components/Card";
import PokemonSpec from "@/components/pokemon/PokemonSpec";
import PokemonStats from "@/components/pokemon/PokemonStats";
import PokemonType from "@/components/PokemonType";
import RootView from "@/components/RootView";
import { Row } from "@/components/Row";
import ThemesText from "@/components/ThemesText";
import { Colors } from "@/constants/Colors";
import { basePokemonStats, formatSize, formatWeight, getPokemonArtwork } from "@/functions/pokemon";
import { useFetchQuery } from "@/hook/useFetchQuery";
import { useThemeColors } from "@/hook/useThemeColors";
import { Audio } from "expo-av";
import { router, useLocalSearchParams } from "expo-router";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";

const Pokemon = () => {
    const colors = useThemeColors()
    const params = useLocalSearchParams() as {id: string}
    const {data: pokemon} = useFetchQuery("/pokemon/[id]" ,  {id: params.id});
    const {data: species} = useFetchQuery("/pokemon-species/[id]" ,  {id: params.id});
    const bio = species?.flavor_text_entries?.find(({language}) => language.name === "en")?.flavor_text.replaceAll("\n", ". ");
    const mainType = pokemon?.types?.[0].type.name;
    const pokemonTypes = pokemon?.types ?? [];
    const stats = pokemon?.stats ?? basePokemonStats;
    const id = parseInt(params.id, 10)
   
    const colorType = mainType ? Colors.type[mainType] : colors.tint
    const top = useSharedValue(0);

    const onImagePress = async () => {
        const cry = pokemon?.cries.latest;

        if (!cry) {
            return;
        }
        const {sound} = await Audio.Sound.createAsync({
            uri: cry,
        }, {shouldPlay: true})
        sound.playAsync();
    }

    const onPrevious = () => {
        router.replace({
            pathname: '/pokemon/[id]', 
            params: {id: Math.max(id - 1, 1)}});
    }

    const onNext = () => {
        router.replace({
            pathname: '/pokemon/[id]', 
            params: {id: Math.min(id + 1, 1025)}});
    }

    const idFirst = id === 1;


     return (
        <RootView backgroundColor={colorType}>
            <View>
                <Image style={styles.pokeball} source={require('@/assets/images/icons/pokeball-2.png')} width={208} height={208} />
            <Pressable onPress={router.back}>
                <Row style={styles.header}>
                    <Row gap={8}>
                        <Image source={require('@/assets/images/icons/back.png')} width={32} height={32} />
                        <ThemesText color="grayWhite" variant="subtitle2" style={{ textTransform: "capitalize"}}>{pokemon?.name} </ThemesText>
                    </Row>
                        <ThemesText color="grayWhite" variant="subtitle2">#{params.id.padStart(3,'0')}</ThemesText>
                </Row>
            </Pressable>


                    
                    <Card style={styles.card}>
                        <Row style={styles.imageRow}>
                            {idFirst ? <View style={{ width: 24, height: 24 }}></View> : (<Pressable onPress={onPrevious}>
                                <Image width={24} height={24} source={require('@/assets/images/icons/Vector-16.png')} />
                            </Pressable>
                            )}
                            <Pressable onPress={onImagePress}>
                            <Image  style={{...styles.artwork}}
                                source={{uri: getPokemonArtwork(params.id)}}
                                width={200}
                                height={200}
                            />
                            </Pressable>
                            <Pressable onPress={onNext}>
                                <Image width={24} height={24} source={require('@/assets/images/icons/Vector-15.png')} />
                            </Pressable>
                        </Row>

                        <Row  gap={16} style={{height: 20}}>
                            {pokemonTypes.map(type => <PokemonType name={type.type.name} key={type.type.name}/>)}
                        </Row>

                        {/* Partie A propos */}
                        <ThemesText color="grayWhite" style={{color: colorType}} variant="subtitle1">About</ThemesText>
                        <Row>
                            <PokemonSpec style={{borderStyle: 'solid', borderRightWidth: 1, borderColor: colors.grayLight}} title={formatWeight(pokemon?.weight)} description="Weight" image={require("@/assets/images/icons/Vector-14.png")} />
                            <PokemonSpec style={{borderStyle: 'solid', borderRightWidth: 1, borderColor: colors.grayLight}} title={formatSize(pokemon?.height)} description="Height" image={require("@/assets/images/icons/Vector-13.png")} />
                            <PokemonSpec title={pokemon?.moves.slice(0,2).map(m => m.move.name).join("\n")} description="Moves"  />
                        </Row>
                        <ThemesText>{bio}</ThemesText>

                        {/* Partie statistiques */}
                        <ThemesText color="grayWhite" style={{color: colorType}} variant="subtitle1">Base stats</ThemesText>

                        <View style={{ alignSelf: "stretch"}}>
                            {stats.map((stat) => {
                                return <PokemonStats key={stat.stat.name} name={stat.stat.name} value={stat.base_stat} color={colorType} />
                            })}
                            
                            
                        </View>
                    </Card>


                
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
    imageRow: {
        position: 'absolute',
        top: -140,
        zIndex: 2,
        justifyContent: "space-between",
        left: 0,
        right: 0,
        paddingHorizontal: 20,
    },
    artwork: {},
    card: {
        paddingHorizontal: 20,
        paddingTop: 60,
        gap: 16,
        alignItems: "center",
        paddingBottom: 20,
        marginTop: 144,
    },
    
})

export default Pokemon;