using Database;
using EntitiesAndModels;
using EntitiesAndModels.Entities;

namespace BusinessLogic
{
    public interface ITeacherService
    {
        Result<Teacher> AddTeacher(Teacher teacher);
        IEnumerable<Teacher> GetTeachersWithDepartment(int id);
        Teacher GetTeacherWithId(int id);
        IEnumerable<Teacher> GetList();
        Result<Teacher> AddTeachersList(List<Teacher> teachers);
    }
    public class TeacherService : ITeacherService
    {
        private readonly IUnitOfWork _uow;
        private readonly UniversityContext _universityContext;
        public TeacherService(UniversityContext universityContext, IUnitOfWork uow)
        {
            _universityContext = universityContext;
            _uow = uow;
        }
        public Result<Teacher> AddTeacher(Teacher teacher)
        {
            var result = new Result<Teacher>();
            try
            {
                _uow.GetDbSet<Teacher>().Add(teacher);
                _uow.SaveChanges();
            }
            catch (Exception ex)
            {
                result.AddMessageItem(new ReturnMessage(ex.Message));
            }
            return result;
        }
        public IEnumerable<Teacher> GetTeachersWithDepartment(int id)
        {
            var teachers = _universityContext.Teachers.Where(x => x.Department == id);
            return teachers;
        }
        public Teacher GetTeacherWithId(int id)
        {
            return _uow.GetDbSet<Teacher>().GetWithId(predicate: x => x.Id == id);
        }
        public IEnumerable<Teacher> GetList()
        {
            return _universityContext.Set<Teacher>().ToList();
        }
        public Result<Teacher> AddTeachersList(List<Teacher> teachers)
        {
            var result = new Result<Teacher>();
            try
            {
                _uow.GetDbSet<Teacher>().AddBulk(teachers);
                _uow.SaveChanges();
            }
            catch (Exception ex)
            {
                result.AddMessageItem(new ReturnMessage(ex.Message));
            }

            return result;
        }
    }
}
