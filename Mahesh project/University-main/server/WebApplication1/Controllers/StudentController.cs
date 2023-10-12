using BusinessLogic;
using EntitiesAndModels.Entities;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly IStudentService _studentService;
        public StudentController(IStudentService studentService)
        {
            _studentService = studentService;
        }
        [HttpPost]
        public IActionResult AddStudent(Student student)
        {
            return Ok(_studentService.AddStudent(student));
        }
        [HttpGet]
        public IActionResult GetStudent(int branch, int classId, int section)
        {
            return Ok(_studentService.GetStudents(branch, classId, section));
        }
    }
}
