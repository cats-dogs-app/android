import { Button, Container, Content, Text } from 'native-base';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginRequest, navigateTo, noLogin } from '../redux/actions';
import styles from './styles';
import WaitingPage from './WaitingPage';

class LoginPage extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    if (this.props.user.loggedIn) this.props.navigation.navigate('FeedSelection');
  }

  renderLogin = () => 
    <Container style={styles.whiteBackground}>
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
    </Container>

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
    noLogin: content => { dispatch(noLogin(content)) }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);