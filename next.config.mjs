/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
        domains: ['repository-images.githubusercontent.com', "opengraph.githubassets.com"],
    },
};

export default nextConfig;
