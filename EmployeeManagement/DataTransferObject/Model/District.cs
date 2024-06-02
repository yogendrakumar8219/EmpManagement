using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataTransferObject.Model
{
    public class District
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public short DistrictId { get; set; }
        
        [Column(TypeName = "varchar(50)")]
        public string Name { get; set; } = string.Empty;
        public byte StateId { get; set; }
        public State? State { get; set; }
    }
}
