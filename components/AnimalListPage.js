import { Button, Container, Content, Form, Input, Item, Label, List, ListItem, Text } from 'native-base';
import React, { Component } from 'react';
import { Modal, TouchableOpacity } from 'react-native'; // CHANGE_HERE
import { connect } from 'react-redux';
import { animalCreationAction } from '../redux/actions';
import FooterComponent from './FooterComponent';
import styles from './styles';


class AnimalListPage extends Component {

  constructor(props) {
    super(props);
		this.state = { 
      visibleModal: false,
      animal: '',
		};

    this.renderList = this.renderList.bind(this);
  }

  componentDidUpdate(){
    if (!this.props.user.loggedIn) this.props.navigation.navigate('Home');
  }

  renderModalContent() {
		return (
			<Form style={{margin: 30}}>
				<Label style={{marginBottom: 8}}>
					Yeni hayvan ekle
				</Label>
				<Item rounded>
					<Input 
						onChangeText={text => this.setState({animal: text})}/>
				</Item>
				<Button
					onPress={() => {
            this.setState({
              visibleModal: false
            });
            this.props.animalCreationAction({animal: this.state.animal});
          }}
					style={[styles.greenBackground, {marginTop: 12}]}
				>
					<Text>Kaydet</Text>
				</Button>
			</Form>
		);
  }
  
  renderList() {
    const {selectedAnimalsList} = this.props.user;
    return selectedAnimalsList.map(item => 
      <ListItem onPress={() => {
        this.props.navigation.navigate('FeedSelection', { animal: item });
      }}>
        <Text>{item}</Text>
      </ListItem>
    )
  }

  render() {
    return (
      <Container style={styles.lightBackground}>
        <Content style={styles.marginedContent}>
          <List>
            {this.renderList()}
          </List>
          <TouchableOpacity
            style={[styles.roundButton, styles.greenBackground]}
            onPress={() => this.setState({
              visibleModal: true
            })}>
            <Text style={styles.white}>+</Text>
          </TouchableOpacity>
          <Modal
            transparent={false}
            visible={this.state.visibleModal}
            animationType="slide">
            {this.renderModalContent()}
          </Modal>
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
    animalCreationAction: content => {dispatch(animalCreationAction(content))}
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AnimalListPage);