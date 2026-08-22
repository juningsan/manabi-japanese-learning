import { cloudflare } from "@cloudflare/vite-plugin";
import vinext from "vinext";
import { defineConfig } from "vite";

// const localCloudflareConfig = {
//   main: "./worker/index.ts",
//   compatibility_flags: ["nodejs_compat"],
//   d1_databases: [
//     {
//       binding: "DB",
//       database_name: "manabi-local",
//       database_id: "00000000-0000-4000-8000-000000000000",
//     },
//   ],
// };

export default defineConfig({
  plugins: [
    vinext(),
    cloudflare({
      viteEnvironment: { name: "rsc", childEnvironments: ["ssr"] },
    }),
  ],
});
