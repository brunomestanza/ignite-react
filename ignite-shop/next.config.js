/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  // Por padrão o Next não faz a otimização de imagem para todos os domínios que enviam as imagens, pra isso a configuração abaixo mostra quais os
  // domínios que podem ter essa otimização além do domínio da aplicação
  images: {
    domains: ['files.stripe.com'],
  },
}

module.exports = nextConfig
