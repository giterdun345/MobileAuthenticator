// Reexport the native module. On web, it will be resolved to KeypairSignModule.web.ts
// and on native platforms to KeypairSignModule.ts
export { default } from './KeypairSignModule';
export { default as KeypairSignView } from './KeypairSignView';
export * from  './KeypairSign.types';
