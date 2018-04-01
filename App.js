/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions
} from 'react-native';

import Aplicacao from './src/components/Aplicacao'

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      builds: []
    }
  }

  componentDidMount() {
      fetch('https://api.bitrise.io/v0.1/me/apps',
      {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'token ******'
      }
    }).then(resposta => resposta.json())
      .then(json => 
        //console.warn('foi' + json.data[0].provider)
        this.setState({builds: json})
      ).catch(err =>
        console.error('deu ruim')
       )
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.cabecalho}>
          <Text style={styles.titulo}>Bitrise Companion</Text>
        </View>
        <FlatList style={styles.lista}
          keyExtractor={item => item.slug}
          data={this.state.builds.data}
          renderItem={ ({item}) =>
            <Aplicacao build={item} />
          }
        />
      </View>
    );
  }
}
const width = Dimensions.get('screen').width;
const margem = Platform.OS == 'ios' ? 20 : 0;

const styles = StyleSheet.create({
  container: {
    marginTop: margem,
    flex: 1,
  },
  cabecalho:{
    height: 50,
    backgroundColor: '#3aa792',
  },
  titulo:{
    color: 'white',
    fontSize: 19,
    fontWeight: 'bold',
    marginTop: 10,
    textAlignVertical: 'bottom',
    textAlign: 'center'
  }
});
