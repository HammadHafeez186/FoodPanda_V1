import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from "../../lib/supabase";
import { useRouter } from 'expo-router';
import { styles } from '../../Styles/AddAddressStyles'; // Import styles from external file

const AddAddressScreen = () => {
    const router = useRouter();
    const [address, setAddress] = useState({
        street: '',
        apartment: '',
        city: '',
        state: '',
        postalCode: '',
        type: 'Home',
        nickname: '',
        instructions: ''
    });

    const [loading, setLoading] = useState(false);

    const addressTypes = [
        { label: 'Home', icon: 'home' },
        { label: 'Work', icon: 'briefcase' },
        { label: 'Other', icon: 'location' }
    ];

    const handleSaveAddress = async () => {
        if (!address.street || !address.city) {
            Alert.alert('Incomplete Address', 'Please fill in at least street and city');
            return;
        }

        setLoading(true);

        try {
            const { data: { user }, error: userError } = await supabase.auth.getUser();

            if (userError || !user) {
                Alert.alert('Error', 'Please log in to save an address');
                setLoading(false);
                return;
            }

            const { data, error } = await supabase
                .from('user_addresses')
                .insert({
                    user_id: user.id,
                    street: address.street,
                    apartment: address.apartment,
                    city: address.city,
                    state: address.state,
                    postal_code: address.postalCode,
                    type: address.type,
                    nickname: address.nickname,
                    delivery_instructions: address.instructions
                })
                .select();

            if (error) {
                console.error('Error saving address:', error);
                Alert.alert('Error', 'Failed to save address');
                setLoading(false);
                return;
            }

            Alert.alert('Success', 'Address saved successfully', [{ 
                text: 'OK', 
                onPress: () => {
                    router.replace('./MainPage');
                }
            }]);
        } catch (error) {
            console.error('Unexpected error:', error);
            Alert.alert('Error', 'An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView 
            style={styles.container} 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
        >
            <ScrollView 
                contentContainerStyle={styles.scrollContainer}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.headerContainer}>
                    <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
                        <Ionicons name="close" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Add New Address</Text>
                </View>

                <View style={styles.formContainer}>
                    <Text style={styles.label}>Street Address</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter street address"
                        value={address.street}
                        onChangeText={(text) => setAddress({ ...address, street: text })}
                    />

                    <Text style={styles.label}>Apartment/Unit (Optional)</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Apartment, suite, unit, etc."
                        value={address.apartment}
                        onChangeText={(text) => setAddress({ ...address, apartment: text })}
                    />

                    <Text style={styles.label}>City</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter city"
                        value={address.city}
                        onChangeText={(text) => setAddress({ ...address, city: text })}
                    />

                    <Text style={styles.label}>State</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter state"
                        value={address.state}
                        onChangeText={(text) => setAddress({ ...address, state: text })}
                    />

                    <Text style={styles.label}>Postal Code</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter postal code"
                        value={address.postalCode}
                        onChangeText={(text) => setAddress({ ...address, postalCode: text })}
                        keyboardType="numeric"
                    />

                    <Text style={styles.label}>Address Type</Text>
                    <View style={styles.typeContainer}>
                        {addressTypes.map((type) => (
                            <TouchableOpacity
                                key={type.label}
                                style={[
                                    styles.typeButton,
                                    address.type === type.label && styles.selectedTypeButton
                                ]}
                                onPress={() => setAddress({ ...address, type: type.label })}
                            >
                                <Ionicons
                                    name={type.icon}
                                    size={20}
                                    color={address.type === type.label ? 'white' : 'black'}
                                />
                                <Text
                                    style={[
                                        styles.typeButtonText,
                                        address.type === type.label && styles.selectedTypeButtonText
                                    ]}
                                >
                                    {type.label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <Text style={styles.label}>Address Nickname (Optional)</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="e.g. Home, Work, Mom's House"
                        value={address.nickname}
                        onChangeText={(text) => setAddress({ ...address, nickname: text })}
                    />

                    <Text style={styles.label}>Delivery Instructions (Optional)</Text>
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        placeholder="e.g. Leave at door, call when arriving"
                        value={address.instructions}
                        onChangeText={(text) => setAddress({ ...address, instructions: text })}
                        multiline
                        numberOfLines={4}
                    />

                    <TouchableOpacity
                        style={styles.saveButton}
                        onPress={handleSaveAddress}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator size="small" color="white" />
                        ) : (
                            <Text style={styles.saveButtonText}>Save Address</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default AddAddressScreen;
