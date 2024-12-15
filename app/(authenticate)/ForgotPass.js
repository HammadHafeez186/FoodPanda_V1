import React, { useState } from 'react'
import { Text, View, SafeAreaView, TextInput, TouchableOpacity, Alert } from 'react-native'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'expo-router'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import AntDesign from '@expo/vector-icons/AntDesign'
import styles from '../../Styles/ForgotPassStyles' // Adjust the path as necessary

const ForgotPass = () => {
  const [email, setEmail] = useState('')
  const router = useRouter()

  const handlePasswordReset = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address')
      return
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email)
      if (error) {
        Alert.alert('Reset Failed', error.message)
        return
      }

      Alert.alert(
        'Password Reset',
        'A password reset link has been sent to your email. Please check your inbox and follow the instructions.',
        [{ text: 'OK', onPress: () => router.push('../Login') }]
      )
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred. Please try again.')
    }
  }

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => router.back()}
      >
        <AntDesign name="arrowleft" size={24} color="black" />
      </TouchableOpacity>

      <View style={styles.mainContainer}>
        <Text style={styles.headerText}>Forgot Password</Text>
        <Text style={styles.subHeaderText}>
          Enter the email associated with your account and we'll send an email with instructions to reset your password.
        </Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <View style={styles.emailViewContainer}>
            <MaterialIcons 
              style={styles.icon} 
              name="email" 
              size={24} 
              color="gray" 
            />
            <TextInput
              style={styles.emailInput}
              placeholder="Enter your registered email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        </View>

        <TouchableOpacity 
          style={styles.resetButton} 
          onPress={handlePasswordReset}
        >
          <Text style={styles.resetButtonText}>Send Reset Link</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default ForgotPass
