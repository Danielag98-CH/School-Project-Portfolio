using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace Gonzalez_ChinookMusicApp.Models.Entities;

public class Artist {
    [Key]
    public int ArtistId { get; set; }

    public required string Name { get; set; }

    public ICollection<Album> Albums { get; set; } = new List<Album>();

}
