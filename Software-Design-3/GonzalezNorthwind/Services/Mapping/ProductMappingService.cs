using AutoMapper;
using GonzalezNorthwind.Models.Entities;
using GonzalezNorthwind.Models.Dtos;

namespace GonzalezNorthwind.Services.Mapping;

public class ProductMappingService {
  private readonly IMapper _mapper;

  public ProductMappingService(IMapper mapper) {
    _mapper = mapper;
  }

  // Mappings to DTO:
  public ProductDto MapToProductDto(Product product) {
    return _mapper.Map<ProductDto>(product);
  }

  public List<ProductDto> MapToProductDtoList(List<Product> products) {
    return _mapper.Map<List<ProductDto>>(products);
  }

  // Mappings back to Entity:
  public Product MapToProduct(ProductDto productDto) {
    return _mapper.Map<Product>(productDto);
  }
}
