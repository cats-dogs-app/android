import { Button, Container, Content, DatePicker, Text, View } from 'native-base';
import React, { Component } from 'react';
import Swiper from 'react-native-swiper';
import { connect } from 'react-redux';
import { animalSelectionAction, animalFeedRequestAction, dateChangeAction, feedRequestAction } from '../redux/actions';
import FeedSelectionComponent from './FeedSelectionComponent';
import FooterComponent from './FooterComponent';
import { WaitingPage } from './pages';
import styles from './styles';

class FeedSelectionPage extends Component {

  constructor(props) {
    super(props);
    const date = this.formatDate(new Date());
    this.state = { 
      selected: 'key1',
      date: date
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
  }

  onValueChange(value) {
    this.setState({
      selected: value
    });
  }

  onDateValueChange(value) {
    const date = this.formatDate(value);
    console.log(date)
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
          {this.renderFeeds(animalFeed, appliedFeeds.slice(idx * 3, idx * 3 + 3))}
        </View>
      )
    })
  }

  renderFeeds(animalFeed, slicedFeeds) {
    return (
      slicedFeeds.map((feed, idx) =>
        <FeedSelectionComponent
            feed={feed == -1 ? '' : feed}
            amount={feed == -1? 0 : animalFeed[feed]}
        />
      )
    )
  }

  formatDate(date) {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

	renderDatePicker() {
    // const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return  <DatePicker
			defaultDate={new Date()}
			// maximumDate={new Date()}
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
      // TODO: Date formatter
	}

  render() {
    const {user} = this.props;
    if (user.isLoading) return <WaitingPage />
    return (
      <Container style={styles.lightBackground}>
        <Content style={styles.marginedContent}>
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

          <View>
            <Button rounded block style={styles.button} onPress={() => this.props.navigation.navigate('FeedChart')}>
              <Text>DEĞİŞİM GRAFİĞİ</Text>
            </Button>
            <Button disabled rounded block style={styles.disabledButton}>
              <Text style={styles.black}>Grafiği görebilmek için 7 günlük veri girilmelidir.</Text>
            </Button>
          </View>
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
    animalSelectionAction: content => {dispatch(animalSelectionAction(content))},
    dateChangeAction: content => {dispatch(dateChangeAction(content))},
    feedRequestAction: () => {dispatch(feedRequestAction())},
    animalFeedRequestAction: content => {dispatch(animalFeedRequestAction(content))},
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedSelectionPage);