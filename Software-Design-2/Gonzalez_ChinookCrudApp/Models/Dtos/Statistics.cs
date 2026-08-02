using System.ComponentModel.DataAnnotations;

namespace Gonzalez_ChinookCrudApp.Models.Dtos;

public class Statistic {

    [Required]
    public string ? Label { get; set; }

    public decimal Value { get; set; }

    public string? ValueMetric { get; set; }
}
