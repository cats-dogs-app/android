import { Button, Card, Container, Content, Text, View } from 'native-base';
import React, { Component } from 'react';
import { BarChart, Grid, ProgressCircle, XAxis, YAxis } from 'react-native-svg-charts';
import { connect } from 'react-redux';
import { formatDate } from './formatter';
import FooterComponent from './FooterComponent';
import { db } from '../redux/firebase'
import styles from './styles';
import { _ } from 'lodash';


class FeedChartPage extends Component {

  constructor(props) {
    super(props);
    this.state = { data: [] };
    this.render = this.render.bind(this)
  }

  async componentDidMount() {
    const data = await this.calculateChartData()
    this.setState({ data })
  }

  async getDailyAmount(date, chartData) {
    const user = this.props.user
    const allFeed = user.feed
    const type = user.selectedAnimals;
    const animal = user.animalSelection;
    const name = user.username.split('@')[0];
    try {
      await db.ref('/users/' + name + '/pets/' + type + '/' + animal + '/' + date + '/').once('value').then(function(snapshot) {
        const currentFeed = snapshot.val()
        console.log(date, ' ----> ', currentFeed)
        if (!currentFeed) chartData.push(0)
        else {
          var totalCal = 0
          _.forEach(currentFeed, (val, key) => {
            totalCal = totalCal + (val * allFeed[key].cal)
          })
          chartData.push(totalCal)
        }
      }).catch(error => {
        console.log(error)
      });
    } catch (error) {
      console.log(error)
    }
    console.log(this.props)
  }

  async calculateChartData() {
    let chartData = []
    let idx = 0
    while (idx < 7) {
      const currentDay = formatDate(new Date(Date.now() - idx * 24 * 60 * 60 * 1000))
      await this.getDailyAmount(currentDay, chartData)
      idx = idx + 1
    }

    return chartData.reverse()
  }

  componentDidUpdate(){
    if (!this.props.user.loggedIn) this.props.navigation.navigate('Home');
  }

  renderChart() {
    return (
        <Card>
            <View style={{ flexDirection: 'column' }}>
                <View style={{ height: 200, flexDirection: 'row' }}>
                    <YAxis
                        style={{ width: 32 }}
                        data={this.state.data}
                        contentInset={{ top: 24, bottom: 12 }}
                        svg={{ fontSize: 10, fill: '#00b738' }}
                        min={0}
                        numberOfTicks={10}
                        formatLabel={value => value}
                    />
                    <BarChart
                        style={{ flex: 1, marginLeft: 0 }}
                        data={this.state.data}
                        svg={{  fill: '#00b738' }}
                        contentInset={{ top: 24, bottom: 12 }}
                        yMin={0}
                    >
                        <Grid />
                    </BarChart>
                </View>
                <XAxis
                    style={{}}
                    data={this.state.data}
                    formatLabel={(value, index) => index + 1}
                    contentInset={{ left: 48, right: 16 }}
                    svg={{ fontSize: 10, fill: '#00b738' }}
                />
            </View>
        </Card>
    )
  }

  render() {
    return (
      <Container style={styles.lightBackground}>
        <Content style={styles.marginedContent}>
          {this.renderChart()}
          <Button disabled rounded block style={styles.disabledButton}>
            <Text style={styles.black}>HAFTALIK DEĞİŞİM</Text>
          </Button>
          <ProgressCircle style={{ height: 200, margin: 24 }} progress={0.7} progressColor={'#00b738'} strokeWidth={15} />
          <Button rounded block style={styles.button} onPress={() => this.props.navigateTo({page: 'FeedChart'})}>
            <Text>PREMİUM'A KATIL</Text>
          </Button>
          <Button disabled rounded block style={styles.disabledButton}>
            <Text style={styles.black}>SONRAKİ HAFTALAR İÇİN ÜYELİK GEREKMEKTEDİR.</Text>
          </Button>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedChartPage);
