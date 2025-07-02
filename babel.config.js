module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: ["inline-dotenv"], // 👈 Add this line
  };
};
