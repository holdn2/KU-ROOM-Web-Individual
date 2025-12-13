import { EventHandler } from "react";

export {};

declare global {
  interface Window {
    naver: any;
    ReactNativeWebView?: {
      postMessage: (message: string) => void;
    };
  }

  namespace naver {
    namespace maps {
      class LatLng {
        constructor(lat: number, lng: number);
        lat(): number;
        lng(): number;
      }

      class Point {
        constructor(x: number, y: number);
        x: number;
        y: number;
      }

      class Map {
        constructor(element: HTMLElement | string, options?: any);
        setCenter(latlng: LatLng): void;
        getCenter(): LatLng;
        setZoom(level: number, useEffect?: boolean): void;
        getZoom(): number;
        destroy(): void;
        morph(latlng: LatLng, zoom?: number): void;
        panTo(latlng: LatLng): void;
      }

      interface MarkerOptions {
        position: LatLng;
        map?: Map | null;
        icon?: any;
        title?: string;
        clickable?: boolean;
        draggable?: boolean;
        cursor?: string;
        zIndex?: number;
        [key: string]: any;
      }

      class Marker {
        constructor(options: MarkerOptions);
        setMap(map: Map | null): void;
        getPosition(): LatLng;
        setPosition(position: LatLng): void;
        setIcon(icon: any): void;
        getTitle(): string;
        setZIndex(zIndex: number): void;
      }

      class Circle {
        constructor(options: any);
        setMap(map: Map | null): void;
        setRadius(radius: number): void;
        setCenter(center: LatLng): void;
      }

      namespace Event {
        function addListener(
          target: any,
          eventName: string,
          handler: EventHandler
        ): any;
        function removeListener(listener: any): void;
      }

      const UTMK: any;
    }
  }
}

declare module "virtual:pwa-register" {
  export interface RegisterSWOptions {
    immediate?: boolean;
    onNeedRefresh?: () => void;
    onOfflineReady?: () => void;
    onRegistered?: (
      registration: ServiceWorkerRegistration | undefined
    ) => void;
    onRegisterError?: (error: any) => void;
  }

  export function registerSW(
    options?: RegisterSWOptions
  ): (reloadPage?: boolean) => Promise<void>;
}
