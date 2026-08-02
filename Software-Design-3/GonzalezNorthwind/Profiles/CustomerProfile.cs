using AutoMapper;
using GonzalezNorthwind.Models.Entities;
using GonzalezNorthwind.Models.Dtos;

namespace GonzalezNorthwind.Profiles;

public class CustomerProfile : Profile {
  public CustomerProfile() {             //*note to self*
    CreateMap<Customer, CustomerDto>(); // Mappings to DTO
    CreateMap<CustomerDto, Customer>(); // Mappings back to Entity
  }
}