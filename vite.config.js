import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default ({ mode }) => {
  return defineConfig({
    plugins: [react()],
    define: {
      "process.env.NODE_ENV": `"${mode}"`,
      "process.env.RAILWAY_STATIC_URL": `"${process.env.RAILWAY_STATIC_URL}"`,
    },
  });
};
