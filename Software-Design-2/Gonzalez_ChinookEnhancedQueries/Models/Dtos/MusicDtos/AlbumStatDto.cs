using System.ComponentModel.DataAnnotations;

namespace Gonzalez_ChinookEnhancedQueries.Models.Dtos.MusicDtos;


public class AlbumStatDto {
    public string? Title { get; set; }

    public int TrackCount { get; set; }
    
}