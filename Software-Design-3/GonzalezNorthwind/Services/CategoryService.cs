using Microsoft.EntityFrameworkCore;
using GonzalezNorthwind.Data;
using GonzalezNorthwind.Models.Dtos;
using GonzalezNorthwind.Services.Mapping;

namespace GonzalezNorthwind.Services;

public class CategoryService {
  private readonly ApplicationDbContext _context;
  private readonly CategoryMappingService _mappingService;

  public CategoryService(ApplicationDbContext context, CategoryMappingService mappingService) {
    _context = context;
    _mappingService = mappingService;
  }

  // GET All Categories (GET api/categories)
  public async Task<List<CategoryDto>> GetAllCategoriesAsync() {
    // Get All Categories
    var categories = await _context.Categories.ToListAsync();
    
    return _mappingService.MapToCategoryDtoList(categories);
  }

  // GET Product Counts By Category (GET api/categories/product-counts)
  public async Task<Dictionary<string, int>> GetProductCountsByCategoryAsync() {
    // Get All Categories - Includes Products
    var categories = await _context.Categories
      .Include(c => c.Products)
      .ToListAsync();

    // Get Product Counts by Category Name
    var result = categories
    .ToDictionary(
      c => c.CategoryName ?? "Unknown Category",
      c => c.Products.Count
    );

    return result;
  }

  // GET Sales Totals By Category (GET api/categories/sales-totals)
  public async Task<Dictionary<string, double>> GetSalesTotalsByCategoryAsync() {
    // Get All Categories - Includes Products and OrderDetails
    var categories = await _context.Categories
      .Include(c => c.Products)
        .ThenInclude(p => p.OrderDetails)
      .ToListAsync();

    // Get list of categories with sum of sales for each
    var categorySalesTotal = categories
      .Where(c => c.Products.Any(p => p.OrderDetails.Any()))
      .ToDictionary(
        c => c.CategoryName ?? "Unknown Category",
        c => c.Products
          .SelectMany(p => p.OrderDetails)
          .Sum(od => (double)(od.UnitPrice * od.Quantity * (decimal)(1 - od.Discount)))
      );

    return categorySalesTotal;
  }
}
