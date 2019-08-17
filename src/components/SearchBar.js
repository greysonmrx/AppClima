import React, { Component } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

import { FontAwesome } from '@expo/vector-icons';

export default class SearchBar extends Component {
    constructor(props) {
        super();
        this.state = {
            text: ""
        }
    }
    render() {
        return (
            <View
                style={ styles.main }
            >
                <TextInput 
                    placeholder="Digite uma cidade..."
                    style={ styles.input }
                    onChangeText={ (text) => this.setState({ text }) }
                    onSubmitEditing={ () => this.props.search(this.state.text) }
                />
                <Button 
                    onPress={() => this.props.search(this.state.text)}
                    title="Pesquisar"
                    style={ styles.button }
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main: {
        width: "100%",
        flexDirection: "row",
        justifyContent: 'space-between',
        paddingHorizontal: 10
    },
    input: {
        backgroundColor: "#FFFFFF",
        padding: 8,
        flex: 1,
        borderRadius: 3,
        marginRight: 10
    },
    button: {
        color: "#4FC3F7",
        backgroundColor: "#FFFFFF",
        borderRadius: 8,
        alignItems: "center"
    }
})