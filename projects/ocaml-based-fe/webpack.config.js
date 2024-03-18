// import { AngularWebpackPlugin } from '@ngtools/webpack';
 const { AngularWebpackPlugin } = require('@ngtools/webpack');

module.exports = {
  experiments: {
    topLevelAwait: true,
  },
  plugins: [
    new AngularWebpackPlugin({
      jitMode: '@angular/compiler'
    }),
  ],
}
