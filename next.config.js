module.exports = {
	reactStrictMode: true,
	async rewrites() {
		return [
			{
				source: '/',
				destination: 'https://firebasestorage.googleapis.com/',
			},
		];
	},
	images: {
		domains: ['firebasestorage.googleapis.com'],
	},
};
