using System.ComponentModel.DataAnnotations;
using System.Diagnostics;

namespace Gonzalez_ChinookEndpoints.Models.Entities;[DebuggerDisplay("{Name} (GenreId = {GenreId})")]
[DebuggerDisplay("{Name} (GenreId = {GenreId})")]

public class Genre {
  [Key]
  public int GenreId { get; set; }

  [Required, MaxLength(120)]
  public required string Name { get; set; }
}