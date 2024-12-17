// PasswordResetScreen.js
import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  SafeAreaView,
  ActivityIndicator
} from 'react-native';
import { supabase } from '../../lib/supabase';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function PasswordResetScreen() {
  const [step, setStep] = useState('verify-otp'); // 'verify-otp' or 'reset-password'
  const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);
  const router = useRouter();
  const { email } = useLocalSearchParams();

  // Handle OTP input changes
  const handleOtpChange = (index, value) => {
    if (!/[0-9]/.test(value) && value !== '') return;
    
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);

    if (value !== '' && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, text) => {
    if (!text && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const verifyOTP = async () => {
    try {
      setLoading(true);
      
      const otp = otpValues.join('');
      if (otp.length !== 6) {
        Alert.alert('Error', 'Please enter the complete 6-digit OTP');
        return;
      }

      // Verify OTP
      const { error } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: 'recovery'
      });

      if (error) throw error;

      // Move to password reset step
      setStep('reset-password');

    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async () => {
    try {
      setLoading(true);

      if (password.length < 8) {
        Alert.alert('Error', 'Password must be at least 8 characters long');
        return;
      }

      if (password !== confirmPassword) {
        Alert.alert('Error', 'Passwords do not match');
        return;
      }

      const { error } = await supabase.auth.updateUser({
        password: password
      });

      if (error) throw error;

      Alert.alert(
        'Success',
        'Password has been reset successfully',
        [{ text: 'OK', onPress: () => router.replace('../Login') }]
      );

    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const renderOTPVerification = () => (
    <>
      <Text style={styles.headerText}>Verify OTP</Text>
      <Text style={styles.subHeaderText}>
        Enter the OTP code sent to {email}
      </Text>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Enter OTP Code</Text>
        <View style={styles.otpContainer}>
          {otpValues.map((value, index) => (
            <TextInput
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              style={styles.otpInput}
              maxLength={1}
              value={value}
              onChangeText={(text) => handleOtpChange(index, text)}
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === 'Backspace') {
                  handleKeyDown(index, value);
                }
              }}
              keyboardType="number-pad"
            />
          ))}
        </View>
      </View>

      <TouchableOpacity 
        style={[styles.resetButton, loading && styles.buttonDisabled]}
        onPress={verifyOTP}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.resetButtonText}>Verify OTP</Text>
        )}
      </TouchableOpacity>
    </>
  );

  const renderPasswordReset = () => (
    <>
      <Text style={styles.headerText}>Reset Password</Text>
      <Text style={styles.subHeaderText}>
        Create a new password for your account
      </Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>New Password</Text>
        <View style={styles.passwordContainer}>
          <MaterialIcons
            style={styles.icon}
            name="lock"
            size={24}
            color="gray"
          />
          <TextInput
            style={styles.passwordInput}
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
            placeholder="Enter new password"
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <MaterialIcons
              name={showPassword ? 'visibility-off' : 'visibility'}
              size={24}
              color="gray"
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Confirm Password</Text>
        <View style={styles.passwordContainer}>
          <MaterialIcons
            style={styles.icon}
            name="lock"
            size={24}
            color="gray"
          />
          <TextInput
            style={styles.passwordInput}
            secureTextEntry={!showPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm new password"
          />
        </View>
      </View>

      <TouchableOpacity 
        style={[styles.resetButton, loading && styles.buttonDisabled]}
        onPress={resetPassword}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.resetButtonText}>Reset Password</Text>
        )}
      </TouchableOpacity>
    </>
  );

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => {
          if (step === 'reset-password') {
            setStep('verify-otp');
          } else {
            router.back();
          }
        }}
      >
        <AntDesign name="arrowleft" size={24} color="black" />
      </TouchableOpacity>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.content}>
          {step === 'verify-otp' ? renderOTPVerification() : renderPasswordReset()}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backButton: {
    padding: 16,
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subHeaderText: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 30,
    lineHeight: 22,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
    fontWeight: '500',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  otpInput: {
    width: 45,
    height: 45,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 20,
    backgroundColor: '#f9f9f9',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 12,
  },
  icon: {
    marginRight: 8,
  },
  passwordInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  resetButton: {
    backgroundColor: '#FF2B85',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});