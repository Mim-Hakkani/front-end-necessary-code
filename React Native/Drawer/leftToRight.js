import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Modal, Pressable, Animated, StyleSheet } from 'react-native';

const LefttoRight = () => {
  const [profileModal, setProfileModal] = useState(false);
  const slideAnim = useRef(new Animated.Value(1000)).current; // Initial position off-screen (right)

  useEffect(() => {
    if (profileModal) {
      Animated.timing(slideAnim, {
        toValue: 0, // Final position
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 1000, // Off-screen position
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [profileModal]);

  const handleOpenProfileModal = () => {
    setProfileModal(true);
  };

  const handleCloseProfileModal = () => {
    setProfileModal(false);
  };

  return (
    <View style={styles.container}>
      <Text onPress={handleOpenProfileModal} style={styles.openButton}>Kul ja Simsim</Text>
      <Modal
        transparent={true}
        visible={profileModal}
        onRequestClose={handleCloseProfileModal}
      >
        <View style={styles.modalBackdrop}>
          <Pressable
            style={styles.backdrop}
            onPress={handleCloseProfileModal}
          />
          <Animated.View style={[styles.modalView, { transform: [{ translateX: slideAnim }] }]}>
            <View style={styles.modalContent}>
              <Text>Modal Content Goes Here</Text>
            </View>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  openButton: {
    fontSize: 18,
    color: 'blue',
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '75%',
    height: '100%',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0, // Start at the right
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalContent: {
    backgroundColor: '#F5F5F5',
    flex: 1,
    padding: 20,
  },
});

export default LefttoRight;

