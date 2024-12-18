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
import { useRouter, useLocalSearchParams, Link } from 'expo-router';
import passwordStyles from "../../Styles/reset-passwordStyles"

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

    if (index === 5 && value !== '') {
      const otp = newOtpValues.join('');
      if (otp.length === 6) {
        verifyOTP(otp);
      }
    }
  };

  const handleKeyDown = (index, text) => {
    if (!text && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const verifyOTP = async (otp) => {
    try {
      setLoading(true);

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
        [{ text: 'OK', onPress: () => router.replace('/') }]
      );

    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const renderOTPVerification = () => (
    <>
      <Text style={passwordStyles.headerText}>Verify OTP</Text>
      <Text style={passwordStyles.subHeaderText}>
        Enter the OTP code sent to {email}
      </Text>

      <View style={passwordStyles.inputContainer}>
        <Text style={passwordStyles.label}>Enter OTP Code</Text>
        <View style={passwordStyles.otpContainer}>
          {otpValues.map((value, index) => (
            <TextInput
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              style={passwordStyles.otpInput}
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
      {loading && (
        <View style={password.loadingContainer}>
          <ActivityIndicator color="#FF2B85" />
          <Text style={password.loadingText}>Verifying OTP...</Text>
        </View>
      )}

    </>
  );

  const renderPasswordReset = () => (
    <>
      <Text style={passwordStyles.headerText}>Reset Password</Text>
      <Text style={passwordStyles.subHeaderText}>
        Create a new password for your account
      </Text>

      <View style={passwordStyles.inputContainer}>
        <Text style={passwordStyles.label}>New Password</Text>
        <View style={passwordStyles.passwordContainer}>
          <MaterialIcons
            style={passwordStyles.icon}
            name="lock"
            size={24}
            color="gray"
          />
          <TextInput
            style={passwordStyles.passwordInput}
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

      <View style={passwordStyles.inputContainer}>
        <Text style={passwordStyles.label}>Confirm Password</Text>
        <View style={passwordStyles.passwordContainer}>
          <MaterialIcons
            style={passwordStyles.icon}
            name="lock"
            size={24}
            color="gray"
          />
          <TextInput
            style={passwordStyles.passwordInput}
            secureTextEntry={!showPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm new password"
          />
        </View>
      </View>

      <TouchableOpacity
        style={[passwordStyles.resetButton, loading && passwordStyles.buttonDisabled]}
        onPress={resetPassword}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={passwordStyles.resetButtonText}>Reset Password</Text>
        )}
      </TouchableOpacity>
    </>
  );

  return (
    <SafeAreaView style={passwordStyles.safeAreaContainer}>
      <TouchableOpacity
        style={passwordStyles.backButton}
        onPress={() => {
          if (step === 'reset-password') {
            setStep('verify-otp');
          } else {
            router.replace('/');
          }
        }}
      >
        <AntDesign name="arrowleft" size={24} color="black" />
      </TouchableOpacity>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={passwordStyles.container}
      >
        <View style={passwordStyles.content}>
          {step === 'verify-otp' ? renderOTPVerification() : renderPasswordReset()}
        </View>
        <View style={passwordStyles.backToLoginContainer}>
          <Link href="/" style={passwordStyles.backToLoginText}>
            Back to Login
          </Link>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
