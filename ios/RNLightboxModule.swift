//
//  RNLightboxModule.swift
//  RNLightboxModule
//
//  Copyright © 2022 Belen Carozo. All rights reserved.
//

import Foundation

@objc(RNLightboxModule)
class RNLightboxModule: NSObject {
  @objc
  func constantsToExport() -> [AnyHashable : Any]! {
    return ["count": 1]
  }

  @objc
  static func requiresMainQueueSetup() -> Bool {
    return true
  }
}
