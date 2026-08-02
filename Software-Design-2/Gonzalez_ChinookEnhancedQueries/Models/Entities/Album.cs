using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace Gonzalez_ChinookEnhancedQueries.Models.Entities;

public class Album {
    [Key]
    public int AlbumId { get; set; }

    [Required]
    public string ? Title { get; set; }
    
    public int ArtistId { get; set;  }

    [ForeignKey(nameof(ArtistId))] 
    public Artist ? Artist { get; set; }

    public ICollection<Track> Tracks { get; set; } = new List<Track>();


}