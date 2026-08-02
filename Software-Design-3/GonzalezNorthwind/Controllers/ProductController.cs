using Microsoft.AspNetCore.Mvc;
using GonzalezNorthwind.Models.Dtos;
using GonzalezNorthwind.Services;

namespace GonzalezNorthwind.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ProductsController : ControllerBase {
  private readonly ProductService _productService;

  public ProductsController(ProductService productService) {
    _productService = productService;
  }

  // GET All Products (GET api/products)
  [HttpGet]
  public async Task<ActionResult<List<ProductDto>>> GetAllProducts() {
    var result = await _productService.GetAllProductsAsync();
    return Ok(result);
  }

  // GET Products By Category (GET api/products/by-category)
  [HttpGet("by-category")]
  public async Task<ActionResult<Dictionary<string, List<ProductDto>>>> GetProductsByCategory() {
    var result = await _productService.GetProductsByCategoryAsync();
    return Ok(result);
  }

  // GET Products By Category ID (GET api/products/category/{categoryId})
  [HttpGet("category/{categoryId}")]
  public async Task<ActionResult<List<ProductDto>>> GetProductsByCategoryId(int categoryId) {
    if (categoryId <= 0) {
      return BadRequest("Category ID must be greater than 0.");
    }

    var result = await _productService.GetProductsByCategoryIdAsync(categoryId);
    return Ok(result);
  }

  // GET Products Low on Stock (GET api/products/category/low-stock?threshold={threshold})
  [HttpGet("category/low-stock")]
  public async Task<ActionResult<Dictionary<string, List<ProductDto>>>> GetLowStockProducts([FromQuery] int threshold = 10) {
    if (threshold < 0) {
      return BadRequest("Threshold must be a non-negative number.");
    }

    var result = await _productService.GetLowStockProductsAsync(threshold);
    return Ok(result);
  }

  // GET Average Price By Category (GET api/products/category/average-price-by-category)
  [HttpGet("category/average-price-by-category")]
  public async Task<ActionResult<Dictionary<string, decimal>>> GetAveragePriceByCategory() {
    var result = await _productService.GetAveragePriceByCategoryAsync();
    return Ok(result);
  }

  // GET Most Expensive Products (GET api/products/category/most-expensive?count={count})
  [HttpGet("category/most-expensive")]
  public async Task<ActionResult<List<ProductDto>>> GetMostExpensiveProducts([FromQuery] int count = 5) {
    if (count <= 0) {
      return BadRequest("Count must be greater than 0.");
    }

    var result = await _productService.GetMostExpensiveProductsAsync(count);
    return Ok(result);
  }

  // GET Most Expensive Products By Category (GET api/products/most-expensive-by-category?count={count})
  [HttpGet("most-expensive-by-category")]
  public async Task<ActionResult<Dictionary<string, List<ProductDto>>>> GetMostExpensiveProductsByCategory([FromQuery] int count = 5) {
    if (count <= 0) {
      return BadRequest("Count must be greater than 0.");
    }

    var result = await _productService.GetMostExpensiveProductsByCategoryAsync(count);
    return Ok(result);
  }
}
