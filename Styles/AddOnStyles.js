import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#FF2B85',
    textAlign: 'center',
  },
  addonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  addonItemSelected: {
    backgroundColor: '#FFE5EE',
    borderColor: '#FF2B85',
    borderWidth: 1,
  },
  addonImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  addonTextContainer: {
    flex: 1,
  },
  addonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  addonPrice: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  },
  doneButton: {
    backgroundColor: '#FF2B85',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  doneButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  },
  placeholderImage: {
    backgroundColor: '#e1e1e1',
  },
});

