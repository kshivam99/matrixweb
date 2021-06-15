const baseUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3000"
    : window.location.origin;

module.exports = baseUrl;
