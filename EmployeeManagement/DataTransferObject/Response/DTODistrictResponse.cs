using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataTransferObject.Response
{
    public class DTODistrictResponse
    {
        public short DistrictId { get; set; }
        public string Name { get; set; } = string.Empty;
    }
}
