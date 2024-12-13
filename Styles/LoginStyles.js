// styles.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  headerTextStyle: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  mainView: {
    marginTop: 50,
    alignItems: 'center',
  },
  maskedContainer: {
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  maskedText: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  gradientText: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradientTextOverlay: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'transparent',
  },
  safeAreaContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  subHeadingFont: {
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 12,
    color: 'red',
  },
  textInputView: {
    marginTop: 50,
    width: '80%',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 5,
  },
  emailTextInput: {
    color: 'gray',
    width: '100%',
  },
  emailViewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#e0e0e0',
    paddingVertical: 5,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  Icon: {
    marginRight: 5,
  },
  signedInCategoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  pressableContainer: {
    width: '100%',
    backgroundColor: '#fd5c63',
    borderRadius: 6,
    marginTop: 30,
    padding: 15,
    alignSelf: 'center',
  },
  loginButtonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
  },
  pressablRegisterContainer: {
    marginTop: 15,
  },
  registerText: {
    textAlign: 'center',
    color: 'gray',
    fontWeight: 'bold',
    fontSize: 16,
  },
  checkboxTouchable: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: 'gray',
    marginRight: 8,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#fd5c63',
    borderColor: '#fd5c63',
  },
  checkboxTick: {
    position: 'absolute',
  },
  checkboxLabel: {
    color: 'gray',
  },
});
