using DataTransferObject.Model;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataTransferObject.Requests
{
    public class DTOEmployeeRequest
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public byte GenderId { get; set; }
        public string? Address { get; set; }
        public short DistrictId { get; set; }
    }
}
