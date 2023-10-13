using EntitiesAndModels.Models.ImportModels;
using FluentValidation;
using Microsoft.AspNetCore.Http;

namespace EntitiesAndModels.Models.Attendance
{
    public class ImportRequest
    {
       //// public string? FileName { get; set; }
        public DateTime Month { get; set; }
        public IFormFile? File { get; set; }
    }
    public class AttendanceRequest
    {
        public int Id { get; set; }
        public int Attendance { get; set; }
    }

    public  class ImportRequestValidator : AbstractValidator<ImportRequest> 
    {
        public ImportRequestValidator()
        {
            RuleFor(x => x.File).NotNull().WithMessage("File is Required...");
            RuleFor(x => x.Month).NotEmpty().WithMessage("Date is required..");
        }
    }
}
