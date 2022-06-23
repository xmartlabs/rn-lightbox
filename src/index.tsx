import React, { ReactElement, useState } from 'react'
import {
  Pressable,
  SafeAreaView,
  StatusBar,
  Text,
  useWindowDimensions,
} from 'react-native'
import { View } from 'react-native'
import {
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler'
import Modal from 'react-native-modal/dist/modal'
import Animated, { SharedValue } from 'react-native-reanimated'

import { useLightboxGestures } from './hooks/useLightboxGestures'
import { styles } from './styles'

interface LightboxProps {
  renderContent?: ReactElement<any, any>
  imageContainerHeight: SharedValue<number>
  backdropColor?: string
  onClose?: () => void
  renderImage?: ReactElement<any, any>
}

export const Lightbox: React.FC<LightboxProps> = ({
  children,
  renderContent,
  imageContainerHeight,
  backdropColor,
  renderImage,
  onClose,
}) => {
  const { composedGesture, imageStyle, gestureCleanup } =
    useLightboxGestures(imageContainerHeight)
  const { height, width } = useWindowDimensions()
  const onPressClose = () => {
    onClose?.()
    gestureCleanup()
    toggleModal()
  }
  const Header = (
    <View style={styles.header}>
      <SafeAreaView>
        <Pressable onPress={onPressClose} hitSlop={50} style={styles.cross}>
          <Text>x</Text>
        </Pressable>
      </SafeAreaView>
    </View>
  )

  const [showModal, setShowModal] = useState(false)
  const toggleModal = () => {
    setShowModal(!showModal)
  }
  return (
    <>
      <Pressable onPress={toggleModal}>{children}</Pressable>
      <Modal
        isVisible={showModal}
        backdropColor={backdropColor}
        backdropOpacity={1}
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
      >
        <>
          <StatusBar backgroundColor={backdropColor} />
          {Header}
          {renderContent ? (
            renderContent
          ) : (
            <GestureHandlerRootView>
              <GestureDetector gesture={composedGesture}>
                <Animated.View
                  style={[
                    styles.lightbox,
                    {
                      height,
                    },
                  ]}
                >
                  <Animated.View
                    style={[
                      imageStyle,
                      {
                        width,
                      },
                    ]}
                  >
                    {renderImage ? renderImage : children}
                  </Animated.View>
                </Animated.View>
              </GestureDetector>
            </GestureHandlerRootView>
          )}
        </>
      </Modal>
    </>
  )
}
