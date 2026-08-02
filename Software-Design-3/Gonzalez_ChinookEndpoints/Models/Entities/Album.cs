using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics;

namespace Gonzalez_ChinookEndpoints.Models.Entities;
[DebuggerDisplay("{Title} (AlbumId = {AlbumId})")]

public class Album {
  [Key]
  public int AlbumId { get; set; }

  [Required, MaxLength(160)]
  public required string Title { get; set; }
  
  [ForeignKey("Artist")]
  public int ArtistId { get; set; }

  public virtual Artist? Artist { get; set; }
  public virtual ICollection<Track> Tracks { get; set; } = new List<Track>();
}