using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MvcMovie.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BerryController : ControllerBase
    {

        [HttpGet("")]
        public IActionResult BerryHello() { 
            return Ok("Berry works!");
        }

        [HttpGet("{berryType}")]
        public IActionResult BerryType(string berryType) {
            return Ok($"Berry type: {berryType}");
        }

        [HttpPost("")]
        public IActionResult CreateBerry(object information) {
            return Ok($"Info you gave: {information}");
        }

    }
}
