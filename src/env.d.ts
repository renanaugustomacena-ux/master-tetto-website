/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare module '*.glsl' {
  const value: string;
  export default value;
}
