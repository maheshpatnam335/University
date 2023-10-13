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
    public class AttendanceController : MiniAuthController
    {
        private readonly IAttendanceService _service;
        private readonly IStudentService _studentService;
        private readonly IMapper _mapper;
        public AttendanceController(IAttendanceService service, IMapper mapper, IStudentService studentService)
        {
            _service = service;
            _mapper = mapper;
            _studentService = studentService;
        }
        [HttpPut("EditAttendanceList")]
        public IActionResult EditAttendanceList(AttendanceRequest request)
        {

            return Ok(_service.EditAttendanceList(request));
        }

        [HttpGet("ExcelExport")]
        public IActionResult AttendanceToExcel()
        {
            var contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
            var wb = new XLWorkbook();
            var ws = wb.Worksheets.Add("Attendance List");
            int j = 1;
            foreach (var item in NewAttribute.AttributeDisplay(typeof(ImportAttendance)))
            {
                ws.Row(1).Cell(j).Value = item.Attribute.title;
                j++;
            }
            j = 1;
            for (int i = 2; i < _service.AttendanceList().ToList().Count; i++)
            {
                foreach (var item in NewAttribute.AttributeDisplay(typeof(ImportAttendance)))
                {
                    switch (item.Attribute.title)
                    {
                        case "Roll Number":
                            ws.Row(i).Cell(1).Value = _service.AttendanceList().ToList()[j - 1].RollNumber;
                            break;
                        case "Attendance Percentage":
                            ws.Row(i).Cell(2).Value = _service.AttendanceList().ToList()[j - 1].AttendancePercentage;
                            break;
                        case "Month":
                            ws.Row(i).Cell(3).Value = _service.AttendanceList().ToList()[j - 1].Month;
                            break;
                        case "Status":
                            ws.Row(i).Cell(4).Value = _service.AttendanceList().ToList()[j - 1].Status;
                            break;
                    }
                }
                j++;
            }

            var ms = new MemoryStream();
            wb.SaveAs(ms);
            var content = ms.ToArray();
            return File(content, contentType);
        }

        [HttpPost("Attendance")]
        public IActionResult ImportAttendance([FromForm] ImportRequest request)
        {
            if (request.File == null || !request.File.FileName.EndsWith(".xlsx"))
            {
                return BadRequest("Excel file is required..");
            }
            if (NewAttribute.ValidateHeaders<ImportAttendance>(request.File, new ImportAttendance()))
            {
                return BadRequest("Invalid Headers");
            }
            var attendanceList = new List<Attendance>();
            var workBook = new XLWorkbook(request.File.OpenReadStream());
            var sheet = workBook.Worksheet(1);
            var totalRows = sheet.LastRowUsed().RowNumber();
            for (int item = 2; item <= totalRows; item++)
            {
                try
                {
                    var status = Convert.ToBoolean(sheet.Row(item).Cell(4).Value.ToString());
                    var rollNumber = sheet.Row(item).Cell(1).Value.ToString();
                    var student = _studentService.GetList().First(x => x.RollNumber == rollNumber);
                    var attendance = new Attendance
                    {
                        AttendancePercentage = Convert.ToInt32(sheet.Row(item).Cell(2).Value.ToString()),
                        RollNumber = rollNumber,
                        Month = request.Month,
                        Status = status,
                        StudentId = student.Id,
                    };
                    attendanceList.Add(attendance);
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
            var result = _service.AddAttendanceList(attendanceList);
            if (result.HasError)
            {
                return BadRequest(result);
            }
            return Ok();
        }
        [HttpGet("Sample")]
        public IActionResult DownloadExcel()
        {
            string contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
            try
            {
                using (var workbook = new XLWorkbook())
                {
                    IXLWorksheet worksheet =
                    workbook.Worksheets.Add("Attendance");
                    worksheet.Cell(1, 1).Value = "Roll Number";
                    worksheet.Cell(1, 2).Value = "Attendance Percentage";
                    worksheet.Cell(1, 3).Value = "Month";
                    worksheet.Cell(1, 4).Value = "Status";
                    using (var stream = new MemoryStream())
                    {
                        workbook.SaveAs(stream);
                        var content = stream.ToArray();
                        return File(content, contentType);
                    }
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("AttendanceList")]
        public IActionResult AttendanceList()
        {
            return Ok(_service.AttendanceList());
        }
        [HttpGet("AttendanceReportsList")]
        public IActionResult AttendanceReportsList()
        {
            return Ok(_mapper.Map<List<AttendanceModel>>(_service.AttendanceList()));
        }
    }
}
