const rateLimit = require('express-rate-limit')

const limiter = rateLimit({
	windowMs: 5 * 60 * 1000, // 5 minutes
	max: 5, // Limit each IP to 5 requests per `window`
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

// Apply the rate limiting middleware to all requests
module.exports = {limiter}