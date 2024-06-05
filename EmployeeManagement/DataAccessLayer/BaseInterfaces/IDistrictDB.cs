using DataTransferObject.Model;
using DataTransferObject.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.BaseInterfaces
{
    public interface IDistrictDB : IGenericRepositoryDL<District>
    {
        public Task<List<DTODistrictResponse>?> GetDistrictByStateId(byte StateId);
    }
}
