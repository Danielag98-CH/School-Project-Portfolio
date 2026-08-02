using AutoMapper;
using GonzalezNorthwind.Models.Entities;
using GonzalezNorthwind.Models.Dtos;

namespace GonzalezNorthwind.Services.Mapping;

public class CustomerMappingService {
  private readonly IMapper _mapper;

  public CustomerMappingService(IMapper mapper) {
    _mapper = mapper;
  }

  // Mappings to DTO:
  public CustomerDto MapToCustomerDto(Customer customer) {
    return _mapper.Map<CustomerDto>(customer);
  }

  public List<CustomerDto> MapToCustomerDtoList(List<Customer> customers) {
    return _mapper.Map<List<CustomerDto>>(customers);
  }

  // Mappings back to Entity:
  public Customer MapToCustomer(CustomerDto customerDto) {
    return _mapper.Map<Customer>(customerDto);
  }
}