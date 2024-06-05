using BusinessLogicsLayer.District;
using BusinessLogicsLayer.Employee;
using BusinessLogicsLayer.Gender;
using BusinessLogicsLayer.State;
using DataAccessLayer;
using DataAccessLayer.BaseInterfaces;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicsLayer
{
    public static class ServiceRegistration
    {
        public static void AddInfrastructure(this IServiceCollection services)
        {
            services.AddTransient<IUnitOfWork, UnitOfWork>();
            services.AddTransient<IGenderBL, GenderBL>();
            services.AddTransient<IStateBL, StateBL>();

            services.AddTransient<IDistrictBL, DistrictBL>();
            services.AddTransient<IDistrictDB, DistrictDB>();

            services.AddTransient<IEmployeeBL, EmployeeBL>();
            services.AddTransient<IEmployeeDB, EmployeeDB>();
        }
    }
}
