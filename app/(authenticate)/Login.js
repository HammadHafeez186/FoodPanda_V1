import React, { useState } from 'react'
import {SafeAreaView, StyleSheet, Text, View, Pressable, TextInput, TouchableOpacity} from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import AntDesign from '@expo/vector-icons/AntDesign'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'expo-router'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      alert('Login successful!')
      router.push("../../MainPage") // Navigate to the index page
    } catch (error) {
      alert(error.message)
    }
  }


  return (
      <SafeAreaView style={styles.safeAreaContainer}>
        <View style={styles.mainView}>
          <Text style={styles.headerTextStyle}>Food App</Text>
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
            <Text>Keep me Logged in</Text>
            <Text>Forgot Password?</Text>
          </View>

          <TouchableOpacity style={styles.pressableContainer} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Log In</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push("../Register")} style={styles.pressablRegisterContainer}>
            <Text style={styles.registerText}>Don't have an Account? Sign up</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
  )
}

export default Login

const styles = StyleSheet.create({
  headerTextStyle: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  safeAreaContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  mainView: {
    marginTop: 50,
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
    width: '80%',
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
})
