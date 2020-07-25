import { Button, Container, Content, Form, Input, Item, Text } from 'native-base';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadNavigation, loginRequest, noLogin } from '../redux/actions';
import styles from './styles';
import WaitingPage from './WaitingPage';
import { withRouter } from "react-router";

class LoginPage extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  renderLogin = () => 
    <Container style={styles.whiteBackground}>
      <Content style={styles.marginedContent}>
        <Content style={styles.marginedTop12}>
        <Button rounded style={styles.button} block onPress={() => this.props.history.push("/login")}>
            <Text>Login</Text>
          </Button>
          <Button rounded style={styles.button} block onPress={() => this.props.history.push("/register")}>
            <Text>Register</Text>
          </Button>
        </Content>
      </Content>
    </Container>

  render() {
    if (this.props.user.loggedIn) this.props.history.push('/feed');
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
    loadNavigation: content => { dispatch(loadNavigation(content)) },
    loginRequest: credentials => { dispatch(loginRequest(credentials)) },
    noLogin: content => { dispatch(noLogin(content)) }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginPage));