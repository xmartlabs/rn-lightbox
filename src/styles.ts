import { Dimensions, StyleSheet } from 'react-native'

const { width } = Dimensions.get('window')

export const styles = StyleSheet.create({
  cross: {
    paddingTop: 20,
  },
  header: {
    left: 0,
    position: 'absolute',
    top: 0,
    width,
    zIndex: 1,
  },
  lightbox: {
    alignItems: 'center',
    justifyContent: 'center',
  },
})
