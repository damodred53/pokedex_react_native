import { getPokemonArtwork } from "@/functions/pokemon"
import { useThemeColors } from "@/hook/useThemeColors"
import { Link } from "expo-router"
import { Image, Pressable, StyleSheet, View, ViewStyle } from "react-native"
import Card from "../Card"
import ThemesText from "../ThemesText"


export type Props = {
    style?: ViewStyle,
    id: number,
    name: string
}

const PokemonCard = ({style, id, name}: Props) => {


    const colors = useThemeColors();
    return (

        <Link href={{pathname: "/pokemon/[id]", params: {id: id}}} asChild>
            <Pressable android_ripple={{color: colors.tint, foreground: true}} style={style}>
                <Card style={[style, styles.card]}>
                    <ThemesText style={styles.id} variant="caption" color="grayMedium">#{id.toString().padStart(3, '0')}</ThemesText>
                    <View style={[styles.shadow, { backgroundColor: colors.grayBackground }]} />
                    <Image 
                        source={{uri: getPokemonArtwork(id)}}
                        width={72}
                        height={72}>
                    </Image>
                    <ThemesText variant="subtitle1" color="grayDark">{name}</ThemesText>
                    
                </Card>
            </Pressable>
        </Link>


    )
}

const styles = StyleSheet.create({
    card: {
        position: 'relative',
        alignItems: 'center',
        padding: 4,
        overflow: 'hidden'
    }, 
    id: {
        alignSelf: 'flex-end'
    },
    shadow: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 44,
        
    }
})



export default PokemonCard