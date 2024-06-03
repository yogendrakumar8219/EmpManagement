using DataTransferObject.Model;
using DataTransferObject.Requests;
using DataTransferObject.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicsLayer.Employee
{
    public interface IEmployeeBL:IGenericRepository<DataTransferObject.Model.Employee>
    {
        public Task<bool> GetByName(DataTransferObject.Model.Employee Dto);
        public Task<List<DTOEmployeeResponse>?> GetAllEmployee();
    }
}
