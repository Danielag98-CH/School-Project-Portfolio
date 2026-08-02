using System.ComponentModel.DataAnnotations;

namespace Gonzalez_ChinookEnhancedQueries.Models.Dtos.MusicDtos;

public class TrackStatDto {
    public string? Name { get; set; }

    public decimal Price { get; set; }

    public string? AlbumTitle { get; set; }
    
}