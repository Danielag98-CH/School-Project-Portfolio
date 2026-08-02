using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;



namespace Gonzalez_ChinookEnhancedQueries.Models.Entities;

public class Playlist {
    [Key]
    public int PlaylistId { get; set; }

    [Required]
    public string ? Name { get; set; }

    public ICollection<Track> Tracks { get; set; } = new List<Track>();
}