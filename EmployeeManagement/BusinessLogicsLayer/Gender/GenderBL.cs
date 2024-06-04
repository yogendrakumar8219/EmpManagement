using DataAccessLayer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicsLayer.Gender
{
    public class GenderBL : GenericRepositoryDL<DataTransferObject.Model.Gender>, IGenderBL
    {
        public GenderBL(ApplicationDbContext context) : base(context)
        {
            
        }
    }
}
