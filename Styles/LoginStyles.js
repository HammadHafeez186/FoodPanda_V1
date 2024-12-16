import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const logoSize = width * 0.5;

export default StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
    flexGrow: 1,
  },
  contentContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: height * 0.05,
    paddingBottom: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logoImage: {
    width: logoSize * 2,
    height: logoSize * 0.3,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  formContainer: {
    width: '85%',
  },
  subHeadingFont: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#FF2B85',
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 5,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },
  signedInCategoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  checkboxContainer: {
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
    backgroundColor: '#FF2B85',
    borderColor: '#FF2B85',
  },
  checkboxLabel: {
    color: 'gray',
    fontSize: 14,
  },
  forgotPasswordText: {
    color: 'black',
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: '#FF2B85',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signUpContainer: {
    marginTop: 15,
  },
  signUpText: {
    color: 'gray',
    fontSize: 16,
    textAlign: 'center',
  },
});

