using DataAccessLayer.BaseInterfaces;
using DataTransferObject.Model;
using DataTransferObject.Response;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer
{
    public class DistrictDB : GenericRepositoryDL<District>, IDistrictDB
    {
        protected new readonly ApplicationDbContext _context;
        public DistrictDB(ApplicationDbContext context) : base(context)
        {
            _context = context;

        }
        public async Task<List<DTODistrictResponse>?> GetDistrictByStateId(byte StateId)
        {
            var District = await (from s in _context.State
                               join d in _context.District on s.StateId equals d.StateId
                               where s.StateId == StateId
                               select new DTODistrictResponse
                               {
                                   DistrictId = d.DistrictId,
                                   Name = d.Name,
                               }).ToListAsync();
            return District;
        }
    }
}
