const deps = require("../package.json").dependencies;
const { ModuleFederationPlugin } = require("webpack").container;
const {
  NodeFederationPlugin,
  StreamingTargetPlugin,
} = require("@module-federation/node");

module.exports = {
  client: new ModuleFederationPlugin({
    name: "todo_list",
    filename: "remoteEntry.js",
    remotes: {},

    remoteType: "module",
    library: { type: "module" },

    exposes: {
      "./TodoList": "./src/TodoList",
    },
    shared: {
      ...deps,
      react: {
        singleton: true,
        requiredVersion: deps.react,
      },
      "react-dom": {
        singleton: true,
        requiredVersion: deps["react-dom"],
      },
    },
  }),
  server: [
    new NodeFederationPlugin({
      name: "todo_list",
      filename: "remoteEntry.js",
      library: { type: "commonjs-module" },
      remotes: {},
      exposes: {
        "./TodoList": "./src/TodoList",
      },
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
      },
    }),
    new StreamingTargetPlugin({
      name: "todo_list",
      library: { type: "commonjs-module" },
      remotes: {},
    }),
  ],
};
