using Microsoft.AspNetCore.Mvc;
using GonzalezNorthwind.Models.Dtos;
using GonzalezNorthwind.Services;

namespace GonzalezNorthwind.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CategoriesController : ControllerBase {
  private readonly CategoryService _categoryService;

  public CategoriesController(CategoryService categoryService) {
    _categoryService = categoryService;
  }

  // GET All Categories (GET api/categories)
  [HttpGet]
  public async Task<ActionResult<List<CategoryDto>>> GetAllCategoriesAsync() {
    var result = await _categoryService.GetAllCategoriesAsync();
    return Ok(result);
  }

  // GET Product Counts By Category (GET api/categories/product-counts)
  [HttpGet("product-counts")]
  public async Task<ActionResult<Dictionary<string, int>>> GetProductCountsAsync() {
    var result = await _categoryService.GetProductCountsByCategoryAsync();
    return Ok(result);
  }

  // GET Sales Totals By Category (GET api/categories/sales-totals)
  [HttpGet("sales-totals")]
  public async Task<ActionResult<Dictionary<string, double>>> GetSalesTotalsAsync() {
    var result = await _categoryService.GetSalesTotalsByCategoryAsync();
    return Ok(result);
  }
}
