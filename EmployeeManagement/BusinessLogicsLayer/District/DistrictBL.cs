using BusinessLogicsLayer.State;
using DataAccessLayer;
using DataAccessLayer.BaseInterfaces;
using DataTransferObject.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicsLayer.District
{
    public class DistrictBL : GenericRepositoryDL<DataTransferObject.Model.District>, IDistrictBL
    {
        private readonly IDistrictDB _districtDB;
        public DistrictBL(ApplicationDbContext context, IDistrictDB districtDB) : base(context)
        {
            _districtDB=districtDB;
        }
        public async Task<List<DTODistrictResponse>?> GetDistrictByStateId(byte StateId)
        {
            return await _districtDB.GetDistrictByStateId(StateId);
        }
    }
}
