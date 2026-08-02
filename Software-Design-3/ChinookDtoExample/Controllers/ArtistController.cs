using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ChinookDtoExample.Data;

namespace ChinookDtoExample.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class ArtistController : ControllerBase {
        private readonly ApplicationDbContext _context;

        public ArtistController(ApplicationDbContext context) {
            _context = context;
        }
    }
}
