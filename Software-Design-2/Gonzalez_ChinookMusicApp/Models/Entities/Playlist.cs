using System.ComponentModel.DataAnnotations;

namespace Gonzalez_ChinookMusicApp.Models.Entities;

public class Playlist {
    [Key]
    public int PlaylistId { get; set; }

    public required string Name { get; set; }

    public ICollection<Track> Tracks { get; set; } = new List<Track>();
}
