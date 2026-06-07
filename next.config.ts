import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A raiz "/" agora tem a home institucional própria (app/page.tsx) — sem redirect.
  allowedDevOrigins: ["192.168.1.207"],
};

export default nextConfig;
