import { NativeModule, requireNativeModule } from 'expo';

import { KeypairSignModuleEvents } from './KeypairSign.types';

declare class KeypairSignModule extends NativeModule<KeypairSignModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<KeypairSignModule>('KeypairSign');
