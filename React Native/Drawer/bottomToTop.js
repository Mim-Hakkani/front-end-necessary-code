import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Modal, Pressable, Animated } from 'react-native';

const TopToBottomModal = () => {
  const [profileModal, setProfileModal] = useState(false);
  const slideAnim = useRef(new Animated.Value(1000)).current; // Initial position off-screen (top)

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
    <View>
      <Text onPress={handleOpenProfileModal}>Kul ja Simsim</Text>
      <Modal
        transparent={true}
        visible={profileModal}
        onRequestClose={handleCloseProfileModal}
      >
        <Pressable
          style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          onPress={handleCloseProfileModal}
        >
          <Animated.View style={[styles.modalView, { transform: [{ translateY: slideAnim }] }]}>
            <View style={{ backgroundColor: '#F5F5F5', height: 260, padding: 20 }}>
              <View style={{ flexDirection: 'row' }}>
                {/* Modal content */}
                <Text>Modal Content Goes Here</Text>
              </View>
            </View>
          </Animated.View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = {
  modalView: {
    width: '100%',
    position: 'absolute',
    bottom: 0, // Start at the top
    left: 0,
    right: 0,
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
};

export default TopToBottomModal;

