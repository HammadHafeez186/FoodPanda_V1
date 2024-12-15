import { StyleSheet } from 'react-native'

const PRIMARY_COLOR = '#FF2B85'

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    borderRadius: 100,
    overflow: 'hidden',
    maxWidth: '100%',
  },
  image: {
    objectFit: 'cover',
    paddingTop: 0,
  },
  noImage: {
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: PRIMARY_COLOR,
    borderRadius: 5,
  },
  button: {
    marginTop: 10,
    padding: 10,
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
})

export default styles