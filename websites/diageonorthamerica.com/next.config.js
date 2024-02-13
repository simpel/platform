/* eslint-disable */
// const runtimeCaching = require('next-pwa/cache')
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin')
const path = require('path')
const mediaRedirects = require('./redirect-rules/media-redirects.json')
const pagesRedirects = require('./redirect-rules/pages-redirects.json')
/* eslint-enable */

// const prod = process.env.NODE_ENV === 'production'

// const withPWA = require('next-pwa')({
//   dest: 'public',
//   disable: prod ? false : true,
// })

// module.exports = withPWA({
// next.js config
// })
const securityHeaders = [
	{
		key: 'Strict-Transport-Security',
		value: 'max-age=16070400; includeSubDomains',
	},
	{
		key: 'X-Frame-Options',
		value: 'SAMEORIGIN',
	},
	{
		key: 'X-Content-Type-Options',
		value: 'nosniff',
	},
	{
		key: 'Content-Security-Policy',
		value: `default-src * data: blob: ; script-src * 'unsafe-inline' 'unsafe-eval' blob: ; style-src * 'unsafe-inline' data: ; frame-ancestors 'none' ;`,
	},
	{
		key: 'X-Permitted-Cross-Domain-Policies',
		value: 'none',
	},
	{
		key: 'Referrer-Policy',
		value: 'no-referrer',
	},
	{
		key: 'X-XSS-Protection',
		value: '1; mode=block',
	},
	{
		key: 'Permissions-Policy',
		value: 'interest-cohort=()',
	},
]

const cacheHeaders = [
	{
		key: 'Cache-Control',
		value: 'public, max-age=60, immutable',
	},
]

// Module.exports = {
//   pwa: {
//     dest: 'public',
//     runtimeCaching,
//     disable: process.env.NODE_ENV === 'development',
//   },
//   entry: {
//     sprite: path.resolve(__dirname, '/assets/icons/**/*.svg'),
//   },
//   webpack(config) {
//     config.module.rules.push({
//       test: /\.svg$/,
//       issuer: { and: [/\.(js|ts|md)x?$/] },
//       use: [
//         {
//           loader: 'svg-sprite-loader',
//           options: {
//             include: path.resolve(__dirname, '/assets/icons'),
//             extract: true,
//             spriteFilename: 'assets/icons/icons.svg',
//           },
//         },
//         {
//           loader: '@svgr/webpack',
//           options: {
//             prettier: false,
//             svgo: true,
//             svgoConfig: { plugins: [{ removeViewBox: false }] },
//             titleProp: true,
//           },
//         },
//         'svg-transform-loader',
//         'svgo-loader',
//       ],
//     })

//     return config
//   },
//   async headers() {
//     return [
//       {
//         // Apply these headers to all routes in your application.
//         source: '/(.*)',
//         headers: securityHeaders,
//       },
//     ]
//   },
//   async redirects() {
//     const defaultLocale = `/${process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'en'}`
//     return [
//       {
//         source: '/',
//         destination: defaultLocale,
//         permanent: true,
//       },
//     ]
//   },
//   sassOptions: {
//     includePaths: [path.join(`${__dirname}/assets/`, 'styles')],
//   },
//   plugins: [new SpriteLoaderPlugin()],
//   experimental: {
//     amp: {
//       skipValidation: process.env.NODE_ENV !== 'development',
//     },
//   },
//   generateBuildId: async () => {
//     return process.env.NEXTJS_BUILD_ID || Math.random().toString(36).substring(7)
//   },
// }

// const runtimeCaching = require("next-pwa/cache");
// const withPWA = require("next-pwa")({
//     dest: "public",
//     register: true,
//     skipWaiting: true,
//     runtimeCaching,
//     buildExcludes: [/middleware-manifest.json$/],
// });
// module.exports =
//  withPWA({
// runtimeCaching,
// disable: process.env.NODE_ENV === 'development',
// entry: {
//   sprite: path.resolve(__dirname, '/assets/icons/**/*.svg'),
// },
// images: {
//   domains: ['https://d1gdpwj97lps0w.cloudfront.net']
// },

const bundleAnalyzerEnabled = process.env.NEXT_ANALYZE === 'true'

module.exports = {
	transpilePackages: ['@diageo/designsystem', '@diageo/utils'],
	reactStrictMode: true,
		eslint: {
		// Warning: This allows production builds to successfully complete even if
		// your project has ESLint errors.
		ignoreDuringBuilds: true,
	},
	webpack(config, options) {
		config.module.rules.push({
			test: /\.svg$/,
			issuer: { and: [/\.(js|ts|md)x?$/] },
			use: [
				{
					loader: 'svg-sprite-loader',
					options: {
						include: path.resolve(__dirname, '/assets/icons'),
						extract: true,
						spriteFilename: 'assets/icons/icons.svg',
					},
				},
				{
					loader: '@svgr/webpack',
					options: {
						prettier: false,
						svgo: true,
						svgoConfig: { plugins: [{ removeViewBox: false }] },
						titleProp: true,
					},
				},
				'svg-transform-loader',
				'svgo-loader',
			],
		})

		if (bundleAnalyzerEnabled) {
			const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
			config.plugins.push(
				new BundleAnalyzerPlugin({
					analyzerMode: 'static',
					openAnalyzer: true,
					reportFilename: !options.nextRuntime
						? `./analyze/client.html`
						: `../${options.nextRuntime === 'nodejs' ? '../' : ''}analyze/${
								options.nextRuntime
						  }.html`,
				}),
			)
		}

		return config
	},
	async headers() {
		return [
			{
				// Apply these headers to all routes in your application.
				source: '/(.*)',
				headers: [...securityHeaders, ...cacheHeaders],
			},
			// {
			//   source: '/:all*(svg|jpg|png)',
			//   locale: false,
			//   headers: [
			//     {
			//       key: 'Cache-Control',
			//       value: 'public, max-age=9999999999, must-revalidate',
			//     },
			//   ],
			// },
		]
	},
	async redirects() {
		const defaultLocale = `/${process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'en'}`
		return [
			{
				source: '/',
				destination: defaultLocale,
				permanent: true,
			},
			{
				source: '/robots.txt',
				destination: '/api/robots',
				permanent: true
			},
			...pagesRedirects,
			...mediaRedirects,
		]
	},
	sassOptions: {
		includePaths: [path.join(`${__dirname}/assets/`, 'styles')],
	},
	// Plugins: [new SpriteLoaderPlugin()],
	async generateBuildId() {
		return process.env.NEXTJS_BUILD_ID || Math.random().toString(36).slice(7)
	},
	staticPageGenerationTimeout: 1000 * 60,
	images: {
		domains: [
			'd1gdpwj97lps0w.cloudfront.net',
			'media-diageocms.diageoplatform.com',
			'media-diageo.diageoplatform.com',
			'd15c6fxii2og45.cloudfront.net',
			'd9a4h9mezti1o.cloudfront.net',
			'media.diageoplatform.com',
			'media.diageo.com',
			'picsum.photos',
		],
	},
}
// })
