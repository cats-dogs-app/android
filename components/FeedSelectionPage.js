import { Button, Container, Content, DatePicker, Text, View } from 'native-base';
import React, { Component } from 'react';
import Swiper from 'react-native-swiper';
import { connect } from 'react-redux';
import { dateChangeAction, feedRequestAction } from '../redux/actions';
import FeedSelectionComponent from './FeedSelectionComponent';
import FooterComponent from './FooterComponent';
import { WaitingPage } from './pages';
import styles from './styles';

const cards = [
  {
    text: 'Card One',
  },
  {
    text: 'Card One',
  },
];


class FeedSelectionPage extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      selected: 'key1',
      date: '' 
    };

    this.onDateValueChange = this.onDateValueChange.bind(this);
    this.onValueChange = this.onValueChange.bind(this);

    if (!this.props.user.loggedIn) this.props.navigation.navigate('Home');
  }

  componentDidMount(){
    if(Object.keys(this.props.user.feed).length === 0) {
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
    this.setState({ date });
    this.props.dateChangeAction({ date });    
  }

  renderFeeds() {
    if (this.props.user.isLoading) return <WaitingPage />
    else return (
      <View style={{padding: 8}}>
        <FeedSelectionComponent/>
        <FeedSelectionComponent/>
        <FeedSelectionComponent/>
      </View>
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
			defaultDate={new Date(2020, 8, 7)}
			minimumDate={new Date(2020, 8, 7)}
			locale={"en"}
			timeZoneOffsetInMinutes={undefined}
			modalTransparent={false}
			animationType={"fade"}
			androidMode={"default"}
			placeHolderText="Tarih seçin"
			textStyle={{ color: "green" }}
			placeHolderTextStyle={{ color: "#d3d3d3" }}
			onDateChange={this.onDateValueChange}
      disabled={false}
      // formatChosenDate={date => date.toLocaleDateString(options)}
			/>
      // TODO: Date formatter
	}

  render() {
    return (
      <Container style={styles.lightBackground}>
        <Content style={styles.marginedContent}>
          <Button disabled rounded block style={styles.disabledButton}>
            <Text style={styles.black}>İSİM</Text>
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
          <View style={{flex: 1, padding: 8}}>
            <FeedSelectionComponent/>
            <FeedSelectionComponent/>
            <FeedSelectionComponent/>    
          </View>
          <View style={{flex: 1, padding: 8}}>
            <FeedSelectionComponent/>
            <FeedSelectionComponent/>
            <FeedSelectionComponent/>    
          </View>
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
  return {    dateChangeAction: content => {dispatch(dateChangeAction(content))},
    feedRequestAction: () => {dispatch(feedRequestAction())}
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedSelectionPage);