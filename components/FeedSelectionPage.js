import { Badge, Button, Container, Content, Text, View } from 'native-base';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { navigateTo } from '../redux/actions';
import Logout from './LogoutButton';
import FeedSelectionComponent from './FeedSelectionComponent';
import { WaitingPage } from './pages';
import styles from './styles';

class FeedSelectionPage extends Component {

  constructor(props) {
    super(props);
    this.state = { selected: 'key1' };

    if (!this.props.user.loggedIn) this.props.navigateTo({ page: 'Login' });
  }

  onValueChange(value) {
    this.setState({
      selected: value
    });
  }

  renderFeeds() {
    if (this.props.user.isLoading) return <WaitingPage />
    else return (
      <View>
        <FeedSelectionComponent/>
        <FeedSelectionComponent/>
        <FeedSelectionComponent/>
      </View>
    )
  }

  render() {
    return (
      <Container style={styles.lightBackground}>
        <Content style={styles.marginedContent}>
          <Button disabled rounded block style={styles.disabledButton}>
            <Text style={styles.black}>İSİM</Text>
          </Button>
          {this.renderFeeds()}
          <Button rounded block style={styles.button}>
            <Text>Değişim Grafiği</Text>
          </Button>
          <Button disabled rounded block style={styles.disabledButton}>
            <Text style={styles.black}>Grafiği görebilmek için 7 günlük veri girilmelidir.</Text>
          </Button>
        </Content>
        <Logout />
      </Container>
    )
  }
}

const mapStateToProps = state => {
    const user = state.user;
    return { user };
};

const mapDispatchToProps = dispatch => {
  return {
    navigateTo: content => { dispatch(navigateTo(content)) }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedSelectionPage);