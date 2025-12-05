import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	reactStrictMode: true, //  Strict Mode
	...(process.env.NODE_ENV === 'production' && {
		typescript: {
			ignoreBuildErrors: true,
		},
		eslint: {
			ignoreDuringBuilds: true,
		},
	}),
};

export default nextConfig;
