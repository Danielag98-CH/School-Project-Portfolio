using System.ComponentModel.DataAnnotations;

namespace Gonzalez_ChinookEnhancedQueries.Models.Dtos.MusicDtos;


public class ComposerStatDto {
    public string? Name { get; set; }

    public int TrackCount { get; set; }
    
}