import * as Font from 'expo-font';
import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { FeedChartPage, HomePage, LoginPage, RegisterPage, WaitingPage, FeedSelectionPage } from './components/pages';
import reducers from './redux/reducers';
import { NativeRouter, Route } from "react-router-native";

export const AppStack = createStackNavigator(
  {
    Login: { screen: LoginPage },
    Register: { screen: RegisterPage },
    FeedSelection: { screen: FeedSelectionPage },
    FeedChart: { screen: FeedChartPage },
    Home: { screen: HomePage }
  },
  {    
    headerMode: 'none',
    navigationOptions: {
      headerShown: false,
    },
    initialRouteName: 'Home'
  }
);


const AppContainer = createAppContainer(AppStack);

const store = createStore(reducers, applyMiddleware(thunk));

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  componentWillMount = async() => {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
    });
    this.setState({ loading: false });
  }

  render() {
    if (this.state.loading) return (
      <WaitingPage />
    )
    else return (
      <Provider store={store}>
        <NativeRouter >
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/feed" component={FeedSelectionPage} />
          <Route path="/chart" component={FeedChartPage} />
        </NativeRouter>
      </Provider>
    )
  }
}