import { View, ViewProps, ViewStyle } from "react-native"


export type Props = ViewProps & {
    gap?: number
}

export const Row = ({style, gap, ...rest}: Props) => {

    return ( 
    
        <View style={[RowStyle, style, gap ? {gap: gap} : undefined]} {...rest}>

        </View>
    )

}

const RowStyle = {
    flex: 0,
    flexDirection: 'row',
    alignItems: "center"
} satisfies ViewStyle;