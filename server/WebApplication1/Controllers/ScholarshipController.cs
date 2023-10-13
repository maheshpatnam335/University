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
    public class ScholarshipController : MiniAuthController
    {
        private readonly IScholarshipService _service;
        private readonly IStudentService _studentService;

        public ScholarshipController(IScholarshipService service, IStudentService studentService)
        {
            _service = service;
            _studentService = studentService;
        }

        [HttpPost]
        public IActionResult AddScholarships([FromForm] ImportRequest request)
        {
            var scolarships = new List<Scholarship>();
            if (request.File == null || !request.File.FileName.EndsWith(".xlsx"))
            {
                return BadRequest("Excel file required");
            }
            else if (NewAttribute.ValidateHeaders<ImportScholarship>(request.File, new ImportScholarship()))
            {
                return BadRequest("Invalid Headers");
            }
            else
            {
                var wb = new XLWorkbook(request.File.OpenReadStream());
                var ws = wb.Worksheets.First();

                var totalRows = ws.LastRowUsed().RowNumber();
                for (int i = 2; i <= totalRows; i++)
                {
                    Scholarship scolarship = new Scholarship();
                    var row = ws.Row(i);
                    foreach (var item in NewAttribute.AttributeDisplay(typeof(ImportScholarship)))
                    {
                        switch (item.Attribute.title)
                        {
                            case "Roll Number":
                                scolarship.RollNumber = row.Cell(1).Value.ToString();
                                var student = _studentService.GetList().First(x => x.RollNumber == row.Cell(1).Value.ToString());
                                scolarship.StudentId = student.Id;
                                break;
                            case "Application Number":
                                scolarship.ApplicationNumber = row.Cell(2).Value.ToString();
                                break;
                            case "Academic Year":
                                scolarship.AcademicYear = row.Cell(3).Value.ToString();
                                break;
                            case "Pending At":
                                scolarship.PendingAt = row.Cell(4).Value.ToString();
                                break;
                            case "Status":
                                scolarship.Status = Convert.ToInt32(row.Cell(5).Value.ToString());
                                break;
                            case "Remitted date":
                                scolarship.RemmittedDate = Convert.ToDateTime(row.Cell(6).Value.ToString());
                                break;
                            case "Tution Fee":
                                scolarship.TutionFee = Convert.ToDecimal(row.Cell(7).Value.ToString());
                                break;
                            case "Exam Fee":
                                scolarship.ExamFee = Convert.ToDecimal(row.Cell(8).Value.ToString());
                                break;
                            case "Mess Fee":
                                scolarship.MessFee = Convert.ToDecimal(row.Cell(9).Value.ToString());
                                break;
                            case "Is Pending":
                                scolarship.IsPending = Convert.ToBoolean(row.Cell(10).Value.ToString());
                                break;
                            default: break;
                        }
                    }
                    scolarships.Add(scolarship);
                }

                var result = _service.AddScholarshipDetails(scolarships);
                if (result.HasError)
                {
                    return BadRequest(result);
                }
            }


            return Ok();
        }
        [HttpGet("Sample")]
        public IActionResult SampleScholarship()
        {
            var contentype = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
            var wb = new XLWorkbook();
            var ws = wb.Worksheets.Add("Scholarship");
            var row = ws.Row(1);
            int i = 1;
            var attr = NewAttribute.AttributeDisplay(typeof(ImportScholarship));
            foreach (var item in attr)
            {
                row.Cell(i).Value = item.Attribute.title;
                i++;
            }
            using (var ms = new MemoryStream())
            {
                wb.SaveAs(ms);
                var content = ms.ToArray();
                return File(content, contentype);
            }
        }
        [HttpGet("Status")]
        public IActionResult GetStatus(string rollNumber, string academicYear)
        {
            return Ok(_service.GetStatus(rollNumber, academicYear));
        }

        [HttpGet("List")]
        public IActionResult GetList()
        {
            return Ok(_service.GetList());
        }
    }
}
