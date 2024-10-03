import { StyleSheet } from "react-native"


export const colors = {
    darkBlue: '#4a90e2',
    bluishViolet: '#7b61ff',
    lightBlue: '#5bc0de',
    lightBlack: '#4a4a4a',
    blue: '#007bff',
    plum: '#ff4081',
    grey: '#b0b0b0',
    babyBlue: '#89cff0',
    transparentBabyBlue: '#89cff0bf',
    slateBlue: '#6a5acd',
    transparentSlateBlue: '#6a5acdbf',
    black: '#000',
}

export const commonStyles = StyleSheet.create({
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        borderBottomColor: colors.bluishViolet,
        borderBottomWidth: 2,
        paddingBottom: 12,
        marginTop: 16,
        fontSize: 18,
        color: colors.bluishViolet,
        fontWeight: 'bold',
    },
})