import { Button, Card, Content, DatePicker, Form, Input, Item, Label, Text, View } from 'native-base';
import React, { Component } from 'react';
import { ImageBackground, Modal, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import { connect } from 'react-redux';
import bg from "../assets/bg.jpg";
import {
  animalFeedRequestAction,
  animalSelectionAction, 
  customFeedCreationAction, 
  customFeedRequestAction,
  dateChangeAction,
  feedRequestAction
} from '../redux/actions';
import FeedSelectionComponent from './FeedSelectionComponent';
import FooterComponent from './FooterComponent';
import { formatDate } from './formatter';
import { WaitingPage } from './pages';
import styles from './styles';

class FeedSelectionPage extends Component {

  constructor(props) {
    super(props);
    const date = formatDate(new Date());
    this.state = { 
      selected: 'key1',
      date: date,
      visibleModal: false,
      newFeedCal: 0,
      newFeedName: '',
    };

    this.onDateValueChange = this.onDateValueChange.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
  }

  componentDidUpdate(){
    if (!this.props.user.loggedIn) this.props.navigation.navigate('Home');
  }

  componentDidMount(){
    const { user } = this.props;
    this.props.animalSelectionAction({animal: this.props.navigation.state.params.animal});
    this.props.dateChangeAction({ date: this.state.date });
    if (Object.keys(user.feed).length === 0) {
      this.props.feedRequestAction();
    }
    this.props.customFeedRequestAction();
  }

  onValueChange(value) {
    this.setState({
      selected: value
    });
  }

  onDateValueChange(value) {
    const date = formatDate(value);
    this.setState({ date });
    this.props.dateChangeAction({ date });    
  }

  renderSwipePages() {
    const animalFeed = this.props.user.animalFeed;
    let appliedFeeds = Object.keys(animalFeed)
    let sz = appliedFeeds.length
    for (var i = 0; i < 3 - sz % 3; i++) {
      appliedFeeds.push(-1)
    }
    return [...Array(appliedFeeds.length / 3).keys()].map((idx) => {
      return (
        <View style={{flex: 1, padding: 8}}>
          {this.renderFeeds(animalFeed, appliedFeeds.slice(idx * 3, (idx + 1) * 3))}
        </View>
      )
    })
  }

  renderFeeds(animalFeed, slicedFeeds) {
    return (
      slicedFeeds.map((feed, idx) =>
        <FeedSelectionComponent
            feed={feed == -1 ? '' : feed}
            amount={feed == -1 ? 0 : animalFeed[feed]}
        />
      )
    )
  }

	renderDatePicker() {
    // const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return  <View style={styles.centered}>
      <DatePicker
        defaultDate={new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)}
        maximumDate={new Date()}
        locale={"en"}
        timeZoneOffsetInMinutes={undefined}
        modalTransparent={false}
        animationType={"fade"}
        androidMode={"default"}
        placeHolderText="Tarih seçin"
        textStyle={{ color: "green" }}
        selected={this.state.date}
        placeHolderTextStyle={{ color: "#d3d3d3" }}
        onDateChange={this.onDateValueChange}
        disabled={false}
        // formatChosenDate={date => date.toLocaleDateString(options)}
        />
    <Text style={styles.centered}>{this.state.date}</Text>
  </View>
      // TODO: Date formatter
  }
  
  renderFeedCreationModalContent() {
    // Kalori hesabı
		return (
			<Form style={{margin: 30}}>
				<Label style={{marginBottom: 8}}>
					Mama ismi
				</Label>
				<Item style={{marginBottom: 8}} rounded>
					<Input 
						defaultValue={this.state.newFeedName}
						onChangeText={text => this.setState({newFeedName: text})}
					/>
				</Item>
				<Label style={{marginBottom: 8}}>
					Gram başına düşen kalori miktarı
				</Label>
				<Item style={{marginBottom: 8}} rounded>
					<Input 
						defaultValue={this.state.newFeedCal}
						onChangeText={text => this.setState({newFeedCal: parseFloat(text)})}
						keyboardType="number-pad"
          />
				</Item>
				<Button
					onPress={() => {
            this.setState({
						  visibleModal: false
            });
            let list = this.props.user.customFeed;
            list[this.state.newFeedName] = {
              cal: this.state.newFeedCal,
            };
            this.props.customFeedCreationAction({
              feedList: list
            });
          }}
					style={[styles.greenBackground, {marginTop: 12}]}
				>
					<Text>Kaydet</Text>
				</Button>
			</Form>
		)
	}

  render() {
    const {user} = this.props;
    if (user.isLoading) return <WaitingPage />
    return (
      <ImageBackground source={bg} style={styles.backgroundImage} imageStyle= 
      {{opacity:0.5}}>
        <Content>
          <Card style={[styles.marginedContent, {paddingTop: 12, paddingBottom: 24}]}>
            <Button disabled rounded block style={styles.disabledButton}>
              <Text style={styles.black}>{user.animalSelection}</Text>
            </Button>        
            {this.renderDatePicker()}
            <Swiper
              dot={
                <View
                style={{
                  backgroundColor: '#aaa',
                  width: 8,
                  height: 8,
                  borderRadius: 7,
                  marginLeft: 7,
                  marginRight: 7
                }}
                />
              }
              activeDot={
                <View
                style={{
                  backgroundColor: '#777',
                  width: 8,
                    height: 8,
                    borderRadius: 7,
                    marginLeft: 7,
                    marginRight: 7
                  }}
                />
              }
              height={320}
              loop={false}
              >
            {this.renderSwipePages()}
          </Swiper>
          <TouchableOpacity
            style={[styles.addButton, styles.greenBackground]}
            onPress={() => this.setState({
              visibleModal: true
            })}>
            <Text style={styles.white}>+</Text>
          </TouchableOpacity>
          <View>
            <Button rounded block style={styles.button} onPress={() => this.props.navigation.navigate('FeedChart')}>
              <Text>DEĞİŞİM GRAFİĞİ</Text>
            </Button>
            <Button disabled rounded block style={styles.disabledButton}>
              <Text style={styles.black}>Grafiği görebilmek için 7 günlük veri girilmelidir.</Text>
            </Button>
          </View>
        </Card>
        </Content>
        <Modal
          transparent={false}
          visible={this.state.visibleModal}
          animationType="slide">
          {this.renderFeedCreationModalContent()}
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
    animalSelectionAction: content => {dispatch(animalSelectionAction(content))},
    dateChangeAction: content => {dispatch(dateChangeAction(content))},
    customFeedCreationAction: content => {dispatch(customFeedCreationAction(content))},
    customFeedRequestAction: content => {dispatch(customFeedRequestAction(content))},
    feedRequestAction: () => {dispatch(feedRequestAction())},
    animalFeedRequestAction: content => {dispatch(animalFeedRequestAction(content))},
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedSelectionPage);