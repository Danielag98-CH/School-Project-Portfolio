using System.ComponentModel.DataAnnotations;

namespace Gonzalez_BankApp.Models.Dtos.CustomerDtos;

public class StateCustomerCountDto {
   
    public string State { get; set; } = null!;

    public int CustomerCount { get; set; }
  
}
