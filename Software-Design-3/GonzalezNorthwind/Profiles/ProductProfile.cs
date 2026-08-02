using AutoMapper;
using GonzalezNorthwind.Models.Entities;
using GonzalezNorthwind.Models.Dtos;

namespace GonzalezNorthwind.Profiles;

public class ProductProfile : Profile {
  public ProductProfile() {           //*note to self*
    CreateMap<Product, ProductDto>(); // Mappings to DTO
    CreateMap<ProductDto, Product>(); // Mappings back to Entity
  }
}
