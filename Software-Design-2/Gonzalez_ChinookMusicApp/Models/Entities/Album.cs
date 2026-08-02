using System.Collections;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Threading;

namespace Gonzalez_ChinookMusicApp.Models.Entities;

public class Album {
    [Key]
    public int AlbumId { get; set; }

    public required string Title { get; set; }
    
    public int ArtistId { get; set;  }

    [ForeignKey(nameof(ArtistId))] 
    public Artist ? Artist { get; set; }

    public ICollection<Track> Tracks { get; set; } = new List<Track>();


}