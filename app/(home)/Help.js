import React, { useState } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, ScrollView, Linking } from "react-native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { styles } from "../../Styles/HelpStyles";  // Import styles from external file
import { useRouter } from "expo-router";
import helpSections from "../../data/helpSections.json";  // Import the JSON file

const HelpPage = () => {
  const [expandedSection, setExpandedSection] = useState(null);
  const router = useRouter();

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
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
          <Text style={[styles.headerText, styles.backText]}>Back</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.contentContainer}>
          <Text style={[styles.headerText, styles.centeredText]}>
            Help Center
          </Text>
          <Text style={[styles.subHeaderText, styles.centeredText]}>
            Answers to your most common questions
          </Text>

          {helpSections.map((section, index) => (
            <View 
              key={index} 
              style={styles.sectionContainer}
            >
              <TouchableOpacity 
                onPress={() => toggleSection(index)}
                style={[styles.sectionHeader, { borderBottomWidth: expandedSection === index ? 1 : 0 }]}
              >
                <Text style={styles.tipTitle}>{section.title}</Text>
                <Text style={styles.expandButton}>
                  {expandedSection === index ? '−' : '+'}
                </Text>
              </TouchableOpacity>

              {expandedSection === index && (
                <View style={styles.sectionContent}>
                  <Text style={styles.tipDescription}>{section.content}</Text>
                </View>
              )}
            </View>
          ))}

          <View style={styles.contactContainer}>
            <Text style={styles.tipTitle}>Need More Help?</Text>
            <Text style={[styles.tipDescription, styles.centeredText]}>
              Contact our support team for further assistance
            </Text>
            <TouchableOpacity 
              onPress={handleContactSupport}
              style={styles.contactButton}
            >
              <Text style={styles.contactButtonText}>Contact Support</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HelpPage;
