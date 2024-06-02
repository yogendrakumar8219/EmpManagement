using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataTransferObject.Model
{
    public class Employee
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        
        [Column(TypeName = "varchar(50)")]
        public string Name { get; set; } = string.Empty;
        public byte GenderId { get; set; }
        public Gender? Gender { get; set; }
        
        [Column(TypeName = "varchar(100)")]
        public string? Address { get; set; }
        public short DistrictId { get; set; }
        public District? District { get; set; }
    }
}
