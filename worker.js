export default {
  async fetch(request, env) {
    // Let the assets handler serve static files
    return env.ASSETS.fetch(request);
  },
};
