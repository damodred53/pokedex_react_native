
import { Shadows } from '@/constants/Shadows';
import { useThemeColors } from '@/hook/useThemeColors';
import { useRef, useState } from 'react';
import { Dimensions, Image, Modal, Pressable, StyleSheet, View } from 'react-native';
import Card from './Card';
import Radio from './Radio';
import { Row } from './Row';
import ThemesText from './ThemesText';


export type Props = {
    value: "id" | "name";
    onChange: (value: "id" | "name") => void;
}

const SortButton = ({value, onChange}: Props) => {

    const colors = useThemeColors();
    const [isModalVisible, setIsModalVisible] = useState(false); 
    const buttonRef = useRef<View>(null);  
    const [position, setPosition] = useState<null | {top: number, right: number}>(null);

    const onButtonPress = () => {
        buttonRef.current?.measureInWindow((x, y, width, height) => {
            setPosition({
                top: y + height,
                right: Dimensions.get("window").width - x - width
            })
        })
        setIsModalVisible(true)
    }

    const onClose = () => {
        setIsModalVisible(false);
    }

    const options = [
        {label: "Number", value: "id"},
        {label: "Name", value: "name"},
    ] as const


    return (
        <>
        <Pressable onPress={onButtonPress}>
            <View ref={buttonRef}style={[styles.button, {backgroundColor: colors.grayWhite}]}>
                <Image 
                source={value === "id" ? require('@/assets/images/icons/Vector-8.png') : require('@/assets/images/icons/Vector-9.png')} 
                style={styles.image}
                />
            </View>
        </Pressable>
        <Modal
            transparent
            visible={isModalVisible}
            onRequestClose={onClose}
            animationType='fade'
         >
            
            <Pressable  style={styles.backdrop} onPress={onClose}/>
            <View style={[styles.popup, {backgroundColor: colors.tint, ...position}]}>
                <ThemesText style={styles.title} variant='subtitle2' color='grayWhite'> Sort by :</ThemesText>
                <Card style={styles.card}>
                    {options.map(option => (
                    <Pressable key={option.value} onPress={() => onChange(option.value)}>
                        <Row gap={8}>
                            <Radio checked={option.value === value} />
                            <ThemesText>{option.label}</ThemesText>
                        </Row>
                    </Pressable>
                    ))}
                </Card>
            </View>
         </Modal>

        
        </>
    )
}

const styles = StyleSheet.create({
    button: {
        width: 32,
        height: 32,
        borderRadius: 32,
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 16,
        height: 16,
        tintColor: 'black', 
    },
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    popup: {
        position: 'absolute',
        padding: 4,
        width: 113,
        borderRadius: 12,
        paddingTop: 16,
        gap: 16,
        ...Shadows.dp2,
    },
    title: {
        paddingLeft : 20
    },
    card: {
        paddingVertical: 16,
        paddingHorizontal: 20,
        gap: 16,

    }
    
})


export default SortButton