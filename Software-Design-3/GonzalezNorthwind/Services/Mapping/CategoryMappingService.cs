using AutoMapper;
using GonzalezNorthwind.Models.Entities;
using GonzalezNorthwind.Models.Dtos;

namespace GonzalezNorthwind.Services.Mapping;

public class CategoryMappingService {
  private readonly IMapper _mapper;

  public CategoryMappingService(IMapper mapper) {
    _mapper = mapper;
  }

  // Mappings to DTO:
  public CategoryDto MapToCategoryDto(Category category) {
    return _mapper.Map<CategoryDto>(category);
  }

  public List<CategoryDto> MapToCategoryDtoList(List<Category> categories) {
    return _mapper.Map<List<CategoryDto>>(categories);
  }

  // Mappings back to Entity:
  public Category MapToCategory(CategoryDto categoryDto) {
    return _mapper.Map<Category>(categoryDto);
  }
}
