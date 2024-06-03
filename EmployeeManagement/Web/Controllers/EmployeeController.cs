using BusinessLogicsLayer.Employee;
using DataTransferObject.Constants;
using DataTransferObject.Model;
using DataTransferObject.Requests;
using DataTransferObject.Response;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.DotNet.Scaffolding.Shared;
using System.Collections.Generic;
using System.Security.Claims;

namespace Web.Controllers
{
    public class EmployeeController : Controller
    {
        private readonly IEmployeeBL _employeeBL;
        public EmployeeController(IEmployeeBL employeeBL)
        {
            _employeeBL = employeeBL;
        }
        public async Task<IActionResult> Employee()
        {
            return View();
        }
        public async Task<IActionResult> SaveEmployee(Employee dTO)
        {
            try
            {
                dTO.Name = dTO.Name.Trim();

                if (ModelState.IsValid)
                {
                    if (!await _employeeBL.GetByName(dTO))
                    {
                        if (dTO.Id > 0)
                        {
                            await _employeeBL.Update(dTO);
                            return Json(KeyConstants.Update);
                        }
                        else
                        {
                            await _employeeBL.Add(dTO);
                            return Json(KeyConstants.Save);
                        }
                    }
                    else
                    {
                        return Json(KeyConstants.Exists);
                    }

                }
                else
                {
                    return Json(ModelState.Select(x => x.Value.Errors).Where(y => y.Count > 0).ToList());
                }

            }
            catch (Exception ex)
            {
                return Json(KeyConstants.InternalServerError);
            }

        }
        public async Task<IActionResult?> GetAllEmployee()
        {
            List<DTOEmployeeResponse>? dTOEmployeeResponses = await _employeeBL.GetAllEmployee();
            if (dTOEmployeeResponses != null)
            {
                return Json(await _employeeBL.GetAllEmployee());
            }
            else
            {
                return null;
            }

        }
        public async Task<IActionResult> DeleteEmployee(Employee dTO)
        {
            try
            {
                await _employeeBL.Delete(dTO);
                return Json(KeyConstants.Success);

            }
            catch (Exception ex)
            {
                return Json(KeyConstants.InternalServerError);
            }
        }
    }
}
