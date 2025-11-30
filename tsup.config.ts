import { defineConfig } from 'tsup';

// Vue SFC esbuild plugin
const vueSfcPlugin = {
  name: 'vue-sfc',
  setup(build: import('esbuild').PluginBuild) {
    build.onLoad({ filter: /\.vue$/ }, async (args) => {
      const { readFileSync } = await import('fs');
      const { compileScript, parse } = await import('vue/compiler-sfc');

      const source = readFileSync(args.path, 'utf-8');
      const { descriptor } = parse(source);

      const scriptBlock = descriptor.scriptSetup || descriptor.script;
      if (!scriptBlock) {
        return { contents: 'export default {}', loader: 'ts' as const };
      }

      const compiled = compileScript(descriptor, {
        id: args.path,
        inlineTemplate: true,
      });

      return {
        contents: compiled.content,
        loader: (scriptBlock.lang === 'ts' ? 'ts' : 'js') as 'ts' | 'js',
      };
    });
  },
};

export default defineConfig([
  // 1.16 Core and React builds
  {
    entry: {
      '1.16/index': 'src/versions/1.16/index.ts',
      '1.16/react': 'src/versions/1.16/react.ts',
    },
    format: ['cjs', 'esm'],
    dts: true,
    splitting: false,
    sourcemap: true,
    clean: true,
    external: ['react', 'react-dom', 'vue'],
    loader: {
      '.png': 'dataurl',
      '.json': 'json',
    },
    onSuccess: async () => {
      const { cpSync, existsSync, mkdirSync, copyFileSync } =
        await import('fs');
      const { join } = await import('path');

      // Copy textures to dist folder
      const srcTextures = join('src', 'assets', 'textures');
      const distTextures = join('dist', 'textures');

      if (existsSync(srcTextures)) {
        if (!existsSync(distTextures)) {
          mkdirSync(distTextures, { recursive: true });
        }
        cpSync(srcTextures, distTextures, { recursive: true });
        console.log('Textures copied to dist/textures');
      }

      // Copy Vue type declarations for 1.16
      const vue116Dts = join('src', 'versions', '1.16', 'vue.d.ts');
      if (existsSync(vue116Dts)) {
        copyFileSync(vue116Dts, join('dist', '1.16', 'vue.d.ts'));
        copyFileSync(vue116Dts, join('dist', '1.16', 'vue.d.cts'));
        console.log('Vue 1.16 type declarations copied');
      }
    },
  },
  // 1.16 Vue build (separate to handle .vue files)
  {
    entry: {
      '1.16/vue': 'src/versions/1.16/vue.ts',
    },
    format: ['cjs', 'esm'],
    dts: false,
    splitting: false,
    sourcemap: true,
    clean: false,
    external: ['react', 'react-dom', 'vue'],
    esbuildPlugins: [vueSfcPlugin],
  },
]);
