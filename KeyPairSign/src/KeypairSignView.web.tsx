import * as React from 'react';

import { KeypairSignViewProps } from './KeypairSign.types';

export default function KeypairSignView(props: KeypairSignViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
