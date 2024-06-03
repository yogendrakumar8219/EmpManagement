using DataAccessLayer;
using DataAccessLayer.BaseInterfaces;
using DataTransferObject.Requests;
using DataTransferObject.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicsLayer.Employee
{
    public class EmployeeBL:GenericRepositoryDL<DataTransferObject.Model.Employee>,IEmployeeBL
    {
        private readonly IEmployeeDB _employeeDB;
        public EmployeeBL(ApplicationDbContext context, IEmployeeDB employeeDB) : base(context)
        {
            _employeeDB=employeeDB;
        }
        public async Task<bool> GetByName(DataTransferObject.Model.Employee Dto)
        {
            return await _employeeDB.GetByName(Dto);
        }
        public async Task<List<DTOEmployeeResponse>?> GetAllEmployee()
        {
            return await _employeeDB.GetAllEmployee();
        }
    }
}
