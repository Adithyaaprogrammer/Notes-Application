import { ratelimiter } from '../config/upstash.js';

const ratelimite = async (req, res, next) => {
    try{
        const { success } = await ratelimiter.limit(req.ip);
        if (!success) {
            return res.status(429).json({ message: 'Too many requests, please try again later.' });
        }
        next();
    }
    catch (error) {
        console.error('Rate limiter error:', error);
        res.status(500).json({ message: 'Internal server error' });

    }
}
export default ratelimite;