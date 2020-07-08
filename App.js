import * as Font from 'expo-font';
import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { LoginPage, RegisterPage, WaitingPage, FeedSelectionPage } from './components/pages';
import reducers from './redux/reducers';

export const AppStack = createStackNavigator(
  {
    Login: { screen: LoginPage },
    Register: { screen: RegisterPage },
    FeedSelection: { screen: FeedSelectionPage },
  },
  {
    initialRouteName: 'Login'
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
        <AppContainer />
      </Provider>
    )
  }
}