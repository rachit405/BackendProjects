using System;
using System.Collections.Concurrent;
using System.Runtime.CompilerServices;

namespace Rate_Limiter.Middleware
{
    public class FixedWindowRateLimiterMiddleware
    {
        // We are going to use a Concurrent Dictionay with KV pairs of IP and timestamo of the user
        private readonly RequestDelegate _next;
        //Dict which contains info for all users
        private static ConcurrentDictionary<string,RateLimitterInfo> _clients= new ConcurrentDictionary<string,RateLimitterInfo>();
        private readonly int _fixedLimit;
        private readonly TimeSpan _timeWindow; 

        public FixedWindowRateLimiterMiddleware(RequestDelegate next, int requestLimit,TimeSpan timeWindow)
        {
            _next = next ?? throw new ArgumentNullException(nameof(next));
            _fixedLimit = requestLimit;
            _timeWindow = timeWindow;
        }
        
        public async Task InvokeAsync(HttpContext context)
        {
            if (context == null)
            {
                throw new ArgumentNullException(nameof(context));
            }

            string clientIp = GetClientIdentifier(context);
            DateTime now = DateTime.UtcNow;

            var rateLimitingInfo = _clients.GetOrAdd(clientIp, _ => new RateLimitterInfo{
                requestCount = 0,
                windowStartTime = now
            });

            lock(rateLimitingInfo)
            {
                // reset the timer

                if(now > rateLimitingInfo.windowStartTime.Add(_timeWindow))
                {
                    rateLimitingInfo.windowStartTime = now;
                    rateLimitingInfo.requestCount = 0;
                }

                rateLimitingInfo.requestCount++;

                if(rateLimitingInfo.requestCount > _fixedLimit)
                {
                    context.Response.StatusCode = StatusCodes.Status429TooManyRequests;
                    context.Response.Headers["Retry-After"] = _timeWindow.TotalSeconds.ToString();
                    return;
                }
            }
            await _next(context);
        }


        private string GetClientIdentifier(HttpContext context)
        {
            return context.Connection.RemoteIpAddress?.ToString() ?? "unknown";
        }
        public class RateLimitterInfo
        {
            public int requestCount { get; set; }
            public DateTime windowStartTime { get; set; }
        }
    }
}