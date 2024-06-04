using BusinessLogicsLayer.District;
using BusinessLogicsLayer.Gender;
using BusinessLogicsLayer.State;
using DataTransferObject.Requests;
using DataTransferObject.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicsLayer
{
    public interface IUnitOfWork
    {
        IGenderBL Gender { get; }
        IStateBL State { get; }
        IDistrictBL District { get; }
        public Task<List<DTOMasterResponse>> GetAllMMaster(DTOMasterRequest Data);
    }
}
