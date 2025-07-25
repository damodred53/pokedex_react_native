import { Shadows } from "@/constants/Shadows";
import { useThemeColors } from "@/hook/useThemeColors";
import { View, ViewProps, ViewStyle } from "react-native";


type Props = ViewProps

const Card = ({style, ...rest}: Props ) => {

    const colors = useThemeColors();

    return (

        <View style={[ style, styles, { backgroundColor: colors.grayWhite } ]} {...rest} >

        </View>
    )
    
}

const styles = {
    
    borderRadius: 8,
    ...Shadows.dp2
        
} satisfies ViewStyle

export default Card