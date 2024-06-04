using BusinessLogicsLayer;
using DataTransferObject.Constants;
using DataTransferObject.Requests;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers
{
    public class MasterController : Controller
    {
        private readonly IUnitOfWork unitOfWork;
        public MasterController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }
        public async Task<IActionResult> GetAllMMaster(DTOMasterRequest Data)
        {
            try
            {
                var ret = await unitOfWork.GetAllMMaster(Data);
                return Json(ret);
            }
            catch
            {
                return Json(KeyConstants.InternalServerError);
            }
        }
    }
}
