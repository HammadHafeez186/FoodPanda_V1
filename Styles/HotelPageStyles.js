import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    marginRight: 16,
  },
  restaurantName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  bannerImage: {
    width: '100%',
    height: 200,
  },
  infoContainer: {
    padding: 16,
  },
  cuisineText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  ratingText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginLeft: 4,
  },
  starIcon: {
    color: '#FFD700',
  },
  discountBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF0F4',
    padding: 16,
    marginTop: 8,
  },
  discountText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF2B85',
    marginLeft: 8,
  },
  menuContainer: {
    paddingBottom: 80, // Add padding to account for the View Cart button
  },
  viewCartButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
  },
  viewCartButton: {
    backgroundColor: '#FF2B85',
    padding: 16,
    alignItems: 'center',
  },
  viewCartText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default styles;

