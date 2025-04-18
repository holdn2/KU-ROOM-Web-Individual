import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "robots.txt", "apple-touch-icon.png"],
      manifest: {
        name: "KU-ROOM-WEB",
        short_name: "KU-ROOM",
        description: "건국대학교 룸 매칭 지도 앱",
        theme_color: "#ffffff",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            // 네이버 지도 API 외부 JS 캐시 처리
            urlPattern: /^https:\/\/openapi\.map\.naver\.com\/.*/i,
            handler: "NetworkFirst",
            options: {
              cacheName: "naver-api-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24, // 1일
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }),
  ],
});

// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import { VitePWA } from 'vite-plugin-pwa'

// export default defineConfig({
//   plugins: [
//     react(),
//     VitePWA({
//       registerType: 'autoUpdate',
//       includeAssets: ['favicon.svg', 'robots.txt', 'apple-touch-icon.png'],
//       manifest: {
//         name: 'KU-ROOM-WEB',
//         short_name: 'KU-ROOM',
//         description: '당신의 앱 설명',
//         theme_color: '#ffffff',
//         icons: [
//           {
//             src: 'pwa-192x192.png',
//             sizes: '192x192',
//             type: 'image/png'
//           },
//           {
//             src: 'pwa-512x512.png',
//             sizes: '512x512',
//             type: 'image/png'
//           },
//           {
//             src: 'pwa-512x512.png',
//             sizes: '512x512',
//             type: 'image/png',
//             purpose: 'any maskable'
//           }
//         ]
//       }
//     })
//   ]
// })
