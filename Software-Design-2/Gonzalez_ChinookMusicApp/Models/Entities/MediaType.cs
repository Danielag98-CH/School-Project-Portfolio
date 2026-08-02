using System.ComponentModel.DataAnnotations;

namespace Gonzalez_ChinookMusicApp.Models.Entities;

public class MediaType {
    [Key]
    public int MediaTypeId { get; set; }

    public required string Name { get; set; } 
    
    public ICollection<Track> Tracks { get; set; } = new List<Track>();

}
