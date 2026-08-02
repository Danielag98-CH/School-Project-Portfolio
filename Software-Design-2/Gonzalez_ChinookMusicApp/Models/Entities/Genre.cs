using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace Gonzalez_ChinookMusicApp.Models.Entities;

public class Genre {
    [Key]
    public int GenreId { get; set; }

    
    public required string Name { get; set; } 

    public ICollection<Track> Tracks { get; set; } = new List<Track>();
}