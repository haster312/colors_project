module.exports = {
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
                    @import "@/assets/css/_variables.scss";
                `,
      },
    },
  },
  transpileDependencies: ["vuex-persist"],
  chainWebpack: (config) => {
    config.module
      .rule("zip")
      .test(/\.zip$/)
      .type("javascript/auto")
      .use("file-loader")
      .loader("file-loader");
    config.module
      .rule("data")
      .test(/\.data$/)
      .type("javascript/auto")
      .use("file-loader")
      .loader("file-loader");
    config.module
      .rule("wasm")
      .test(/\.wasm$/)
      .type("javascript/auto")
      .use("file-loader")
      .loader("file-loader");
  },
  configureWebpack: {
    externals: {
      experiments: {
        asyncWebAssembly: true,
        importAsync: true,
      },
    },
  },
};
