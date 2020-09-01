import { Button, Footer, FooterTab, Icon, Text } from 'native-base';
import { Image } from "react-native";
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logoutRequest, selectionChangeAction} from '../redux/actions';
import styles from './styles';
import { withNavigation } from 'react-navigation';
import tabCat from "../assets/tabCat.png";
import tabDog from "../assets/tabDog.png";

class FooterComponent extends Component {

  componentDidUpdate(prevState){
    const {page} = this.state;
    if (page!=prevState.page) {
      if (page==='list') this.props.navigation.navigate('AnimalList');
      if (page==='logout') this.props.navigation.popToTop();
    }
  }

  render() {
    return (
      <Footer>
        <FooterTab style={styles.greenBackground}>
        <Button vertical 
            onPress={() => {
              this.props.selectionChangeAction({ selection: 'cat' });
              this.setState({ page: 'list'});
            }}
          >
            <Image
              style={styles.footerTab}
              source={tabCat}
            />
            <Text style={styles.white}>Kediler</Text>
          </Button>
          <Button vertical 
            onPress={() => {
              this.props.selectionChangeAction({ selection: 'dog' });
              this.setState({ page: 'list'});
            }}
          >
            <Image
              style={styles.footerTab}
              source={tabDog}
            />
            <Text style={styles.white}>Köpekler</Text>
          </Button>
          <Button vertical 
            onPress={() => {
              this.props.logoutRequest();
              this.setState({ page: 'logout'});
            }}
          >
            <Icon style={styles.white} name="exit" />
            <Text style={styles.white}>Çıkış</Text>
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}



const mapDispatchToProps = dispatch => {
  return {
    logoutRequest: () => { dispatch(logoutRequest()) },
    selectionChangeAction: content => { dispatch(selectionChangeAction(content))}
  };
};

export default withNavigation(connect(null, mapDispatchToProps)(FooterComponent));