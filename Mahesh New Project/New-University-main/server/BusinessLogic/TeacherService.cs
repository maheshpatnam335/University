using Database;
using EntitiesAndModels.Entities;

namespace BusinessLogic
{
    public interface ITeacherService
    {
        Teacher AddTeacher(Teacher teacher);
        IEnumerable<Teacher> GetTeachersWithDepartment(int id);
        Teacher GetTeacherWithId(int id);
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
        public Teacher AddTeacher(Teacher teacher)
        {
            try
            {
                _uow.GetDbSet<Teacher>().Add(teacher);
                _uow.SaveChanges();
                return teacher;
            }
            catch
            {
                return null;
            }
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
    }
}
