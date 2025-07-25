import { useThemeColors } from "@/hook/useThemeColors"
import { ViewProps, ViewStyle } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export type Props =  ViewProps & {


}

const RootView = ({style, ...rest}: Props) => {

    const colors =  useThemeColors()
    return <SafeAreaView style={[rootStyle, {backgroundColor: colors.tint}, style]} {...rest} />

}

export default RootView;

const rootStyle = {
    flex: 1,
    padding: 4
} satisfies ViewStyle;