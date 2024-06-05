using BusinessLogicsLayer.District;
using BusinessLogicsLayer.Gender;
using BusinessLogicsLayer.State;
using DataTransferObject.Requests;
using DataTransferObject.Response;
using Microsoft.VisualBasic;
using BusinessLogicsLayer.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicsLayer
{
    public class UnitOfWork:IUnitOfWork
    {
        public UnitOfWork(IGenderBL _gender,IStateBL _state,IDistrictBL _district)
        {
            Gender = _gender;
            State=_state;
            District= _district;
        }
        public IGenderBL Gender { get; }
        public IStateBL State { get; }
        public IDistrictBL District { get; }
        public async Task<List<DTOMasterResponse>> GetAllMMaster(DTOMasterRequest Data)
        {
            List<DTOMasterResponse> lst = new List<DTOMasterResponse>();

            if (Data.id == Convert.ToInt16(Helpers.Constants.MasterTbl.Gender))
            {
                var Ret = await Gender.GetAll();
                foreach (var gender in Ret)
                {

                    DTOMasterResponse db = new DTOMasterResponse();
                    db.Id = gender.GenderId;
                    db.Name = gender.Name;
                    lst.Add(db);
                }
            }
            else if (Data.id == Convert.ToInt16(Helpers.Constants.MasterTbl.State))
            {
                var Ret = await State.GetAll();
                foreach (var state in Ret)
                {

                    DTOMasterResponse db = new DTOMasterResponse();
                    db.Id = state.StateId;
                    db.Name = state.StateName;
                    lst.Add(db);
                }
            }
            else if (Data.id == Convert.ToInt16(Helpers.Constants.MasterTbl.District))
            {
                var Ret = await District.GetDistrictByStateId(Convert.ToByte(Data.ParentId));
                foreach (var district in Ret)
                {

                    DTOMasterResponse db = new DTOMasterResponse();
                    db.Id = district.DistrictId;
                    db.Name = district.Name;
                    lst.Add(db);
                }
            }
            return lst;
        }
    }
}
