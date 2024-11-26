import { requireNativeView } from 'expo';
import * as React from 'react';

import { KeypairSignViewProps } from './KeypairSign.types';

const NativeView: React.ComponentType<KeypairSignViewProps> =
  requireNativeView('KeypairSign');

export default function KeypairSignView(props: KeypairSignViewProps) {
  return <NativeView {...props} />;
}
