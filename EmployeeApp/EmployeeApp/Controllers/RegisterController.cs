using EmployeeApp.Modals;
using EmployeeApp.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegisterController : ControllerBase
    {
        public Registerservices _employee;
        public RegisterController(Registerservices employee)
        {
            _employee = employee;

        }
        [HttpPost]
        public void save(EmployeeRegistration registerr) 
        {
            _employee.SaveRegister(registerr);
        }
        [HttpGet]
        public EmployeeRegistration GetList(string email,string password )
        {
            return _employee.GetRegistrationLogin(email, password);
        }
        [HttpGet("lost")]
        public List<EmployeeRegistration> GetListdata()
        {
            return _employee.GetRegistrations();
        }
    }
}
