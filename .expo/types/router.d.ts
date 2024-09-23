/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/_sitemap` | `/components/library/avatar` | `/components/library/box` | `/components/library/box/styles` | `/components/library/button` | `/components/library/gluestack-ui-provider` | `/components/library/gluestack-ui-provider/config` | `/components/library/gluestack-ui-provider/script`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
