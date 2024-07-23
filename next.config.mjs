/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['res.cloudinary.com'],
    },

    webpack: (config) => {
        config.resolve.fallback = { fs: false };

        return config;
    },

    env: {
        CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
        CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
        CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    },


    output: 'standalone',

};

export default nextConfig;
