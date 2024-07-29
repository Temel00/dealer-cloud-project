const withPWA = require('next-pwa')({
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        APP_VERSION: process.env.npm_package_version,
    },
}

module.exports = withPWA(nextConfig)