using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;



namespace Gonzalez_ChinookEnhancedQueries.Models.Entities;

public class Artist {

    [Key]
    public int ArtistId { get; set; }

    [Required]
    public string ? Name { get; set; }

    public ICollection<Album> Albums { get; set; } = new List<Album>();

}