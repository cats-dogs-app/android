import { Button, Card, Container, Content, Text, View } from 'native-base';
import React, { Component } from 'react';
import { BarChart, Grid, ProgressCircle, XAxis, YAxis } from 'react-native-svg-charts';
import { connect } from 'react-redux';
import { dateChangeAction } from '../redux/actions';
import FooterComponent from './FooterComponent';
import styles from './styles';

class FeedChartPage extends Component {

  constructor(props) {
    super(props);
    this.state = { data:[20, 30, 10, 5, 20, 5, 20]};

    if (!this.props.user.loggedIn) this.props.navigation.navigate('Home');
  }

  renderChart() {
    if (this.state.data.length === 0) this.setState({ data: getMonthlyData(this.props.user.form, parseInt(this.state.selected, 10)) });
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