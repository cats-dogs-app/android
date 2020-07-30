import { Button, Container, Content, Form, Input, Item, Text } from 'native-base';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadNavigation, loginRequest, navigateTo, noLogin } from '../redux/actions';
import styles from './styles';
import WaitingPage from './WaitingPage';

class LoginPage extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    if (!this.props.nav) this.props.loadNavigation(this.props.navigation);
    if (this.props.user.loggedIn) this.props.navigateTo({ page: 'FeedSelection' });
  }

  renderLogin = () => 
    <Container style={styles.whiteBackground}>
      <Content style={styles.marginedContent}>
        <Content style={styles.marginedTop12}>
        <Button rounded style={styles.button} block onPress={() => this.props.navigateTo({ page: 'Login' })}>
            <Text>Login</Text>
          </Button>
          <Button rounded style={styles.button} block onPress={() => this.props.navigateTo({ page: 'Register' })}>
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
    navigateTo: content => { dispatch(navigateTo(content)) },
    noLogin: content => { dispatch(noLogin(content)) }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);