using BusinessLogicsLayer.State;
using DataAccessLayer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicsLayer.District
{
    public class DistrictBL : GenericRepositoryDL<DataTransferObject.Model.District>, IDistrictBL
    {
        public DistrictBL(ApplicationDbContext context) : base(context)
        {
            
        }
    }
}
