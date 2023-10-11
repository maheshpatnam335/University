using EmployeeApp.Modals;
using EmployeeApp.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DetailsController : ControllerBase
    {
        public Detailsservices _detailss;
        public DetailsController (Detailsservices server)
        {
            _detailss = server;
        }
        [HttpPost]
        public void save(EmployeeDetails detailss)
        {
            _detailss.SaveDatails(detailss);
        }
        //this is attribute routing
        [HttpGet("List1")]
        public List<EmployeeDetails> Get()
        {
            return _detailss.Get();
        }
        [HttpGet("List2")]
        public List<EmployeeDetails> Get1()
        {
            return _detailss.Get();
        }
        [HttpPut]
        public void update(EmployeeDetails detaills)
        {
            _detailss.Update(detaills);
        }
        [HttpDelete]
        public void delete(int id)
        {
            _detailss.Delete(id);
        }
    }
}
