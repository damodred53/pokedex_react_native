import { Image, ImageSourcePropType, StyleSheet, View, ViewProps } from "react-native";
import { Row } from "../Row";
import ThemesText from "../ThemesText";

export type Props = ViewProps & {
    title?: string,
    description : string,
    image?: ImageSourcePropType

}

const PokemonSpec = ({style, image, title, description, ...rest} : Props) => {


    return (
        <View style={[style, styles.root]} {...rest}>
            <Row>
                {image && <Image source={image} width={16} height={16}    />}
                <ThemesText>{title}</ThemesText>
            </Row>
            <ThemesText variant="caption" color="grayMedium" />
        </View>

    )
}

const styles = StyleSheet.create({
    root: {
        
    }
})

export default PokemonSpec;