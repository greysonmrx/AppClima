import React, { Component } from 'react';

import { MaterialCommunityIcons } from '@expo/vector-icons';

export default class Icon extends Component{
    setIcon = (name) => {
        switch (name){
            case 'cloudly_day':
                return 'weather-partlycloudy';
            case 'rain':
                return 'weather-pouring';
            case 'cloud':
                return 'weather-cloudy';
            case 'clear_day':
                return 'weather-sunny';
            case 'storm':
                return 'weather-lightning';
            case 'wind':
                return 'weather-windy';
            case 'sunset':
                return 'weather-sunset-down';
            case 'sunrise':
                return 'weather-sunset-up';
            case 'humidity':
                return 'water';
            case 'snow':
                return 'weather-snowy'
            case 'hail':
                return 'weather-hail';
            case 'fog':
                return 'weather-fog';
            case 'clear_night':
                return 'weather-night';
            case 'cloudly_night':
                return 'weather-cloudy';
        }
    } 

    render() {
        return (
            <MaterialCommunityIcons name={this.setIcon(this.props.name)} 
                                    size={this.props.big ? 180 : 30}
                                    color={this.props.color} />
        );       
    }
}