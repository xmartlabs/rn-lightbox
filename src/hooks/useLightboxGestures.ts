import { useWindowDimensions } from 'react-native'
import { Gesture } from 'react-native-gesture-handler'
import {
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { clamp } from 'react-native-redash'

export const useLightboxGestures = (
  imageContainerHeight: SharedValue<number>,
  scaleUntil?: number,
) => {
  const maxScale = scaleUntil ?? 2
  const { width } = useWindowDimensions()

  const scale = useSharedValue<number>(1)
  const savedScale = useSharedValue<number>(1)
  const maxPanHorizontal = useDerivedValue<number>(() => {
    return ((scale.value - 1) * width) / (maxScale * 2)
  }, [scale, width])
  const maxPanVertical = useDerivedValue<number>(() => {
    return ((scale.value - 1) * imageContainerHeight.value) / (maxScale * 2)
  }, [scale, width])
  const posX = useSharedValue<number>(0)
  const posY = useSharedValue<number>(0)
  const startTranslation = useSharedValue<{ x: number; y: number }>({
    x: 0,
    y: 0,
  })
  const gestureCleanup = () => {
    scale.value = 1
    savedScale.value = 1
    posX.value = 0
    posY.value = 0
    startTranslation.value = { x: 0, y: 0 }
  }
  const pinchGesture = Gesture.Pinch()
    .onUpdate(
      e => (scale.value = clamp(savedScale.value * e.scale, 1, maxScale)),
    )
    .onEnd(() => {
      savedScale.value = scale.value
    })
  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
      posX.value = withTiming(0)
      posY.value = withTiming(0)
      startTranslation.value = { x: 0, y: 0 }
      scale.value = withTiming(scale.value === 1 ? maxScale : 1)
      savedScale.value = withTiming(scale.value === 1 ? maxScale : 1)
    })
  const panGesture = Gesture.Pan()
    .onUpdate(({ translationX, translationY }) => {
      posX.value = clamp(
        translationX + startTranslation.value.x,
        -maxPanHorizontal.value,
        maxPanHorizontal.value,
      )
      posY.value = clamp(
        translationY + startTranslation.value.y,
        -maxPanVertical.value,
        maxPanVertical.value,
      )
    })
    .onEnd(() => {
      startTranslation.value = {
        x: posX.value,
        y: posY.value,
      }
    })
  const composedGesture = Gesture.Simultaneous(
    pinchGesture,
    doubleTap,
    panGesture,
  )
  const imageStyle = useAnimatedStyle(() => {
    return {
      height: imageContainerHeight.value,
      transform: [
        { scale: scale.value },
        { translateX: posX.value },
        { translateY: posY.value },
      ],
    }
  }, [imageContainerHeight])

  return {
    composedGesture,
    gestureCleanup,
    imageStyle,
  }
}
