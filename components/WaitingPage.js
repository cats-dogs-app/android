import { Content, Spinner, Text } from 'native-base';
import React, { Component } from 'react';
import styles from './styles';


export default class WaitingPage extends Component {
  render() {
    return (
      <Content style={styles.darkBackground}>
        <Content style={styles.marginedContent}>
          <Text style={styles.darkGray}>Waiting for response...</Text>
          <Spinner style={styles.green} />
        </Content>
      </Content>
    )
  }
}