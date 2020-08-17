import { Button, Content, Text } from 'native-base';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './styles';
import WaitingPage from './WaitingPage';
import { ImageBackground } from "react-native";
import bg from "../assets/bg.jpg";

class HomePage extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidUpdate(){
    if (this.props.user.loggedIn) this.props.navigation.navigate('UserStack');
  }

  renderHome = () => {
    return <ImageBackground source={bg} style={styles.backgroundImage} imageStyle= 
      {{opacity:0.5}}>
      <Content style={styles.marginedContent}>
        <Content style={styles.marginedTop12}>
        <Button rounded style={styles.button} block onPress={() => this.props.navigation.navigate('Login')}>
            <Text>Login</Text>
          </Button>
          <Button rounded style={styles.button} block onPress={() => this.props.navigation.navigate('Register')}>
            <Text>Register</Text>
          </Button>
        </Content>
      </Content>
    </ImageBackground>
  }

  render() {
    if (this.props.user.isLoading) return <WaitingPage />
    else return this.renderHome()
  }
}

const mapStateToProps = state => {
  const user = state.user;
  return { user };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);