import { Button, Container, Content, Form, Input, Item, Text } from 'native-base';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { registerRequest } from '../redux/actions';
import styles from './styles';
import WaitingPage from './WaitingPage';
import { ImageBackground } from "react-native";
import bg from "../assets/bg.jpg";

class RegisterPage extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidUpdate(){
    if (this.props.user.loggedIn) this.props.navigation.navigate('UserStack');
  }
  
  renderRegister = () => 
    <ImageBackground source={bg} style={styles.backgroundImage} imageStyle= 
      {{opacity:0.5}}>
      <Content style={styles.marginedContent}>
        <Content style={styles.inputItem}>
          {this.props.user.error && <Text style={styles.red20Text}>Failed to register, please check your inputs.</Text>}
          {!this.props.user.error && !this.props.user.isRegistered && <Text style={styles.whitest20Text}>Register please.</Text>}
          {this.props.user.isRegistered && <Text style={styles.red20Text}>Please login using new account.</Text>}
        </Content>
        <Form style={styles.marginedTop12}>
          <Item rounded style={styles.marginedContent2}>
            <Input style={styles.input}
              placeholderTextColor='#CCCAAF'
              placeholder='Email'
              value={this.state.username}
              onChangeText={(username) => this.setState({ username })} />
          </Item>
          <Item rounded style={styles.marginedContent2} >
            <Input style={styles.input}
              placeholderTextColor='#CCCAAF'
              placeholder='Password'
              secureTextEntry={true}
              value={this.state.password}
              onChangeText={(password) => this.setState({ password })} />
          </Item>
          <Item rounded style={styles.marginedContent2} >
            <Input style={styles.input}
              placeholderTextColor='#CCCAAF'
              placeholder='Username'
              value={this.state.email}
              onChangeText={(email) => this.setState({ email })} />
          </Item>
        </Form>
        <Content style={styles.marginedTop12}>
          <Button rounded style={styles.button} block onPress={() => this.props.registerRequest({ username: this.state.username, password: this.state.password, email: this.state.email })}>
            <Text>Register</Text>
          </Button>
          <Button rounded style={styles.button} block onPress={() => this.props.navigation.navigate('Login')}>
            <Text>Have an account? Login instead</Text>
          </Button>
        </Content>
      </Content>
    </ImageBackground>
    
  render() {
    if (this.props.user.isLoading) return <WaitingPage />
    else return this.renderRegister()
  }
}
  
const mapStateToProps = state => {
  const user = state.user;
  return { user };
};

const mapDispatchToProps = dispatch => {
  return {
    registerRequest: credentials => { dispatch(registerRequest(credentials)) },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);