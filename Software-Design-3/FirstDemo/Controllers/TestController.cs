using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FirstDemo.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase {

        [HttpGet("")]
        public IActionResult Hello()
        {
            return Ok("Hello from the TestController!");
        }

        [HttpGet("item/{example:int}")]
        public IActionResult TestOne(int example)
        {
            return Ok($"The INT example route! You passed: {example}");
        }

        [HttpGet("item/{apple}")]
        public IActionResult TestTwo(string apple)
        {
            return Ok($"The STRING apple route! You passed: {apple}");
        }

        [HttpGet("item")]
        public IActionResult GetItemByName([FromQuery] string name)
        {
            if ("computer" == name)
            {
                return Ok(new { id = 9, name });
            } else
            {
                return NotFound($"No item found with the name = {name}");
            }
        }

        [HttpGet("bad")]
        public IActionResult GetBadRequestExample() {
            // Returns a 400 Bad Request with an error message
            return BadRequest("You sent a bad request!");
        }

        [HttpGet("not-found")]
        public IActionResult GetNotFoundExample() {
            // Returns a 404 Not Found
            return NotFound("The requested item could not be found.");
        }

        [HttpGet("unauthorized")]
        public IActionResult GetUnauthorizedExample() {
            // Returns a 401 Unauthorized
            return Unauthorized("You must be logged in to access this resource.");
        }

        [HttpGet("forbidden")]
        public IActionResult GetForbiddenExample() {
            // Returns a 403 Forbidden
            return Forbid("Access to this resource is forbidden.");
        }

        [HttpPut("update/{id}")]
        public IActionResult UpdateItem(int id, [FromBody] object updated) {
            // 204 No Content = success, but no body returned
            return NoContent();
        }

        [HttpGet("redirect")]
        public IActionResult RedirectExample() {
            // Redirects to another endpoint within the same controller
            /*
                If you rename the Hello method later, nameof(Hello) updates automatically during compilation.

                If you used "Hello" as a string literal and renamed the method, it would silently break at runtime.
            */

            // return RedirectToAction("Hello");

            return RedirectToAction(nameof(Hello));
        }

    }

}
