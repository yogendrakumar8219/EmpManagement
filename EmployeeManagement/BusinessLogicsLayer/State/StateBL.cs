using BusinessLogicsLayer.Gender;
using DataAccessLayer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicsLayer.State
{
    public class StateBL : GenericRepositoryDL<DataTransferObject.Model.State>, IStateBL
    {
        public StateBL(ApplicationDbContext context) : base(context)
        {
            
        }
    }
}
