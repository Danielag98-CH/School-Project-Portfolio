using System.ComponentModel.DataAnnotations;
using System.Diagnostics;
using System.Text.Json.Serialization;

namespace Gonzalez_ChinookEndpoints.Models.Entities;
[DebuggerDisplay("{Name} (ArtistId = {ArtistId})")]

public class Artist {
  [Key]
  public int ArtistId { get; set; }
  
  [Required, MaxLength(120)]
  public required string Name { get; set; }

  public virtual ICollection<Album> Albums { get; set; } = new List<Album>();
}
