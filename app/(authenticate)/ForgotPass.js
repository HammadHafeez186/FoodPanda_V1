import React, { useState } from 'react'
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  TextInput, 
  TouchableOpacity, 
  Alert 
} from 'react-native'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'expo-router'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import AntDesign from '@expo/vector-icons/AntDesign'

const ForgotPass = () => {
  const [email, setEmail] = useState('')
  const router = useRouter()

  const handlePasswordReset = async () => {
    // Basic email validation
    if (!email) {
      Alert.alert('Error', 'Please enter your email address')
      return
    }

    try {
      // Send password reset email using Supabase
      const { error } = await supabase.auth.resetPasswordForEmail(email)

      if (error) {
        // Handle specific error scenarios
        Alert.alert('Reset Failed', error.message)
        return
      }

      // Show success message
      Alert.alert(
        'Password Reset', 
        'A password reset link has been sent to your email. Please check your inbox and follow the instructions.',
        [{ 
          text: 'OK', 
          onPress: () => router.push('../Login') 
        }]
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

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  backButton: {
    marginTop: 20,
    marginLeft: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
    textAlign: 'center',
  },
  subHeaderText: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 30,
    textAlign: 'center',
    lineHeight: 24,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 5,
  },
  emailViewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  icon: {
    marginRight: 10,
  },
  emailInput: {
    flex: 1,
    color: 'gray',
  },
  resetButton: {
    backgroundColor: '#fd5c63',
    borderRadius: 6,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  resetButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
})