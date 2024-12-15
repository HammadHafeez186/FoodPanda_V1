import React, { useState, useEffect, useRef } from 'react';
import { 
  SafeAreaView, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  Image, 
  ScrollView,
  Keyboard,
  Platform,
  Dimensions
} from 'react-native';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from "../../Styles/LoginStyles";

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const router = useRouter();
  const scrollViewRef = useRef(null);

  useEffect(() => {
    const checkPreviousLogin = async () => {
      try {
        const storedKeepLoggedIn = await AsyncStorage.getItem('keepLoggedIn');
        const storedSession = await AsyncStorage.getItem('userSession');

        if (storedKeepLoggedIn === 'true' && storedSession) {
          const { data } = await supabase.auth.getSession();

          if (data.session) {
            router.push("../../MainPage");
          } else {
            await AsyncStorage.removeItem('userSession');
            await AsyncStorage.removeItem('keepLoggedIn');
          }
        }
      } catch (error) {
        console.error('Error checking previous login:', error);
      }
    };

    checkPreviousLogin();

    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      handleKeyboardShow
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      handleKeyboardHide
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleKeyboardShow = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: SCREEN_HEIGHT * 0.3, animated: true });
    }
  };

  const handleKeyboardHide = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
  };

  const handleLogin = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) throw error;

      if (keepLoggedIn) {
        await AsyncStorage.setItem('keepLoggedIn', 'true');
        await AsyncStorage.setItem('userSession', JSON.stringify(data.session));
      } else {
        await AsyncStorage.removeItem('keepLoggedIn');
        await AsyncStorage.removeItem('userSession');
      }

      alert('Login successful!');
      router.push("../../MainPage");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <ScrollView 
        ref={scrollViewRef}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.logoContainer}>
          <Image 
            source={require('../../images/loginLogo.png')}
            style={styles.logoImage}
          />
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.subHeadingFont}>Login To Your Account</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputWrapper}>
              <MaterialIcons name="email" size={24} color="gray" style={styles.icon} />
              <TextInput
                style={styles.textInput}
                placeholder="Enter your email"
                placeholderTextColor="gray"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.inputWrapper}>
              <AntDesign name="lock1" size={24} color="gray" style={styles.icon} />
              <TextInput
                style={styles.textInput}
                placeholder="Enter your password"
                placeholderTextColor="gray"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>
          </View>

          <View style={styles.signedInCategoryContainer}>
            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => setKeepLoggedIn(!keepLoggedIn)}
            >
              <View style={[styles.checkbox, keepLoggedIn && styles.checkboxChecked]}>
                {keepLoggedIn && (
                  <AntDesign name="check" size={16} color="white" />
                )}
              </View>
              <Text style={styles.checkboxLabel}>Keep me Logged in</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push("../ForgotPass")}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Log In</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.signUpContainer} onPress={() => router.push("../Register")}>
            <Text style={styles.signUpText}>Don't have an Account? Sign up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;

