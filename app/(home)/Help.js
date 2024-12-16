import React, { useState, useEffect, useRef } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, FlatList, Linking, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../../Styles/HelpStyles";  // Import styles from external file
import { useRouter } from "expo-router";
import { supabase } from '../../lib/supabase';  // Import the Supabase client

const HelpPage = () => {
  const [expandedSection, setExpandedSection] = useState(null);
  const [faqItems, setFaqItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const dataLoaded = useRef(false);

  useEffect(() => {
    if (!dataLoaded.current) {
      fetchFaqItems();
    }
  }, []);

  const fetchFaqItems = async () => {
    try {
      const { data, error } = await supabase
        .from('faq_items')
        .select('*')
        .order('id');

      if (error) throw error;

      setFaqItems(data);
      setIsLoading(false);
      dataLoaded.current = true;
    } catch (error) {
      console.error('Error fetching FAQ items:', error);
      setError('Failed to load FAQ items. Please try again later.');
      setIsLoading(false);
    }
  };

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

  const renderFaqItem = ({ item, index }) => (
    <View style={styles.sectionContainer}>
      <TouchableOpacity 
        onPress={() => toggleSection(index)}
        style={[styles.sectionHeader, { borderBottomWidth: expandedSection === index ? 1 : 0 }]}
      >
        <Text style={styles.tipTitle}>{item.title}</Text>
        <Text style={styles.expandButton}>
          {expandedSection === index ? '−' : '+'}
        </Text>
      </TouchableOpacity>

      {expandedSection === index && (
        <View style={styles.sectionContent}>
          <Text style={styles.tipDescription}>{item.content}</Text>
        </View>
      )}
    </View>
  );

  if (isLoading) {
    return (
      <SafeAreaView style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading FAQ...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={[styles.container, styles.centerContent]}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity onPress={fetchFaqItems} style={styles.retryButton}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => router.back()} 
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
          <Text style={[styles.headerText, styles.backText]}>Back</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        ListHeaderComponent={
          <>
            <Text style={[styles.headerText, styles.centeredText]}>
              Help Center
            </Text>
            <Text style={[styles.subHeaderText, styles.centeredText]}>
              Answers to your most common questions
            </Text>
          </>
        }
        data={faqItems}
        renderItem={renderFaqItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.contentContainer}
        ListFooterComponent={
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
        }
      />
    </SafeAreaView>
  );
};

export default HelpPage;

