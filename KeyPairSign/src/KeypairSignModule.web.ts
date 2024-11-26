import { registerWebModule, NativeModule } from 'expo';

import { KeypairSignModuleEvents } from './KeypairSign.types';

class KeypairSignModule extends NativeModule<KeypairSignModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
}

export default registerWebModule(KeypairSignModule);
