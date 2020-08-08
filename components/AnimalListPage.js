import { Container, Content, List, ListItem, Text } from 'native-base';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pushPage } from '../redux/actions';
import FooterComponent from './FooterComponent';
import styles from './styles';

class AnimalListPage extends Component {

  constructor(props) {
    super(props);

    if (!this.props.user.loggedIn) this.props.pushPage({ page: 'Home' });
  }

  render() {
    return (
      <Container style={styles.lightBackground}>
        <Content style={styles.marginedContent}>
          <List>
            <ListItem onPress={() => this.props.pushPage({ page: 'FeedChart' })}>
              <Text>Köpek 1</Text>
            </ListItem>
            <ListItem onPress={() => this.props.pushPage({ page: 'FeedChart' })}>
              <Text>Köpek 1</Text>
            </ListItem>
            <ListItem onPress={() => this.props.pushPage({ page: 'FeedChart' })}>
              <Text>Köpek 1</Text>
            </ListItem>
          </List>
        </Content>
        <FooterComponent />
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
    pushPage: content => { dispatch(pushPage(content)) }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AnimalListPage);