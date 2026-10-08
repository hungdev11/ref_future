/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    '@mystic/core',
    '@mystic/database',
    '@mystic/knowledge-base',
    '@mystic/numerology-engine',
    '@mystic/tuvi-engine',
    '@mystic/tarot-engine',
    '@mystic/astrology-engine',
    '@mystic/rule-engine',
    '@mystic/template-engine',
    '@mystic/interpretation-engine',
  ],
};

module.exports = nextConfig;
