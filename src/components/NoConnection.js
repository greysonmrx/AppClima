import React, { Component } from 'react';

import LottieView from 'lottie-react-native';
import { View, Text, StyleSheet } from 'react-native';

import Anim from '../../assets/data.json';

export default class noConnection extends Component {
  render() {
    return (
        <View style={ styles.container }>
            <LottieView 
              source={ Anim }
              autoPlay={ true }
              loop={ false }
              style={{ marginBottom: 100 }}
            />
            
            <Text style={ styles.title }>SEM ACESSO À INTERNET</Text>
            <Text style={ styles.sub }>Verifique sua conexão e tente novamente</Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4FC3F7'
  },
  title: {
    marginTop: 100,
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 3
  },
  sub: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 17,
    marginTop: 15, 
    width: '70%',
    textAlign: 'center'
  }
});