using Database;
using EntitiesAndModels;
using EntitiesAndModels.Entities;
using EntitiesAndModels.Models.Attendance;
using Microsoft.EntityFrameworkCore;

namespace BusinessLogic
{
    public interface IAttendanceService
    {
        IEnumerable<Attendance> AttendanceList();
        Attendance EditAttendanceList(AttendanceRequest request);
        Result<Attendance> AddAttendanceList(List<Attendance> attendances);
    }
    public class AttendanceService : IAttendanceService
    {
        private readonly IUnitOfWork UnitOfWork;
        public AttendanceService(IUnitOfWork unitOfWork)
        {
            UnitOfWork = unitOfWork;
        }
        public IEnumerable<Attendance> AttendanceList()
        {
            return UnitOfWork.GetDbSet<Attendance>().Get(include: x => x.Include(x => x.Student));
        }
        public Result<Attendance> AddAttendanceList(List<Attendance> attendances)
        {
            var result = new Result<Attendance>();
            try
            {
                UnitOfWork.GetDbSet<Attendance>().AddBulk(attendances);
                UnitOfWork.SaveChanges();
            }
            catch(Exception ex)
            {
                result.AddMessageItem(new ReturnMessage(ex.Message));
            }
            return result;
        }
        public Attendance EditAttendanceList(AttendanceRequest request)
        {
            if (request.Id != 0 && request.Attendance != 0)
            {
                var att = UnitOfWork.GetDbSet<Attendance>().Get().First(x => x.StudentId == request.Id);
                att.AttendancePercentage = request.Attendance;
                UnitOfWork.GetDbSet<Attendance>().Update(att);
                UnitOfWork.SaveChanges();
            }
            return new Attendance();
        }
    }
}
