/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

const getDirectories = (source: string): string[] =>
  fs
    .readdirSync(source, { withFileTypes: true })
    .filter(
      (item) =>
        item.isDirectory() || (['.ts', '.tsx'].includes(path.extname(item.name)) && !item.name.includes('.d.ts'))
    )
    .map((item) => item.name.replace(path.extname(item.name), ''));

const aliases = getDirectories('./src');

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: aliases.reduce(
      (acc, curr) => ({
        ...acc,
        [curr]: path.resolve(__dirname, `./src/${curr}`),
      }),
      {}
    ),
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      formats: ['cjs', 'es'],
      name: 'react-slottable',
      fileName: 'index',
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
  plugins: [react()],
});
