using System.ComponentModel.DataAnnotations;
using System.Diagnostics;

namespace ChinookAutomapperExample.Models.Entities {
    [DebuggerDisplay("{Name} (MediaTypeId = {MediaTypeId})")]
    public class MediaType {
        [Key]
        public int MediaTypeId { get; set; }

        [MaxLength(120)]
        public string Name { get; set; }
    }
}
