---
tags:
  - javascript
  - bundle
  - export
  - webpack
date: 2023-11-18
---
Achieving small JavaScript bundle sizes is a goal cherished by users, clients, browsers, ISPs, and, not least, developers. While it can be challenging to maintain, optimizing bundle size was the focus of my work this week.
## Webpack
In the current JavaScript ecosystem, the spotlight may be on ESM and Vite, but Webpack remains the most popular and widely used bundler. Understanding our roots is key, and Webpack plays a vital role in optimizing bundle size.

### Code-splitting & Caching
Webpack [organizes](https://webpack.js.org/guides/code-splitting/) our developed code into JavaScript chunks. Executing `npm run build` reveals the bundling process. By default, Webpack determines which parts go into which bundle, often resulting in a single file. However, this also means our third-party dependencies end up in the same bundle. For optimal performance, it's beneficial to separate certain dependencies, like React, into their own bundle:
```javascript
optimization: {
	runtimeChunk: 'single',
	splitChunks: {
		chunks: 'all',
		name: (module, chunks, cacheGroupKey) => `vendors--${chunks.map((chunk) => chunk.name).join('--')}`,
		cacheGroups: {
			react: {
				test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom)[\\/]/,
				name: 'vendor--react',
				chunks: 'all',
			},
		},
	},
},
```

The browser can cache these bundles if allowed, making it crucial to have deterministic bundle names. Fortunately, this is the default behavior in Webpack. The `name` and `contenthash` both play crucial roles, explicitly signaling to the browser when the bundle changes:
```javascript
output: {
	filename: '[name].[contenthash].bundle.js',
	path: path.resolve(__dirname, 'dist'),
	assetModuleFilename: '[path][name][ext]',
	clean: true,
},
```
### Tree-shaking & Minifing
Webpack is also able to get rid of the unused source code and it wont be part of the production bundle. However, its not an easy task. You can apply obvious [configurations](https://webpack.js.org/guides/tree-shaking/) such as the following.
```javascript
mode: 'production',
optimization: {
	minimize: true,
	minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
},
```
Webpack might struggle to identify pure code (side-effectless), especially when barrel exporting from a module. Minimizing exports and utilizing [named exports](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export) can mitigate this.
### Knip
Enter [knip](https://github.com/webpro/knip), a powerful tool to detect unused files, modules, exports, and dependencies in your project. Credit goes to [DevtoolsFM](https://www.devtools.fm/). With an easy CLI syntax and numerous plugins, even your configuration or test files are in good hands 😊. The tool provides detailed insights into what can be safely deleted or unexported.
```sh
npx knip
```

Utilize knip effectively to reduce your bundle size and assist Webpack in optimizing the production bundle.