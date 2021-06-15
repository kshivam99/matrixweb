const baseUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3000"
    : "https://matrixweb.vercel.app/";

module.exports = baseUrl;
