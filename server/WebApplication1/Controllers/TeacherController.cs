using BusinessLogic;
using ClosedXML.Excel;
using DocumentFormat.OpenXml.Spreadsheet;
using EntitiesAndModels.Entities;
using EntitiesAndModels.Models.Attendance;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeacherController : MiniAuthController
    {
        private readonly ITeacherService _service;
        private readonly IStudentService _studentService;
        public TeacherController(ITeacherService service, IStudentService studentService)
        {
            _service = service;
            _studentService = studentService;
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

        [HttpGet("List")]
        public IActionResult GetList()
        {
            return Ok(_service.GetList());
        }

        [HttpGet("Sample")]
        public IActionResult TeachersSample()
        {
            string contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

            var workBook = new XLWorkbook();
            var sheets = workBook.Worksheets.Add("TeachersSample");
            var row = sheets.Row(1);

            row.Cell(1).Value = "Name";
            row.Cell(2).Value = "EmployeeName";
            row.Cell(3).Value = "Gender";
            row.Cell(4).Value = "MaritalStatus";
            row.Cell(5).Value = "Age";
            row.Cell(6).Value = "Experince";
            row.Cell(7).Value = "Department";
            row.Cell(8).Value = "Subjects";
            row.Cell(9).Value = "Address";
            row.Cell(10).Value = "Email";
            row.Cell(11).Value = "Qualification";
            row.Cell(12).Value = "Phone";
            row.Cell(13).Value = "DateOfJoining";
            row.Cell(14).Value = "SpouseName";
            row.Cell(15).Value = "ESINo";
            row.Cell(16).Value = "PFNo";

            var ms = new MemoryStream();
            workBook.SaveAs(ms);
            var content = ms.ToArray();
            return File(content, contentType);
        }

        [HttpPost("ImportTeachers")]
        public IActionResult ImportTeachers([FromForm] ImportRequest request)
        {
            if (request.File == null)
            {
                return BadRequest("File required.");
            }
            var workBook = new XLWorkbook(request.File.OpenReadStream());
            var sheets = workBook.Worksheets.First();
            var totalRows = sheets.LastRowUsed().RowNumber();
            var list = new List<Teacher>();
           
            for (int i = 2; i <= totalRows; i++)
            {
                var row = sheets.Row(i);
                var branch = _studentService.GetBranches().First(x => x.BranchName.Equals(row.Cell(7).Value.ToString(), StringComparison.OrdinalIgnoreCase));
                var teacher = new Teacher
                {
                    Name = row.Cell(1).Value.ToString(),
                    EmployeeId = row.Cell(2).Value.ToString(),
                    Gender = row.Cell(3).Value.ToString().Equals("Male", StringComparison.OrdinalIgnoreCase) ? 1 : 2,
                    MaritalStatus = row.Cell(4).Value.ToString().Equals("Married", StringComparison.OrdinalIgnoreCase) ? 1 : 2,
                    Age = Convert.ToInt32(row.Cell(5).Value.ToString()),
                    Experince = Convert.ToInt32(row.Cell(6).Value.ToString()),
                    Department = branch.Id,
                    Subjects = row.Cell(8).Value.ToString(),
                    Address = row.Cell(9).Value.ToString(),
                    Email = row.Cell(10).Value.ToString(),
                    Qualification = row.Cell(11).Value.ToString().Equals("Btech", StringComparison.OrdinalIgnoreCase) ? 1 : 2,
                    Phone = row.Cell(12).Value.ToString(),
                    DateOfJoining = Convert.ToDateTime(row.Cell(13).Value.ToString()),
                    SpouseName = row.Cell(14).Value.ToString(),
                    ESINo = row.Cell(15).Value.ToString(),
                    PFNo=row.Cell(16).Value.ToString()
                };
                list.Add(teacher);
            }
            
               return Ok(_service.AddTeachersList(list));
        }
    }
}
