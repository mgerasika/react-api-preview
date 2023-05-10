import babel, { getBabelOutputPlugin } from '@rollup/plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from 'rollup-plugin-node-resolve';
const aliasFn = require('./rollup-plugin-alias-fork');
import { terser } from 'rollup-plugin-terser';
const analyze = require('rollup-plugin-analyzer');
import image from '@rollup/plugin-image';
const path = require('path');

const config = {
	name: 'DesignSystem',
	extensions: ['.ts', '.tsx'],
};

const babelConfig = {
	presets: [
		"@babel/preset-env",
		"@babel/preset-react",
		// "@babel/preset-typescript",

		//https://github.com/storybookjs/storybook/issues/7540
		"@emotion/babel-preset-css-prop"
	],
	"plugins": ["@emotion/babel-plugin", "babel-plugin-macros"]
};
export default [{
	input: 'src/index.ts',
	external: ['react', 'reac-dom'],
	output: [
		{
			// file: packageJson.module,
			dir: './dist',
			format: 'es',
			sourcemap: true,
			exports: "named",
			preserveModules: true,
			plugins: [getBabelOutputPlugin(babelConfig)]
		},
		// {
		// 	// file: packageJson.main,
		// 	dir: './dist/cjs',
		// 	format: 'cjs',
		// 	sourcemap: true,
		// 	name: 'cjs',
		// 	exports: "named",
		// 	preserveModules: true,
		// 	plugins: [getBabelOutputPlugin(babelConfig)]
		// }
	],

	plugins: [
		image(),
		aliasFn({ resolve: ['.ts', '.tsx','.svg'], entries: [{ find: /^@common\//, replacement: '/src/' }] }),

		peerDepsExternal({
			includeDependencies: true
		}),

		resolve({
			extensions: config.extensions,
		}),
		commonjs(),

		// json(),
		// postcss(),
		
		babel({
			extensions: config.extensions,
			include: ['src/**/*'],
			exclude: 'node_modules/**',
			presets: [
				"@babel/preset-env",
				"@babel/preset-react",
				"@babel/preset-typescript",

				//https://github.com/storybookjs/storybook/issues/7540
				"@emotion/babel-preset-css-prop"
			],
			plugins: ["@emotion/babel-plugin", "babel-plugin-macros"]
		}),

		analyze({ summaryOnly: true }),
		terser(),
	],
}];
