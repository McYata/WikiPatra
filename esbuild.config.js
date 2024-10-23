const esbuild = require('esbuild');

esbuild.build({
  entryPoints: [
    'src/extension.ts',
    'src/commands/fetchWikiContent.ts',
    'src/commands/createTranslationTab.ts',
    'src/commands/postTranslation.ts'
  ],
  bundle: true,
  outdir: 'out',
  platform: 'node',
  external: ['vscode'],
}).then(() => {
  console.log('Build succeeded');
  console.log('Output files have been created in the "out" directory');
}).catch((error) => {
  console.error('Build failed:', error);
  process.exit(1);
});
