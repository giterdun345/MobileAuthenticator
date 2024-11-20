import { requireNativeViewManager } from "expo-modules-core";
import * as React from "react";

const NativeView: React.ComponentType<any> =
  requireNativeViewManager("CryptoKeep");

export default function CryptoKeepView(props: any) {
  return <NativeView {...props} />;
}
