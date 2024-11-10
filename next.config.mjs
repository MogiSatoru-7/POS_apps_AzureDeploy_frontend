/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  env: {
      NEXT_PUBLIC_API: process.env.NEXT_PUBLIC_API, // 環境変数を追加
  }
}

export default nextConfig;


// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     output: 'standalone'
//   }
  
//   export default nextConfig;