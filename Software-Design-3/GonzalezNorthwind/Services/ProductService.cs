using Microsoft.EntityFrameworkCore;
using GonzalezNorthwind.Data;
using GonzalezNorthwind.Models.Dtos;
using GonzalezNorthwind.Services.Mapping;

namespace GonzalezNorthwind.Services;

public class ProductService {
  private readonly ApplicationDbContext _context;
  private readonly ProductMappingService _mappingService;

  public ProductService(ApplicationDbContext context, ProductMappingService mappingService) {
    _context = context;
    _mappingService = mappingService;
  }

  // GET All Products (GET api/products)
  public async Task<List<ProductDto>> GetAllProductsAsync() {
    // Get All Products
    var products = await _context.Products.ToListAsync();

    return _mappingService.MapToProductDtoList(products);
  }

  // GET Products By Category (GET api/products/by-category)
  public async Task<Dictionary<string, List<ProductDto>>> GetProductsByCategoryAsync() {
    // Get All Products - Includes Categories
    var products = await _context.Products
      .Include(p => p.Category)
      .ToListAsync();

    // Get Products Grouped By Category
    var result = products
      .GroupBy(p => p.Category?.CategoryName ?? "Unknown Category")
      .ToDictionary(
        g => g.Key,
        g => g.Select(p => _mappingService.MapToProductDto(p)).ToList()
      );
      
    return result;
  }

  // GET Products By Category ID (GET api/products/by-category/{categoryId})
  public async Task<List<ProductDto>> GetProductsByCategoryIdAsync(int categoryId) {
    // Get Products By Category ID
    var products = await _context.Products
      .Where(p => p.CategoryId == categoryId)
      .OrderBy(p => p.ProductName)
      .ToListAsync();

    return _mappingService.MapToProductDtoList(products);
  }

  // GET All Products Low on Stock (GET api/products/low-stock?threshold={threshold})
  public async Task<Dictionary<string, List<ProductDto>>> GetLowStockProductsAsync(int threshold = 10) {
    // Get All Products Low on Stock - Includes Categories 
    var products = await _context.Products
      .Include(p => p.Category)
      .Where(p => p.UnitsInStock <= threshold && !p.Discontinued)
      .ToListAsync();

    // Group All Products Low on Stock By Category
    var groupedProducts = products
      .GroupBy(p => p.Category?.CategoryName ?? "Unknown Category")
      .ToDictionary(
        g => g.Key,
        g => g.OrderBy(p => p.UnitPrice)
              .Select(p => _mappingService.MapToProductDto(p))
              .ToList()
      );

    return groupedProducts;
  }

  // GET Average Price By Category (GET api/products/average-price-by-category)
  public async Task<Dictionary<string, decimal>> GetAveragePriceByCategoryAsync() {
    // Get All Categories - Includes Products
    var categories = await _context.Categories
      .Include(c => c.Products)
      .Where(c => c.Products.Any())
      .ToListAsync();

    // Calculate Average Price of Products By Category
    var averagePriceByCategory = categories.ToDictionary(
      c => c.CategoryName ?? "Unknown",
      c => c.Products.Average(p => p.UnitPrice ?? 0)
    );

    return averagePriceByCategory;
  }

  // GET Most Expensive Products (GET api/products/most-expensive?count={count})
  public async Task<List<ProductDto>> GetMostExpensiveProductsAsync(int count = 5) {
    // Get Top (count) Most Expensive Products
    var products = await _context.Products
      .OrderByDescending(p => (double)(p.UnitPrice ?? 0))
      .Take(count) // = 5 by default
      .ToListAsync();

    return _mappingService.MapToProductDtoList(products);
  }

  // GET Most Expensive Products By Category (GET api/products/most-expensive-by-category?count={count})
  public async Task<Dictionary<string, List<ProductDto>>> GetMostExpensiveProductsByCategoryAsync(int count = 5) {
    // Get All Categories - Includes Products
    var categories = await _context.Categories
      .Include(c => c.Products)
      .ToListAsync();

    // Get Top (count) Most Expensive Products By Category
    var productsByCategory = categories
      .Where(c => c.Products.Any())
      .ToDictionary(
        c => c.CategoryName ?? "Unknown",
        c => c.Products
          .OrderByDescending(p => (double)(p.UnitPrice ?? 0))
          .Take(count) // = 5 by default
          .Select(p => _mappingService.MapToProductDto(p))
          .ToList()
      );

    return productsByCategory;
  }
}
