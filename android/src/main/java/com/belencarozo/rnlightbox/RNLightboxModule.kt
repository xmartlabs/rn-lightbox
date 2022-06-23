package com.belencarozo.rnlightbox

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule

class RNLightboxModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName() = "RNLightboxModule"

    override fun getConstants(): MutableMap<String, Any> {
        return hashMapOf("count" to 1)
    }
}
