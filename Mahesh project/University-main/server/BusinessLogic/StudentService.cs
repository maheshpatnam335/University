using Database;
using EntitiesAndModels.Entities;

namespace BusinessLogic
{
    public interface IStudentService
    {
        Student AddStudent(Student student);
        IEnumerable<Student> GetStudents(int branch, int classId, int section);
    }
    public class StudentService : IStudentService
    {
        private readonly UniversityContext _universityContext;
        public StudentService(UniversityContext universityContext)
        {
            _universityContext = universityContext;
        }
        public Student AddStudent(Student student)
        {
            try
            {
                _universityContext.Students.Add(student);
                _universityContext.SaveChanges();
            }
            catch
            {
                throw new InvalidOperationException();
            }

            return student;
        }
        public IEnumerable<Student> GetStudents(int branch, int classId, int section)
        {
            var a = _universityContext.Students.Where(x => x.BranchId == branch && ( classId !=0 ?  x.Class == classId: (section !=0? x.SectionId == section:x.BranchId==branch)));
            return a;
        }
    }
}
