import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag: string) => tag.startsWith("ion-"), // Define ion-icons como elementos customizados
        },
      },
    }),
  ],
  base: "/",
  server: {
    host: "0.0.0.0",
    port: 5173,
  },
  define: {
    __API_BASE_URL__: JSON.stringify(process.env.VITE_API_BASE_URL),
  },
});
