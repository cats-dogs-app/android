import { Button, Footer, FooterTab, Icon, Text } from 'native-base';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logoutRequest, pushPage } from '../redux/actions';
import styles from './styles';

class FooterComponent extends Component {
  render() {
    return (
      <Footer>
        <FooterTab style={styles.greenBackground}>
        <Button vertical onPress={() => this.props.pushPage({ page: 'AnimalList' })}>
            <Icon style={styles.white} name="cat" />
            <Text style={styles.white}>Kediler</Text>
          </Button><Button vertical onPress={() => this.props.pushPage({page: 'AnimalList'})}>
            <Icon style={styles.white} name="dog" />
            <Text style={styles.white}>Köpekler</Text>
          </Button>
          <Button vertical onPress={() => this.props.logoutRequest()}>
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
    pushPage: content => { dispatch(pushPage(content)) },
  };
};

export default connect(null, mapDispatchToProps)(FooterComponent);