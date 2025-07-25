
import { Colors } from "@/constants/Colors"
import { View, ViewStyle } from "react-native"
import ThemesText from "./ThemesText"

export type Props = {
    name: keyof typeof Colors["type"]
}

const PokemonType = ({name}: Props) => {

    return (
        <View style={[rootStyle, {backgroundColor: Colors.type[name]}]}>
            <ThemesText color="grayWhite" variant="subtitle3" style={{ textTransform: "capitalize"}}>{name}</ThemesText>
        </View>
    )
}

const rootStyle = {
    flex: 0,
    height: 20,
    paddingHorizontal: 8,
    borderRadius: 8,
} satisfies ViewStyle;

export default PokemonType;