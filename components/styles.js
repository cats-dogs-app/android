import { StyleSheet } from 'react-native';

export default StyleSheet.create({

  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },

  darkGrayBackground: { backgroundColor: '#666666' },
  grayBackground: { backgroundColor: '#dadada' },
  greenBackground: { backgroundColor: '#00b738' },
  whiteBackground: { backgroundColor: '#FFF' },

  darkGray: { color: '#666666' },
  gray: { color: '#dadada' },
  green: { color: '#00b738' },
  black: { color: '#000' },
  white: { color: '#fff' },

  footerTab: {
    width: 30,
    height: 30,
  },

  button: {
    backgroundColor: '#00b738',
    marginLeft: 16,
    marginRight: 16,
    marginTop: 8
  },

  disabledButton: {
    backgroundColor: '#dadada',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 8
  },
  
  marginedContent: {
    marginLeft: 24,
    marginRight: 24,
    marginTop: 24
  },
  
  marginedContent2: {
    marginLeft: 24,
    marginRight: 24,
    height: 48,
    marginTop: 12,
    backgroundColor: '#FFF',
  },
  
  marginedTop12: {
    marginTop: 12
  },
  
  timeLineMargin: {
    marginLeft: 48
  },

  input: {
    color: '#666666',
    fontSize: 18,
  },

  roundButton: {
    borderWidth:1,
    borderColor: '#fff',
    alignItems:'center',
    justifyContent:'center',
    width:80,
    height:80,
    borderRadius:50,
  },

  centered: {
    flex: 1,
    marginLeft: 'auto',
    marginRight: 'auto'
  },

  addButton: {
    borderWidth:1,
    borderColor: '#fff',
    alignItems:'center',
    justifyContent:'center',
    width:45,
    height:45,
    borderRadius:30,
    marginTop: 16,
    marginRight: 16,
    marginLeft: 'auto',
  }

});
