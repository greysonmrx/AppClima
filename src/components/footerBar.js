import React, { Component } from 'react';

import { View, ScrollView, StyleSheet, Text, Animated } from 'react-native';
import Icon from './icon';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

export default class FooterBar extends Component{
    constructor(props) {
        super(props);
    }

    offset = 0;
    translateY = new Animated.Value(0);

    animatedEvent = Animated.event(
        [
            {
                nativeEvent: {
                translationY: this.translateY,
                },
            },
        ],
        { 
            useNativeDriver: true 
        },
    );

    onHandlerStateChanged = (event) => {
        if (event.nativeEvent.oldState === State.ACTIVE) {
            let opened = false;
            const { translationY } = event.nativeEvent;

            this.offset += translationY;

            if (translationY <= -100) {
                opened = true;
            } else {
                this.translateY.setValue(this.offset);
                this.translateY.setOffset(0);
                this.offset = 0;
            }
        
              Animated.timing(this.translateY, {
                toValue: opened ? -300 : 0,
                duration: 200,
                useNativeDriver: true,
              }).start(() => {
                this.offset = opened ? -300 : 0;
                this.translateY.setOffset(this.offset);
                this.translateY.setValue(0);
              });
        }
    }

    setDate = (date) => {
        switch(date.split('/')[1]) {
            case '01':
                return `${date.split('/')[0]} de Janeiro de ${date.split('/')[2]}`;
            case '02':
                return `${date.split('/')[0]} de Fevereiro de ${date.split('/')[2]}`;
            case '03':
                return `${date.split('/')[0]} de Março de ${date.split('/')[2]}`;
            case '04':
                return `${date.split('/')[0]} de Abril de ${date.split('/')[2]}`;
            case '05':
                return `${date.split('/')[0]} de Maio de ${date.split('/')[2]}`;
            case '06':
                return `${date.split('/')[0]} de Junho de ${date.split('/')[2]}`;
            case '07':
                return `${date.split('/')[0]} de Julho de ${date.split('/')[2]}`;
            case '08':
                return `${date.split('/')[0]} de Agosto de ${date.split('/')[2]}`;
            case '09':
                return `${date.split('/')[0]} de Setembro de ${date.split('/')[2]}`;
            case '10':
                return `${date.split('/')[0]} de Outubro de ${date.split('/')[2]}`;
            case '11':
                return `${date.split('/')[0]} de Novembro de ${date.split('/')[2]}`;
            case '12':
                return `${date.split('/')[0]} de Dezembro de ${date.split('/')[2]}`;
        }
    }

    render() {
        return (
                <Animated.View 
                    style={[ styles.main, { 
                        transform: [{
                            translateY: this.translateY.interpolate({
                                inputRange: [-275, 0],
                                outputRange: [-275, 0],
                                extrapolate: 'clamp',
                            }),
                        }],
                    }]}
                >
                    <PanGestureHandler
                        onGestureEvent={this.animatedEvent}
                        onHandlerStateChange={this.onHandlerStateChanged}
                    >
                        <Animated.View 
                            style={ styles.barContent }>
                            <View 
                                style={ styles.bar }
                            ></View>
                        </Animated.View>
                    </PanGestureHandler>
                    <Text 
                        style={[ 
                            styles.city, 
                            { 
                                color: `${this.props.currently === 'dia' ? "#4FC3F7" : '#263238' }` 
                            } ]}
                    >
                        { this.props.city_name }
                    </Text>
                    <Text 
                        style={[ 
                            styles.details, 
                            { 
                                color: `${this.props.currently === 'dia' ? "rgba(79, 195, 247, 0.5)" : "rgba(38, 50, 56, .5)"}` 
                            } 
                        ]}
                    >
                        { this.setDate(this.props.date) } | { this.props.time }
                    </Text>
                    <ScrollView 
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        style={{ marginLeft: 20 }}
                    >
                        { this.props.forecast.map(day => (
                            <View 
                                key={ day.date } 
                                style={ styles.day }
                            >
                                <Text 
                                    style={ styles.sem }
                                >
                                    { day.weekday }
                                </Text>
                                <Icon 
                                    name={ day.condition }
                                    big={false} 
                                    color={this.props.currently === 'dia' ? "#4FC3F7" : '#263238' }
                                />
                                <Text 
                                    style={ styles.tem }
                                >
                                    { (day.max + day.min)/2 }ºC
                                </Text>
                            </View>
                        )) }
                    </ScrollView>
                </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    main: {
        backgroundColor: "#FFF",
        position: "absolute",
        alignItems: "center",
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        width: "100%",
        height: 300,
        bottom: -275,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        zIndex: 5
    },
    barContent: {
        width: "100%",
        height: 40,
        backgroundColor: "#FFF",
        alignItems: 'center',
    },
    bar: {
        width: 40,
        height: 5,
        borderRadius: 50,
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        marginTop: 10
    },
    city: {
        fontSize: 23,
        marginBottom: 5
    },
    details: {
        marginBottom: 30
    },
    day: {
        padding: 15,
        marginRight: 40,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    sem: {
        fontWeight: 'bold',
        color: "rgba(0, 0, 0, 0.2)",
        fontSize: 14
    },
    tem: {
        fontSize: 13,
        color: "rgba(0, 0, 0, 0.5)",
        fontWeight: "bold"
    }
});  