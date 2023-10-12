using BusinessLogic;
using EntitiesAndModels.Entities;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeacherController : ControllerBase
    {
        private readonly ITeacherService _service;
        public TeacherController(ITeacherService service)
        {
            _service = service;
        }
        [HttpPost]
        public IActionResult AddTeacher(Teacher teacher)
        {
            return Ok(_service.AddTeacher(teacher));
        }
        [HttpGet("Department")]
        public IActionResult GetTeachersWithDepartment(int id)
        {
            return Ok(_service.GetTeachersWithDepartment(id));
        }
        [HttpGet("Id")]
        public IActionResult GetTeacherWithId(int id)
        {
            return Ok(_service.GetTeacherWithId(id));
        }
    }
}
