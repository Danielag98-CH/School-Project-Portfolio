using System.CodeDom.Compiler;
using System.Collections;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.CompilerServices;

namespace Gonzalez_ChinookMusicApp.Models.Entities;

public class Track {

    [Key]
    public int TrackId { get; set;  }

    public required string Name { get; set; }

    [ForeignKey("Album")]
    public int AlbumId { get; set;  }
  

    public Album ? Album { get; set;  }

    public int MediaTypeId { get; set; }

    public MediaType ? MediaType { get; set;  }

    public int GenreId { get; set;  }

    public Genre ? Genre { get; set;  }

    public string ? Composer { get; set;  }
    
    public int Bytes { get; set; }


    public int Milliseconds { get; set; }
   
    public decimal UnitPrice { get; set; }

    public ICollection<Playlist> Playlists { get; set; } = new List<Playlist>();
}