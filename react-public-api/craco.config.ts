/* eslint-disable import/no-anonymous-default-export */
import path from 'path';
export default {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
};