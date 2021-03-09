module.exports = function (api) {
	// api.cache(true);// cant be used tgt with api.env
	console.log(`[${api.env()}] Babel compiling`);

	return {
		presets: ["babel-preset-expo"],
		env: {
			production: {
				plugins: ["transform-remove-console"],
			},
		},
	};
};
