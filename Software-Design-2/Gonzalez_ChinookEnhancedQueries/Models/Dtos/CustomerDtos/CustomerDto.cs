using System.ComponentModel.DataAnnotations;

namespace Gonzalez_ChinookEnhancedQueries.Models.Dtos.CustomerDtos;


public class CustomerDto {

    public int CustomerId { get; set; }

    public string? FirstName { get; set; }
    
    public string ? LastName { get; set; }
      
}