using System.ComponentModel.DataAnnotations;


namespace Gonzalez_ChinookEnhancedQueries.Models.Dtos.CountryDtos;

public class CountryTransactionSummaryDto {

    public string? Name { get; set; }

    public int TransactionCount { get; set; }
    

    public decimal TransactionTotal { get; set; }


}