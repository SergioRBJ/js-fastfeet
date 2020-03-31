export default {
  host: process.env.REDIS_URL,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASS,
};
