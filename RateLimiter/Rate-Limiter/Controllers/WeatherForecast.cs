
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;

namespace Rate_Limiter.Controllers
{
    //[EnableRateLimiting("fixedIP")]
    [ApiController]
    [Route("api/[controller]")]
    public class RateLimiterController : ControllerBase
    {
        [HttpGet]
        public string GetWeatherForecast()
        {
            return "Hello, World!";
        }
    }

}