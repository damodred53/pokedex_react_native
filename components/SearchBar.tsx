import { useThemeColors } from "@/hook/useThemeColors";
import { Image, StyleSheet, TextInput } from "react-native";
import { Row } from "./Row";


export type Props = {
    value: string,
    onChange: (s: string) => void
}

const SearchBar = ({value, onChange}: Props) => {

    const colors= useThemeColors();



    return (
        <Row gap={8} style={[styles.wrapper, {backgroundColor: colors.grayWhite}]}>
            <Image source={require('@/assets/images/icons/Vector-11.png')} width={16} height={16} />
            <TextInput style={styles.input} onChangeText={onChange} value={value} />
        </Row>


    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        borderRadius: 16,
        height: 42,
        paddingHorizontal: 12,
    },
    input: {
        flex: 1,
        fontSize: 10,
        lineHeight: 16
    },
})

export default SearchBar;