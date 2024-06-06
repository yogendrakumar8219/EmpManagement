using DataAccessLayer.BaseInterfaces;
using DataTransferObject.Model;
using DataTransferObject.Requests;
using DataTransferObject.Response;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer
{
    public class EmployeeDB:GenericRepositoryDL<Employee>,IEmployeeDB
    {
        protected new readonly ApplicationDbContext _context;
        public EmployeeDB(ApplicationDbContext context) : base(context)
        {
            _context = context;

        }
        public async Task<bool> GetByName(Employee Dto)
        {
            var result = await _context.Employee.AnyAsync(x=>x.Name.ToUpper() == Dto.Name.ToUpper() && x.Id !=Dto.Id);
            return result;
        }
        public async Task<List<DTOEmployeeResponse>?> GetAllEmployee()
        {
            try
            {
                var allrecord = await (from emp in _context.Employee.OrderByDescending(x => x.Id)
                                       join g in _context.Gender on emp.GenderId equals g.GenderId
                                       join d in _context.District on emp.DistrictId equals d.DistrictId
                                       join s in _context.State on d.StateId equals s.StateId
                                       select new DTOEmployeeResponse()
                                       {
                                           Id = emp.Id,
                                           Name = emp.Name,
                                           Address = emp.Address,
                                           GenderId = emp.GenderId,
                                           GenderName = g.Name,
                                           DistrictId = emp.DistrictId,
                                           DistrictName = d.Name,
                                           StateId = s.StateId,
                                           StateName = s.StateName,
                                       }).ToListAsync();
                return allrecord;
            }
            catch (Exception ex)
            {
                return null;
            }

        }
    }
}
