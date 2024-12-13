import React, { useState, useEffect } from 'react'
import {
  SafeAreaView, 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { MaterialIcons, AntDesign, FontAwesome } from '@expo/vector-icons'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
import MaskedView from '@react-native-masked-view/masked-view'

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
          const { data, error } = await supabase.auth.getSession();

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

const styles = StyleSheet.create({
  headerTextStyle: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  mainView: {
    marginTop: 50,
    alignItems: 'center',
  },
  maskedContainer: {
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  maskedText: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  gradientText: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradientTextOverlay: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'transparent',
  },
  safeAreaContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  subHeadingFont: {
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 12,
    color: 'red',
  },
  textInputView: {
    marginTop: 50,
    width: '80%',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 5,
  },
  emailTextInput: {
    color: 'gray',
    width: '100%',
  },
  emailViewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#e0e0e0',
    paddingVertical: 5,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  Icon: {
    marginRight: 5,
  },
  signedInCategoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  pressableContainer: {
    width: '100%',
    backgroundColor: '#fd5c63',
    borderRadius: 6,
    marginTop: 30,
    padding: 15,
    alignSelf: 'center',
  },
  loginButtonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
  },
  pressablRegisterContainer: {
    marginTop: 15,
  },
  registerText: {
    textAlign: 'center',
    color: 'gray',
    fontWeight: 'bold',
    fontSize: 16,
  },
  checkboxTouchable: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: 'gray',
    marginRight: 8,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#fd5c63',
    borderColor: '#fd5c63',
  },
  checkboxTick: {
    position: 'absolute',
  },
  checkboxLabel: {
    color: 'gray',
  },
});
