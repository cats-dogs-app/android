import { Content, Spinner, Text } from 'native-base';
import React, { Component } from 'react';
import styles from './styles';
import { ImageBackground } from "react-native";
import bg from "../assets/bg.jpg";

export default class WaitingPage extends Component {
  render() {
    return (
      <ImageBackground source={bg} style={styles.backgroundImage} imageStyle= 
      {{opacity:0.5}}>
        <Content style={styles.darkBackground}>
          <Content style={styles.marginedContent}>
            <Text style={styles.darkGray}>Waiting for response...</Text>
            <Spinner style={styles.green} />
          </Content>
        </Content>
      </ImageBackground>
    )
  }
}