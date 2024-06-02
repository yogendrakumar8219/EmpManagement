using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataTransferObject.Model
{
    public class State
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public byte StateId { get; set; }

        [Column(TypeName = "varchar(20)")]
        public string StateCode { get; set; } = string.Empty;

        [Column(TypeName = "varchar(100)")]
        public string StateName { get; set; } = string.Empty;
    }
}
