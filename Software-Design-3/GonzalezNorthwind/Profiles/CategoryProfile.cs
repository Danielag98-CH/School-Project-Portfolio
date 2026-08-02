using AutoMapper;
using GonzalezNorthwind.Models.Entities;
using GonzalezNorthwind.Models.Dtos;

namespace GonzalezNorthwind.Profiles;

public class CategoryProfile : Profile {
  public CategoryProfile() {            //*note to self*  
    CreateMap<Category, CategoryDto>(); // Mappings to DTO 
    CreateMap<CategoryDto, Category>(); // Mappings back to Entity
  }
}
