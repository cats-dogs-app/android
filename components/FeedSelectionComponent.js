import { Button, Col, Form, Grid, Input, Item, Label, Picker, Text, View, Right } from 'native-base';
import React, { Component } from 'react';
import { Modal, TouchableOpacity } from 'react-native'; // CHANGE_HERE
import { connect } from 'react-redux';
import styles from './styles';
import { _ } from 'lodash';

class FeedSelectionComponent extends Component {
	
	constructor(props) {
		super(props);
		this.state = { 
			selectedFeed: 'key1',
			visibleModal: false,
			modalField: '',
			amount: 0
		};
	}
	
	onValueChange(value) {
		this.setState({
			selectedFeed: value
		});
	}
	
	renderModalContent() {
		const selectedFeed = this.props.user.feed[this.state.selectedFeed];
		const calories = (this.state.amount/100)*_.values(selectedFeed)[0]; 
		// Kalori hesabı
		return (
			<Form style={{margin: 30}}>
				<Label style={{marginBottom: 8}}>
					{this.state.selectedFeed}
				</Label>
				<Label style={{marginBottom: 8}}>
					{calories}
				</Label>
				<Item rounded>
					<Input 
						defaultValue={this.state.amount}
						onChangeText={text => this.setState({amount: text})}
						keyboardType="number-pad"/>
				</Item>
				<Button
					onPress={() => this.setState({
						visibleModal: false
					})}
					style={[styles.greenBackground, {marginTop: 12}]}
				>
					<Text>Kaydet</Text>
				</Button>
			</Form>
		)
	}

	renderFeeds() {
		let { feed } = this.props.user;
		return _.map(feed, (value, key) => <Picker.Item 
				label={key}
				value={key}/>
		)
  }
			
	render() {
		return (
			<Grid style={{padding: 4}}>
				<Col style={{ marginLeft: 30, justifyContent: 'center', flex: 1}}>
					<View style={{ width:140, borderRadius: 25, overflow: 'hidden'}}>
						<Picker
							style={[{height:30}, styles.greenBackground, styles.white]}
							mode="dropdown"
							selectedValue={this.state.selectedFeed}
							onValueChange={this.onValueChange.bind(this)}
							>
							{this.renderFeeds()}
						</Picker>
					</View>
				</Col>
				<Col>
					<Right>
						<TouchableOpacity
							style={[styles.roundButton, styles.greenBackground]}
							onPress={() => this.setState({
								visibleModal: true,
								modalField: 'Mama Miktarı',
								modalLabel: this.state.amount,
							})}>
							<Text style={styles.white}>{this.state.amount} gram</Text>
						</TouchableOpacity>
					</Right>
				</Col>
				<Modal
					transparent={false}
					visible={this.state.visibleModal}
					animationType="slide">
					{this.renderModalContent()}
				</Modal>
			</Grid>
			);
		}
}
			
const mapStateToProps = state => {
	const user = state.user;
	return { user };
};

const mapDispatchToProps = dispatch => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedSelectionComponent);