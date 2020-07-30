import { Button, Container, Content, Text, View } from 'native-base';
import React, { Component } from 'react';
import Swiper from 'react-native-swiper';
import { connect } from 'react-redux';
import { navigateTo, pushPage } from '../redux/actions';
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
    this.state = { selected: 'key1' };
  }

  onValueChange(value) {
    this.setState({
      selected: value
    });
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

  render() {
    if (!this.props.user.loggedIn) this.props.history.push('/');
    return (
      <Container style={styles.lightBackground}>
        <Content style={styles.marginedContent}>
          <Button disabled rounded block style={styles.disabledButton}>
            <Text style={styles.black}>İSİM</Text>
          </Button>        
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
            <Button rounded block style={styles.button} onPress={() => this.props.pushPage({page: 'FeedChart'})}>
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
    navigateTo: content => { dispatch(navigateTo(content)) },
    pushPage: content => { dispatch(pushPage(content)) }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedSelectionPage);