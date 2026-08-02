using System.ComponentModel.DataAnnotations;

namespace Gonzalez_ChinookMusicApp.Models.Dtos;

public class Statistic {
    public required string Label { get; set; }

    public decimal Value { get; set; }

    public string? ValueMetric { get; set; }
}
