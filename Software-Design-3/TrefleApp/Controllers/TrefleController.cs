using System.Text.Json;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TrefleApp.Models.Trefle.Dtos;
using TrefleApp.Services;

namespace TrefleApp.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class TrefleController : ControllerBase {

        private readonly PlantService _plantService;

        public TrefleController(PlantService trefleService) {
            _plantService = trefleService;
        }

        [HttpGet("plants/{plantId}")]
        public async Task<ActionResult<PlantDto>> GetPlantById(int plantId) {
            // TODO: Complete
            return Ok();
        }

        [HttpGet("plants")]
        public async Task<ActionResult<ICollection<PlantDto>>> GetPlants() {
            ICollection<PlantDto>? plants = await _plantService.GetPlants();

            if(null == plants) {
                return BadRequest("Expected list of plants but got null instead.");
            }

            return Ok(plants);
        }
    }
}