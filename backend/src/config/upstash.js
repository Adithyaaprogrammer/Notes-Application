import {Ratelimit} from '@upstash/ratelimit';
import {Redis} from '@upstash/redis';
import dotenv from 'dotenv';
dotenv.config();
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const ratelimiter = new Ratelimit({
  redis,
  limiter : Ratelimit.slidingWindow(100, "30 s"),
});

export { redis, ratelimiter };
export default {
  redis,
  ratelimiter,
};