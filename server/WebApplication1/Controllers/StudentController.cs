using AutoMapper;
using BusinessLogic;
using ClosedXML.Excel;
using EntitiesAndModels;
using EntitiesAndModels.Entities;
using EntitiesAndModels.Models.Attendance;
using EntitiesAndModels.Models.ImportModels;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : MiniAuthController
    {
        private readonly IStudentService _studentService;
        private readonly IMapper _mapper;
        public StudentController(IStudentService studentService, IMapper mapper)
        {
            _studentService = studentService;
            _mapper = mapper;
        }
        [HttpPost]
        public IActionResult AddStudent(Student student)
        {
            var result =  _studentService.AddStudent(student);
            if (result.HasError) { return BadRequest(result); }
            return Ok();
        }
        [HttpGet]
        public IActionResult GetStudent(int branch, int classId, int section)
        {
            return Ok(_studentService.GetStudents(branch, classId, section));
        }

        [HttpGet("List")]
        public IActionResult StudentList()
        {
            return Ok(_studentService.GetList());
        }

        [HttpPost("Import")]
        public IActionResult ImportStudents([FromForm] ImportRequest request)
        {
            Result<Student> result = new Result<Student>();
            if (request.File == null)
            {
                result.AddMessageItem(new ReturnMessage("File is required"));
                return BadRequest(result);
            }
            if (NewAttribute.ValidateHeaders<ImportStudent>(request.File, new ImportStudent()))
            {
                return BadRequest(result.AddMessageItem(new ReturnMessage("Invalid headers")));

            }
            var list = new List<Student>();
            var workBook = new XLWorkbook(request.File.OpenReadStream());
            var workSheets = workBook.Worksheets.First();
            var totalRows = workSheets.LastRowUsed().RowNumber();
            for (int i = 2; i <= totalRows; i++)
            {
                var row = workSheets.Row(i);
                var branch = _studentService.GetBranches().First(x => x.BranchName.Equals(row.Cell(2).Value.ToString(), StringComparison.OrdinalIgnoreCase));
                var caste = _studentService.GetCaste().First(x => x.CasteName.Equals(row.Cell(11).Value.ToString(), StringComparison.OrdinalIgnoreCase));

                var student = new Student
                {
                    Name = row.Cell(1).Value.ToString(),
                    BranchId = branch.Id,
                    Class = Convert.ToInt32(row.Cell(3).Value.ToString()),
                    SectionId = row.Cell(4).Value.ToString().Equals("A", StringComparison.OrdinalIgnoreCase) ? 1 : 2,
                    Gender = row.Cell(5).Value.ToString().Equals("Male", StringComparison.OrdinalIgnoreCase) ? 1 : 2,
                    MobileNumber = row.Cell(6).Value.ToString(),
                    AdmissionNumber = row.Cell(7).Value.ToString(),
                    RollNumber = row.Cell(8).Value.ToString(),
                    DateOfBirth = Convert.ToDateTime(row.Cell(9).Value.ToString()),
                    FatherName = row.Cell(10).Value.ToString(),
                    Caste = caste.Id,
                    Address = row.Cell(12).Value.ToString(),

                };

                list.Add(student);
            }
            return Ok(_studentService.AddStudentsList(list));
        }
        [HttpGet("StudentSample")]
        public IActionResult StudentsSample()
        {
            string contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
            var workBook = new XLWorkbook();
            var workSheet = workBook.Worksheets.Add("StudentsSample");
            workSheet.Row(1).Cell(1).Value = "Name";
            workSheet.Row(1).Cell(2).Value = "Branch";
            workSheet.Row(1).Cell(3).Value = "Class";
            workSheet.Row(1).Cell(4).Value = "Section";
            workSheet.Row(1).Cell(5).Value = "Gender";
            workSheet.Row(1).Cell(6).Value = "Mobile Number";
            workSheet.Row(1).Cell(7).Value = "Admission Number";
            workSheet.Row(1).Cell(8).Value = "Roll Number";
            workSheet.Row(1).Cell(9).Value = "Date Of Birth";
            workSheet.Row(1).Cell(10).Value = "Father Name";
            workSheet.Row(1).Cell(11).Value = "Caste";
            workSheet.Row(1).Cell(12).Value = "Address";
            var ms = new MemoryStream();
            workBook.SaveAs(ms);
            var content = ms.ToArray();
            return File(content, contentType);
        }

        #region Branch, Section and Class
        [HttpPost("Branch")]
        public IActionResult AddBranches(Branch branch)
        {
            return Ok(_studentService.AddBranches(branch));
        }
        [HttpPost("Caste")]
        public IActionResult AddCaste(Caste caste)
        {
            return Ok(_studentService.AddCaste(caste));
        }

        [HttpGet("BranchList")]
        public IActionResult BranchList()
        {
            return Ok(_studentService.GetBranches());
        }
        [HttpGet("CasteList")]
        public IActionResult CasteList()
        {
            return Ok(_studentService.GetCaste());
        }
        #endregion
    }
}
