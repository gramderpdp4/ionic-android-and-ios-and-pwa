// vite.config.js
import legacy from "file:///C:/Users/note/Documents/GitHub/ionic-android-and-ios-and-pwa/node_modules/@vitejs/plugin-legacy/dist/index.mjs";
import vue from "file:///C:/Users/note/Documents/GitHub/ionic-android-and-ios-and-pwa/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import path from "path";
import { defineConfig } from "file:///C:/Users/note/Documents/GitHub/ionic-android-and-ios-and-pwa/node_modules/vite/dist/node/index.js";
import { VitePWA } from "file:///C:/Users/note/Documents/GitHub/ionic-android-and-ios-and-pwa/node_modules/vite-plugin-pwa/dist/index.js";
var __vite_injected_original_dirname = "C:\\Users\\note\\Documents\\GitHub\\ionic-android-and-ios-and-pwa";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    legacy(),
    VitePWA({
      workbox: {
        sourcemap: true,
        cleanupOutdatedCaches: true,
        skipWaiting: true,
        clientsClaim: true
      },
      registerType: "autoUpdate",
      devOptions: {
        enabled: true
      },
      manifest: {
        "name": "ionic-app",
        "short_name": "ionic-app",
        "start_url": "/",
        "display": "standalone",
        "background_color": "#ffffff",
        "lang": "pt-BR",
        "scope": "/",
        "icons": [
          {
            "src": "img/icons/android-chrome-192x192.png",
            "sizes": "192x192",
            "type": "image/png"
          },
          {
            "src": "img/icons/android-chrome-512x512.png",
            "sizes": "512x512",
            "type": "image/png"
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  test: {
    globals: true,
    environment: "jsdom"
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxub3RlXFxcXERvY3VtZW50c1xcXFxHaXRIdWJcXFxcaW9uaWMtYW5kcm9pZC1hbmQtaW9zLWFuZC1wd2FcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXG5vdGVcXFxcRG9jdW1lbnRzXFxcXEdpdEh1YlxcXFxpb25pYy1hbmRyb2lkLWFuZC1pb3MtYW5kLXB3YVxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvbm90ZS9Eb2N1bWVudHMvR2l0SHViL2lvbmljLWFuZHJvaWQtYW5kLWlvcy1hbmQtcHdhL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IGxlZ2FjeSBmcm9tICdAdml0ZWpzL3BsdWdpbi1sZWdhY3knXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHsgVml0ZVBXQSB9IGZyb20gJ3ZpdGUtcGx1Z2luLXB3YSdcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICB2dWUoKSxcbiAgICBsZWdhY3koKSxcbiAgICBWaXRlUFdBKHtcbiAgICAgIHdvcmtib3g6IHtcbiAgICAgICAgc291cmNlbWFwOiB0cnVlLFxuICAgICAgICBjbGVhbnVwT3V0ZGF0ZWRDYWNoZXM6IHRydWUsXG4gICAgICAgIHNraXBXYWl0aW5nOiB0cnVlLFxuICAgICAgICBjbGllbnRzQ2xhaW06IHRydWVcbiAgICAgIH0sXG4gICAgICByZWdpc3RlclR5cGU6ICdhdXRvVXBkYXRlJyxcbiAgICAgIGRldk9wdGlvbnM6IHtcbiAgICAgICAgZW5hYmxlZDogdHJ1ZVxuICAgICAgfSxcbiAgICAgIG1hbmlmZXN0OiB7XG4gICAgICAgIFwibmFtZVwiOiBcImlvbmljLWFwcFwiLFxuICAgICAgICBcInNob3J0X25hbWVcIjogXCJpb25pYy1hcHBcIixcbiAgICAgICAgXCJzdGFydF91cmxcIjogXCIvXCIsXG4gICAgICAgIFwiZGlzcGxheVwiOiBcInN0YW5kYWxvbmVcIixcbiAgICAgICAgXCJiYWNrZ3JvdW5kX2NvbG9yXCI6IFwiI2ZmZmZmZlwiLFxuICAgICAgICBcImxhbmdcIjogXCJwdC1CUlwiLFxuICAgICAgICBcInNjb3BlXCI6IFwiL1wiLFxuICAgICAgICBcImljb25zXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcInNyY1wiOiBcImltZy9pY29ucy9hbmRyb2lkLWNocm9tZS0xOTJ4MTkyLnBuZ1wiLFxuICAgICAgICAgICAgICAgIFwic2l6ZXNcIjogXCIxOTJ4MTkyXCIsXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaW1hZ2UvcG5nXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJzcmNcIjogXCJpbWcvaWNvbnMvYW5kcm9pZC1jaHJvbWUtNTEyeDUxMi5wbmdcIixcbiAgICAgICAgICAgICAgICBcInNpemVzXCI6IFwiNTEyeDUxMlwiLFxuICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImltYWdlL3BuZ1wiXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICAgIH1cbiAgICB9KVxuICBdLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICdAJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjJyksXG4gICAgfSxcbiAgfSxcbiAgdGVzdDoge1xuICAgIGdsb2JhbHM6IHRydWUsXG4gICAgZW52aXJvbm1lbnQ6ICdqc2RvbSdcbiAgfSxcbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWtYLE9BQU8sWUFBWTtBQUNyWSxPQUFPLFNBQVM7QUFDaEIsT0FBTyxVQUFVO0FBQ2pCLFNBQVMsb0JBQW9CO0FBQzdCLFNBQVMsZUFBZTtBQUp4QixJQUFNLG1DQUFtQztBQU96QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxJQUFJO0FBQUEsSUFDSixPQUFPO0FBQUEsSUFDUCxRQUFRO0FBQUEsTUFDTixTQUFTO0FBQUEsUUFDUCxXQUFXO0FBQUEsUUFDWCx1QkFBdUI7QUFBQSxRQUN2QixhQUFhO0FBQUEsUUFDYixjQUFjO0FBQUEsTUFDaEI7QUFBQSxNQUNBLGNBQWM7QUFBQSxNQUNkLFlBQVk7QUFBQSxRQUNWLFNBQVM7QUFBQSxNQUNYO0FBQUEsTUFDQSxVQUFVO0FBQUEsUUFDUixRQUFRO0FBQUEsUUFDUixjQUFjO0FBQUEsUUFDZCxhQUFhO0FBQUEsUUFDYixXQUFXO0FBQUEsUUFDWCxvQkFBb0I7QUFBQSxRQUNwQixRQUFRO0FBQUEsUUFDUixTQUFTO0FBQUEsUUFDVCxTQUFTO0FBQUEsVUFDTDtBQUFBLFlBQ0ksT0FBTztBQUFBLFlBQ1AsU0FBUztBQUFBLFlBQ1QsUUFBUTtBQUFBLFVBQ1o7QUFBQSxVQUNBO0FBQUEsWUFDSSxPQUFPO0FBQUEsWUFDUCxTQUFTO0FBQUEsWUFDVCxRQUFRO0FBQUEsVUFDWjtBQUFBLFFBQ0o7QUFBQSxNQUNGO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxLQUFLLFFBQVEsa0NBQVcsT0FBTztBQUFBLElBQ3RDO0FBQUEsRUFDRjtBQUFBLEVBQ0EsTUFBTTtBQUFBLElBQ0osU0FBUztBQUFBLElBQ1QsYUFBYTtBQUFBLEVBQ2Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
