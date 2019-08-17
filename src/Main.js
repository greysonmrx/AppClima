import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, NetInfo } from 'react-native';

import Icon from './components/icon';
import FooterBar from './components/footerBar';
import { locale, format, key, city_name } from './config';
import NoConnection from './components/NoConnection';
import SearchBar from './components/SearchBar';

export default class Main extends Component{
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            data: null,
            statusNetwork: false
        }
    }

    getResponse = async (city) => {
        this.setState({
            loading: true
        });
        try {
            const response = await fetch(`https://api.hgbrasil.com/weather?format=${format}&key=${key}&locale=${locale}&city_name=${city}`);

            const { results } = await response.json();

            this.setState({ 
                data: results, 
                loading: false
            });
            console.log(response);
        } catch(err) {
            alert(err);
        }
    }

    componentDidMount() {
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);
    }
    
    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange);
    }

    handleConnectionChange = (isConnected) => {
        this.setState({ 
            statusNetwork: isConnected
        });

        if (!!this.state.statusNetwork) {
            this.getResponse(city_name);
        }
    }

    render() {
        if (!this.state.statusNetwork) {
            return (
                <NoConnection />
            )
        } else if (!!this.state.loading) {
            return (
                <View 
                    style={ styles.loadingContent }
                >
                    <ActivityIndicator 
                        size={60}
                        color="#FFFFFF"
                    />
                    <Text 
                        style={ styles.textLoading }
                    >
                        Carregando dados do tempo...
                    </Text>
                </View>
            )
        } else {
            return (
                <> 
                    <View 
                        style={[ 
                            styles.mainContent, 
                            { 
                                backgroundColor: `${this.state.data.currently === 'dia' ? "#4FC3F7" : '#263238'}` 
                            } 
                        ]}
                    >
                        <SearchBar search={ (city) =>this.getResponse(city) }/>
                        <View 
                            style={ styles.firstContent }
                        >
                            <Icon 
                                name={ this.state.data.condition_slug }
                                big={true}
                                color="#FFFFFF" 
                            />
                            <Text 
                                style={ styles.temp }
                            >
                                { this.state.data.temp }ºC
                            </Text>
                            <Text 
                                style={ styles.condition }
                            >
                                { this.state.data.description }
                            </Text>
                        </View>
                        <View 
                            style={ styles.secondContent }
                        >
                            <View 
                                style={ styles.one }
                            >
                                <View 
                                    style={ styles.contentRow }
                                >
                                    <Icon 
                                        name="wind"
                                        big={false}
                                        color="#FFFFFF"
                                    />
                                    <Text 
                                        style={ styles.textSimple }
                                    >
                                        { this.state.data.wind_speedy }
                                    </Text>
                                </View>
                                <View 
                                    style={ styles.contentRow }
                                >
                                    <Icon 
                                        name="humidity"
                                        big={false}
                                        color="#FFFFFF"
                                    />
                                    <Text 
                                        style={ styles.textSimple }
                                    >
                                        { this.state.data.humidity }%
                                    </Text>
                                </View>
                            </View>
                            <View 
                                style={ styles.two }
                            >
                                <View 
                                    style={ styles.contentRow }
                                >
                                    <Icon 
                                        name="sunrise"
                                        big={false}
                                        color="#FFFFFF"
                                    />
                                    <Text 
                                        style={ styles.textSimple }
                                    >
                                        { this.state.data.sunrise }
                                    </Text>
                                </View>
                                <View 
                                    style={ styles.contentRow }
                                >
                                    <Icon 
                                        name="sunset"
                                        big={false}
                                        color="#FFFFFF"
                                    />
                                    <Text 
                                        style={ styles.textSimple }
                                    >
                                        { this.state.data.sunset }
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <FooterBar 
                        forecast={ this.state.data.forecast }
                        city_name={ this.state.data.city_name }
                        date={ this.state.data.date }
                        time={ this.state.data.time }
                        currently={ this.state.data.currently }
                    />
                </>
            );
        }
    }
}

const styles = StyleSheet.create({
    mainContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    firstContent: {
        alignItems: 'center',
        marginBottom: 80,
        marginTop: 20
    },
    secondContent: {
        alignItems: 'center',
        flexDirection: 'row',
        width: '90%',
        justifyContent: 'space-between',
        marginHorizontal: 90,
    },  
    mainIcon: {
        width: 150,
        height: 150
    },
    temp: {
        fontSize: 50,
        color: "#FFFFFF",
        fontWeight: 'bold'
    },
    condition: {
        fontSize: 25,
        color: "#FFFFFF"
    },
    one: {
        justifyContent: 'space-between',
        height: 100
    }, 
    two: {
        justifyContent: 'space-between',
        height: 100
    },  
    contentRow: {
        alignItems: 'center',
        flexDirection: 'row'
    },
    textSimple: {
        fontSize: 17,
        color: "#FFFFFF",
        fontWeight: 'bold',
        marginLeft: 25
    },
    loadingContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4FC3F7'
    },
    textLoading: {
        color: '#FFFFFF',
        fontSize: 16,
        marginTop: 20,
    }
});