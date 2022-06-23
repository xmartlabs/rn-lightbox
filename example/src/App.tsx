import React, { useEffect } from 'react'
import RNLightboxModule, { Counter } from 'rn-lightbox'

const App = () => {
  useEffect(() => {
    console.log(RNLightboxModule)
  })

  return <Counter />
}

export default App
