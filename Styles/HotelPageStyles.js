import { StyleSheet } from 'react-native';

const hotelPageStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  headingsContainer: {
    flexDirection:'row',
    alignItems:'center',
    padding:10,
    gap:10
  },
  restaurantName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  viewCartButton: {
    backgroundColor: '#FF2B85',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  viewCartText: {
    color: 'white',
    fontWeight: 'bold',
  },  pressableContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
},
recommendedTagStyle: {
    fontSize: 18,
    fontWeight: 'bold',
}, pressableContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    marginHorizontal: 15,
},
nameText: {
    fontSize: 18,
    fontWeight: 'bold',
},
priceText: {
    fontSize: 16,
    color: 'gray',
},
starRatingText: {
    marginVertical: 5,
},
itemDescriptionText: {
    color: 'gray',
    width: 200,
},
pressableImageContainer: {
    marginRight: 10,
},
imageStyle: {
    width: 120,
    height: 120,
    borderRadius: 8,
},
pressableButtonContainer: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
},
addButtonText: {
    textAlign: 'center',
    color: '#FF2B85',
    fontWeight: 'bold',
},
quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    right: 10,
    bottom: 10,
    backgroundColor: '#FF2B85',
    borderRadius: 5,
},
quantityButton: {
    padding: 5,
},
quantityButtonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
},
quantityText: {
    fontSize: 18,
    marginHorizontal: 10,
    color: 'white',
},
});

export default hotelPageStyles;