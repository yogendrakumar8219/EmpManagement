using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataTransferObject.Response
{
    public class DTOEmployeeResponse
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public byte GenderId { get; set; }
        public string GenderName { get; set; } = string.Empty;
        public string? Address { get; set; }
        public short DistrictId { get; set; }
        public string DistrictName { get; set; } = string.Empty;
        public byte StateId { get; set; }
        public string StateName { get; set; } = string.Empty;
    }
}
