import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View, TextInput, TouchableOpacity,} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaskedView from '@react-native-masked-view/masked-view';
import styles from "../../Styles/LoginStyles"; // Adjust the path as necessary

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const router = useRouter();

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
  }, []);

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

  const StyledAppName = () => (
    <MaskedView
      maskElement={
        <View style={styles.maskedContainer}>
          <Text style={styles.maskedText}>Bite Buddy</Text>
        </View>
      }
    >
      <LinearGradient
        colors={['#fd5c63', '#ff8c69', '#ff5f3f']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradientText}
      >
        <Text style={styles.gradientTextOverlay}>Bite Buddy</Text>
      </LinearGradient>
    </MaskedView>
  );

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.mainView}>
        <StyledAppName />
      </View>

      <View>
        <Text style={styles.subHeadingFont}>Login To Your Account</Text>
      </View>

      <View style={styles.textInputView}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <View style={styles.emailViewContainer}>
            <MaterialIcons style={styles.Icon} name="email" size={24} color="gray" />
            <TextInput
              style={styles.emailTextInput}
              placeholder="Enter your Email"
              value={email}
              onChangeText={setEmail}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.emailViewContainer}>
            <AntDesign style={styles.Icon} name="lock1" size={24} color="black" />
            <TextInput
              style={styles.emailTextInput}
              placeholder="Enter your Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>
        </View>

        <View style={styles.signedInCategoryContainer}>
          <TouchableOpacity
            style={styles.checkboxTouchable}
            onPress={() => setKeepLoggedIn(!keepLoggedIn)}
          >
            <View style={[styles.checkbox, keepLoggedIn && styles.checkboxChecked]}>
              {keepLoggedIn && (
                <AntDesign name="check" size={16} color="white" style={styles.checkboxTick} />
              )}
            </View>
            <Text style={styles.checkboxLabel}>Keep me Logged in</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push("../ForgotPass")}>
            <Text>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.pressableContainer} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Log In</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("../Register")} style={styles.pressablRegisterContainer}>
          <Text style={styles.registerText}>Don't have an Account? Sign up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Login;
