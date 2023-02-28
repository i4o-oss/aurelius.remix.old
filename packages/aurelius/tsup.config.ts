import { defineConfig } from 'tsup'
import fs from 'node:fs/promises'
import path from 'node:path'

import tsconfig from '@aurelius/tsconfig/aurelius.json' assert { type: 'json' }

const { target } = tsconfig.compilerOptions

export default defineConfig([
	{
		name: 'aurelius',
		entry: ['src/index.tsx'],
		format: 'cjs',
		dts: false,
		target,
	},
	{
		name: 'aurelius-esm',
		entry: ['src/index.tsx'],
		format: 'esm',
		dts: true,
		bundle: true,
		splitting: false,
		esbuildPlugins: [
			// https://github.com/evanw/esbuild/issues/622#issuecomment-769462611
			{
				name: 'add-mjs',
				setup(build) {
					build.onResolve({ filter: /.*/ }, async (args) => {
						if (
							args.importer &&
							args.path.startsWith('.') &&
							!args.path.endsWith('.json')
						) {
							let isDir: boolean
							try {
								isDir = (
									await fs.stat(
										path.join(args.resolveDir, args.path)
									)
								).isDirectory()
							} catch {
								isDir = false
							}

							if (isDir) {
								// it's a directory
								return {
									path: args.path + '/index.mjs',
									external: true,
								}
							}
							return { path: args.path + '.mjs', external: true }
						}
					})
				},
			},
		],
		// import.meta is available only from es2020
		target: 'es2020',
	},
	{
		entry: ['src/types.ts'],
		name: 'aurelius-types',
		dts: {
			only: true,
		},
	},
])
