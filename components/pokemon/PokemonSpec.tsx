import { Image, ImageSourcePropType, StyleSheet, View, ViewProps } from "react-native";
import { Row } from "../Row";
import ThemesText from "../ThemesText";

export type Props = ViewProps & {
    title?: string,
    description? : string,
    image?: ImageSourcePropType

}

const PokemonSpec = ({style, image, title, description, ...rest} : Props) => {


    return (
        <View style={[style, styles.root]} {...rest}>
            <Row style={styles.row}>
                {image && <Image source={image} width={16} height={16}    />}
                <ThemesText>{title}</ThemesText>
            </Row>
            <ThemesText variant="caption" color="grayMedium" >{description}</ThemesText>
        </View>

    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        gap: 4,
        alignItems: "center",
    },
    row: {
        height: 32,
        alignItems: "center",
    }

})

export default PokemonSpec; 