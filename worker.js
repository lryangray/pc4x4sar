// Pierce County 4x4 Search and Rescue - Static Site Worker
export default {
  async fetch(request, env) {
    // Let the assets handler serve static files
    return env.ASSETS.fetch(request);
  },
};
