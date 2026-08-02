using System.ComponentModel.DataAnnotations;

namespace MvcMovie.Models;

public class Movie {
    public int Id { get; set; }
    [Required]
    public string? Title { get; set; }
    public DateTime ReleaseDate { get; set; }
    [Required]
    public string? Genre { get; set; }
    [Required]
    public decimal Price { get; set; }
}