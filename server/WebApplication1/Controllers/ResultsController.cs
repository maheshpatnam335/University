using BusinessLogic;
using ClosedXML.Excel;
using EntitiesAndModels;
using EntitiesAndModels.Entities;
using EntitiesAndModels.Models.Attendance;
using EntitiesAndModels.Models.ImportModels;
using EntitiesAndModels.Models.Results;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ResultsController : MiniAuthController
    {
        private readonly IResultsService _service;
        private readonly IStudentService _studentService;
        public ResultsController(IResultsService service, IStudentService studentService)
        {
            _service = service;
            _studentService = studentService;
        }

        [HttpGet("Sample")]
        public IActionResult GetSample()
        {
            var contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

            var wb = new XLWorkbook();
            var ws = wb.Worksheets.Add("Results");
            var row = ws.Row(1);
            int i = 1;
            foreach (var item in NewAttribute.AttributeDisplay(typeof(ImportResults)))
            {
                row.Cell(i).Value = item.Attribute.title;
                i++;
            }
            var ms = new MemoryStream();
            wb.SaveAs(ms);
            var content = ms.ToArray();

            return File(content, contentType);
        }
        [HttpPost("Import")]
        public IActionResult ImportResults([FromForm] ImportRequest request)
        {
            if (request.File == null)
            {
                return BadRequest("File should be required.");
            }
            if (!NewAttribute.ValidateHeaders<StudentResults>(request.File, new StudentResults()))
            {
                return BadRequest("Invalid Headers");
            }
            var list = new List<StudentResults>();
            var wb = new XLWorkbook(request.File.OpenReadStream());
            var ws = wb.Worksheets.First();
            var totalRows = ws.LastRowUsed().RowNumber();
            var totalcols = ws.LastColumnUsed().ColumnNumber();
            for (int i = 2; i <= totalRows; i++)
            {
                var results = new StudentResults();
                var row = ws.Row(i);
                for (int j = 1; j <= totalcols; j++)
                {
                    var name = ws.Row(1).Cell(j).Value.ToString();
                    switch (name)
                    {
                        case "Roll Number":
                            results.RollNumber = row.Cell(j).Value.ToString();
                            var studentId = _studentService.GetList().First(x => x.RollNumber == row.Cell(j).Value.ToString()).Id;
                            results.StudentId = studentId;
                            break;
                        case "Academic Year(2020-2020)":
                            results.AcademicYear = row.Cell(j).Value.ToString();
                            break;
                        case "Semester":
                            results.Semester = Convert.ToInt32(row.Cell(j).Value.ToString());
                            break;
                        case "TotalMarks Marks":
                            results.TotalMarks = Convert.ToInt32(row.Cell(j).Value.ToString());
                            break;
                    }

                }
                list.Add(results);
            }
            return Ok(_service.AddResults(list));
        }

        [HttpGet("CheckResults")]
        public IActionResult CheckResults([FromQuery] CheckResultsModel model)
        {
            return Ok(_service.CheckResults(model));
        }

        [HttpGet("ExportResults")]
        public IActionResult ExportResults()
        {
            var contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
            var wb = new XLWorkbook();
            var ws = wb.Worksheets.Add("Export Results");
            var students = _service.GetStudentResults().ToList();

            for (int i = 2; i < students.Count(); i++)
            {
                ws.Cell(1, 1).Value = "Roll Number";
                ws.Cell(1, 2).Value = "Name";
                ws.Cell(1, 3).Value = "Total Marks";
                ws.Cell(1, 4).Value = "Academic Year";
                ws.Cell(1, 5).Value = "Semester";

                ws.Cell(1, 1).Style.Fill.SetBackgroundColor(XLColor.LightSeaGreen);
                ws.Cell(1, 2).Style.Fill.SetBackgroundColor(XLColor.LightSeaGreen);
                ws.Cell(1, 3).Style.Fill.SetBackgroundColor(XLColor.LightSeaGreen);
                ws.Cell(1, 4).Style.Fill.SetBackgroundColor(XLColor.LightSeaGreen);
                ws.Cell(1, 5).Style.Fill.SetBackgroundColor(XLColor.LightSeaGreen);


                ws.Cell(1, 1).Style.Font.FontColor = XLColor.White;
                ws.Cell(1, 3).Style.Font.FontColor = XLColor.White;
                ws.Cell(1, 4).Style.Font.FontColor = XLColor.White;
                ws.Cell(1, 5).Style.Font.FontColor = XLColor.White;
                ws.Cell(1, 2).Style.Font.FontColor = XLColor.White;

                ws.Cell(1, 1).Style.Font.Bold = true;
                ws.Cell(1, 2).Style.Font.Bold = true;
                ws.Cell(1, 3).Style.Font.Bold = true;
                ws.Cell(1, 4).Style.Font.Bold = true;
                ws.Cell(1, 5).Style.Font.Bold = true;

                ws.Row(i).Cell(1).Style.Fill.SetBackgroundColor(XLColor.Yellow);
                ws.Row(i).Cell(2).Style.Fill.SetBackgroundColor(XLColor.Yellow);
                ws.Row(i).Cell(3).Style.Fill.SetBackgroundColor(XLColor.Yellow);
                ws.Row(i).Cell(4).Style.Fill.SetBackgroundColor(XLColor.Yellow);
                ws.Row(i).Cell(5).Style.Fill.SetBackgroundColor(XLColor.Yellow);

                ws.Row(i).Cell(1).Value = students[i - 2].RollNumber;
                ws.Row(i).Cell(2).Value = students[i - 2].Student.Name;
                ws.Row(i).Cell(3).Value = students[i - 2].TotalMarks;
                ws.Row(i).Cell(4).Value = students[i - 2].AcademicYear;
                ws.Row(i).Cell(5).Value = students[i - 2].Semester;
            }
            var ms = new MemoryStream();
            wb.SaveAs(ms);
            var content = ms.ToArray();
            return File(content, contentType);
        }
    }
}
