import React, { useState } from 'react'
import { 
  Text, 
  View, 
  SafeAreaView, 
  TextInput, 
  TouchableOpacity, 
  Alert, 
  KeyboardAvoidingView, 
  ScrollView, 
  Keyboard, 
  TouchableWithoutFeedback, 
  Platform 
} from 'react-native'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'expo-router'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import AntDesign from '@expo/vector-icons/AntDesign'
import styles from '../../Styles/ForgotPassStyles'

const ForgotPass = () => {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handlePasswordReset = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address')
      return
    }

    if (!email.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email address')
      return
    }

    setIsLoading(true)

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email)
      if (error) {
        Alert.alert('Reset Failed', error.message)
        return
      }

      Alert.alert(
        'OTP Sent',
        'An OTP has been sent to your email. Please check your inbox.',
        [{ 
          text: 'OK', 
          onPress: () => router.replace({
            pathname: '/reset-password',
            params: { email }
          })
        }]
      )
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.safeAreaContainer}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={{ flex: 1 }}
        >
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <AntDesign name="arrowleft" size={24} color="black" />
            </TouchableOpacity>

            <View style={styles.mainContainer}>
              <Text style={styles.headerText}>Forgot Password</Text>
              <Text style={styles.subHeaderText}>
                Enter the email associated with your account and we'll send an OTP 
                to reset your password.
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
                    editable={!isLoading}
                  />
                </View>
              </View>

              <TouchableOpacity
                style={[
                  styles.resetButton,
                  isLoading && styles.resetButtonDisabled
                ]}
                onPress={handlePasswordReset}
                disabled={isLoading}
              >
                <Text style={styles.resetButtonText}>
                  {isLoading ? 'Sending...' : 'Send OTP'}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

export default ForgotPass
