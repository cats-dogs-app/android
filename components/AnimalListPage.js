import { Container, Content, List, ListItem, Text } from 'native-base';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pushPage } from '../redux/actions';
import FooterComponent from './FooterComponent';
import styles from './styles';

const catList = ["cat1", "cat2"];
const dogList = ["dog1", "dog2"];

class AnimalListPage extends Component {

  constructor(props) {
    super(props);

    this.renderList = this.renderList.bind(this);
    if (!this.props.user.loggedIn) this.props.pushPage({ page: 'Home' });
  }

  renderList() {
    const {selectedAnimalsList} = this.props.user;
    let list;
    if(selectedAnimalsList == "cat") list = catList;
    if(selectedAnimalsList == "dog") list = dogList;
    return list.map(item => {
      return <ListItem onPress={() => this.props.pushPage({ page: 'FeedChart' })}>
        <Text>{item}</Text>
      </ListItem>
    })
  }

  render() {
    return (
      <Container style={styles.lightBackground}>
        <Content style={styles.marginedContent}>
          <List>
            {this.renderList()}
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