
import { useThemeColors } from "@/hook/useThemeColors";
import { useEffect } from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { Row } from "../Row";
import ThemesText from "../ThemesText";


export type Props = ViewProps & {
    name: string, 
    value: number,
    color: string,
}

const statShortName = (name: string) => {
    return name
    .replaceAll("special", "S")
    .replaceAll("-", "")
    .replaceAll("attack", "ATK")
    .replaceAll("defense", "DEF")
    .replaceAll("speed", "SPD")
    .toUpperCase();
}


const PokemonStats = ({style, color, name, value, ...rest}: Props) => {
    const colors = useThemeColors()
    const sharedValue = useSharedValue(value);

    const barInnerStyle = useAnimatedStyle(() => {
        return {
            flex : sharedValue.value,
        }
    })

    const barBackgroundStyle = useAnimatedStyle(() => {
        return {
            flex : 255 - sharedValue.value,
        }
    })

    useEffect(() => {
        sharedValue.value = withSpring(value);
    }, [sharedValue, value])
    
    return (
        <Row style={[style, styles.root]} {...rest}>
            <View style={[styles.name, {borderColor: colors.grayLight}]}>
                <ThemesText variant="subtitle3" color={{color: color}}>{statShortName(name)}</ThemesText>
            </View>
            <View>
                <ThemesText style={styles.number}>{value.toString().padStart(3, "0")}</ThemesText>
            </View>
            <Row style={styles.bar}>
                <Animated.View style={[styles.barInner, {flex: value, backgroundColor: color}, barInnerStyle]}></Animated.View>
                <Animated.View style={[styles.barBackground, { backgroundColor: color}, barBackgroundStyle]}></Animated.View>
            </Row>
        </Row>
    )
}

const styles = StyleSheet.create({
    root: {},
    name: {
        width: 40,
        paddingRight: 8,
        borderStyle: 'solid',
        borderRightWidth: 1
    },
    number: {
        width: 23,
    },
    bar: {
        flex: 1,
        borderRadius: 20,
        height: 4,
        overflow: 'hidden',
    },
    barInner: {
        height: 4,
    },
    barBackground: {
        height: 4,
        opacity: 0.24,
    },
})

export default PokemonStats;
