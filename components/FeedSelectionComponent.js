import { Button, Col, Form, Grid, Input, Item, Label, Picker, Text, View, Right } from 'native-base';
import React, { Component } from 'react';
import { Modal, TouchableOpacity } from 'react-native'; // CHANGE_HERE
import { connect } from 'react-redux';
import styles from './styles';

class FeedSelectionComponent extends Component {
	
	constructor(props) {
		super(props);
		this.state = { 
			selectedFeed: 'key1',
			visibleModal: false,
			modalField: '',
			amount: 0,
			nextAmount: 0
		};
	}
	
	onValueChange(value) {
		this.setState({
			selectedFeed: value
		});
	}
	
	renderModalContent() {  //CHANGE_HERE
		return (
			<Form>
				<Item fixedLabel>
					<Label>{this.state.selectedFeed}</Label>
					<Input 
						defaultValue={this.state.amount}
						onChangeText={text => this.setState({nextAmount: text})}
						keyboardType="number-pad"/>
				</Item>
				<Button
					onPress={() => this.setState({
						visibleModal: false,
						amount: this.state.nextAmount
					})}
					style={styles.greenBackground}
				>
					<Text>Kaydet</Text>
				</Button>
			</Form>
		)
	}

	renderPickerItem(text) {
		return <Picker.Item 
			label={text}
			value={text}/>
	}
			
	render() {
		return (
			<Grid>
				<Col style={{justifyContent: 'center', flex: 1}}>
					<View style={{ borderRadius: 25, overflow: 'hidden'}}>
						<Picker
							style={[styles.greenBackground, styles.white]}
							mode="dropdown"
							selectedValue={this.state.selectedFeed}
							onValueChange={this.onValueChange.bind(this)}
							>
							{this.renderPickerItem("Besin 1")}
							{this.renderPickerItem("Besin 2")}
							{this.renderPickerItem("Besin 3")}
							{this.renderPickerItem("Besin 4")}
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
			
const mapDispatchToProps = dispatch => {
	return {};
};

export default connect(null, mapDispatchToProps)(FeedSelectionComponent);