import { Button, Container, Content, Form, Input, Item, Text } from 'native-base';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginRequest } from '../redux/actions';
import styles from './styles';
import WaitingPage from './WaitingPage';
import { ImageBackground } from "react-native";
import bg from "../assets/bg.jpg";

class LoginPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: 'a',
      password: ''
    };
  }

  componentDidUpdate(){
    if (this.props.user.loggedIn) this.props.navigation.navigate('UserStack');
  }

  renderLogin = () => 
    <ImageBackground source={bg} style={styles.backgroundImage} imageStyle= 
        {{opacity:0.5}}>
      <Content style={styles.marginedContent}>
        <Content style={styles.inputItem}>
          {this.props.user.error && <Text style={styles.red20Text}>Failed to login, please check your inputs.</Text>}
          {!this.props.user.error && <Text style={styles.whitest20Text}>Login please.</Text>}
        </Content>
        <Form style={styles.marginedTop12}>
          <Item rounded style={styles.marginedContent2}>
            <Input style={styles.input}
              placeholderTextColor='#CCCAAF'
              placeholder='Username'
              value={this.state.username}
              onChangeText={(username) => this.setState({ username })} />
          </Item>
          <Item rounded style={styles.marginedContent2}>
            <Input style={styles.input}
              placeholderTextColor='#CCCAAF'
              placeholder='Password'
              secureTextEntry={true}
              value={this.state.password}
              onChangeText={(password) => this.setState({ password })} />
          </Item>
        </Form>
        <Content style={styles.marginedTop12}>
          <Button rounded style={styles.button} block onPress={() => this.props.loginRequest({ username: this.state.username, password: this.state.password })}>
            <Text>Login</Text>
          </Button>
          <Button rounded style={styles.button} block 
            onPress={() => this.props.navigation.navigate('Register')}>
            <Text>Don't have an acoount? Register instead</Text>
          </Button>
        </Content>
      </Content>
    </ImageBackground>

  render() {
    if (this.props.user.isLoading) return <WaitingPage />
    else return this.renderLogin()
  }
}

const mapStateToProps = state => {
  const user = state.user;
  return { user };
};

const mapDispatchToProps = dispatch => {
  return {
    loginRequest: credentials => { dispatch(loginRequest(credentials)) },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);