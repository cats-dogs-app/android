import { Button, Card, Content, Form, Input, Item, Label, List, ListItem, Text } from 'native-base';
import React, { Component } from 'react';
import { ImageBackground, Modal, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import bg from "../assets/bg.jpg";
import { animalCreationAction, selectionChangeAction } from '../redux/actions';
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
    const { navigation, user } = this.props;
    if (!user.loggedIn) navigation.navigate('Home');
  }

  componentDidMount(){
    const { user } = this.props;
    if (user.selectedAnimalsList.length === 0) this.props.selectionChangeAction({selection: user.selectedAnimals});
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
      <ListItem key={item} onPress={() => {
        this.props.navigation.navigate('FeedSelection', { animal: item });
      }}>
        <Text>{item}</Text>
      </ListItem>
    )
  }

  render() {
    return (
      <ImageBackground source={bg} style={styles.backgroundImage} imageStyle= 
      {{opacity:0.5}}>
        <Content style={styles.marginedContent}>
          <Card style={{paddingTop: 12, paddingBottom: 24}}>
            <List>
              {this.renderList()}
            </List>
          </Card>
          <TouchableOpacity
            style={[styles.addButton, styles.greenBackground]}
            onPress={() => this.setState({
              visibleModal: true
            })}>
            <Text style={styles.white}>+</Text>
          </TouchableOpacity>
        </Content>
        <Modal
          transparent={false}
          visible={this.state.visibleModal}
          animationType="slide">
          {this.renderModalContent()}
        </Modal>
        <FooterComponent />
    </ImageBackground>
    )
  }
}

const mapStateToProps = state => {
    const user = state.user;
    return { user };
};

const mapDispatchToProps = dispatch => {
  return {
    animalCreationAction: content => {dispatch(animalCreationAction(content))},
    selectionChangeAction: content => {dispatch(selectionChangeAction(content))},
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AnimalListPage);