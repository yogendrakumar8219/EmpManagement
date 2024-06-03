using DataTransferObject.Model;
using DataTransferObject.Requests;
using DataTransferObject.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.BaseInterfaces
{
    public interface IEmployeeDB:IGenericRepositoryDL<Employee>
    {
        public Task<bool> GetByName(Employee Dto);
        public Task<List<DTOEmployeeResponse>?> GetAllEmployee();
    }
}
