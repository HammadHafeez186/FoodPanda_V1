import React, { useState } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, ScrollView, Linking } from "react-native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { styles } from "../../Styles/orderStyles";
import { useRouter } from "expo-router";

const HelpPage = () => {
  const [expandedSection, setExpandedSection] = useState(null);
  const router = useRouter();

  const helpSections = [
    {
      title: 'How to Order',
      content: 'Browse restaurants, select your items, customize your order, and checkout. You can add items to cart, modify quantities, and choose delivery or pickup options.'
    },
    {
      title: 'Tracking Your Order',
      content: 'Once your order is placed, you can track its status in real-time. Statuses include: Preparing, Out for Delivery, and Delivered. You\'ll receive notifications at each stage.'
    },
    {
      title: 'Payment Methods',
      content: 'We accept credit cards, debit cards, Apple Pay, Google Pay, and PayPal. You can save multiple payment methods in your account for quick checkout.'
    },
    {
      title: 'Dietary Restrictions',
      content: 'Easily filter restaurants and menu items based on dietary needs like vegetarian, vegan, gluten-free, and more. Each restaurant provides detailed ingredient information.'
    },
    {
      title: 'Cancellation & Refunds',
      content: 'You can cancel an order within 5 minutes of placing it. After that, contact customer support. Refunds are processed within 3-5 business days to your original payment method.'
    }
  ];

  const toggleSection = (index) => {
    setExpandedSection(expandedSection === index ? null : index);
  };

  const handleContactSupport = () => {
    const supportEmail = 'fa22-bcs-186@cuilahore.edu.pk';
    const subject = 'Help Ticket - Support Request';
    const body = 'Please describe your issue in detail:\n\n';

    const emailUrl = `mailto:${supportEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    Linking.canOpenURL(emailUrl)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(emailUrl);
        } else {
          console.log("Can't handle email URL");
          // Optionally, show an alert that email app couldn't be opened
        }
      })
      .catch((err) => console.error('An error occurred', err));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => router.back()} 
          style={{ flexDirection: 'row', alignItems: 'center' }}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
          <Text style={[styles.headerText, { marginLeft: 10 }]}>Back</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={{ flex: 1 }}>
        <View style={{ padding: 15 }}>
          <Text style={[styles.headerText, { marginBottom: 10, textAlign: 'center' }]}>
            Help Center
          </Text>
          <Text style={[styles.subHeaderText, { textAlign: 'center', marginBottom: 20 }]}>
            Answers to your most common questions
          </Text>

          {helpSections.map((section, index) => (
            <View 
              key={index} 
              style={{
                backgroundColor: 'white',
                borderRadius: 10,
                marginBottom: 10,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3
              }}
            >
              <TouchableOpacity 
                onPress={() => toggleSection(index)}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: 15,
                  borderBottomWidth: expandedSection === index ? 1 : 0,
                  borderBottomColor: '#f0f0f0'
                }}
              >
                <Text style={styles.tipTitle}>{section.title}</Text>
                <Text style={{ color: '#fc8019' }}>
                  {expandedSection === index ? '−' : '+'}
                </Text>
              </TouchableOpacity>

              {expandedSection === index && (
                <View style={{ padding: 15 }}>
                  <Text style={styles.tipDescription}>{section.content}</Text>
                </View>
              )}
            </View>
          ))}

          <View style={{
            backgroundColor: 'white',
            borderRadius: 10,
            padding: 15,
            alignItems: 'center',
            marginTop: 15,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3
          }}>
            <Text style={styles.tipTitle}>Need More Help?</Text>
            <Text style={[styles.tipDescription, { textAlign: 'center', marginVertical: 10 }]}>
              Contact our support team for further assistance
            </Text>
            <TouchableOpacity 
              onPress={handleContactSupport}
              style={{
                backgroundColor: '#fc8019',
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 8
              }}
            >
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Contact Support</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HelpPage;