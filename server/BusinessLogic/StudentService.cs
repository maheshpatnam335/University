using Database;
using EntitiesAndModels;
using EntitiesAndModels.Entities;

namespace BusinessLogic
{
    public interface IStudentService
    {
        Result<Student> AddStudent(Student student);
        IEnumerable<Student> GetList();
        IEnumerable<Student> GetStudents(int branch, int classId, int section);
        Result<Student> AddStudentsList(List<Student> students);
        Result<Branch> AddBranches(Branch branch);
        IEnumerable<Branch> GetBranches();
        IEnumerable<Caste> GetCaste();
        Result<Caste> AddCaste(Caste caste);

    }
    public class StudentService : IStudentService
    {
        private readonly UniversityContext _universityContext;
        private readonly IUnitOfWork _uow;
        public StudentService(UniversityContext universityContext, IUnitOfWork uow)
        {
            _universityContext = universityContext;
            _uow = uow;
        }
        public Result<Student> AddStudent(Student student)
        {
            var result = new Result<Student>();
            try
            {
                if (!_uow.GetDbSet<Student>().Get(predicate: x => x.RollNumber != student.RollNumber).Any())
                {
                    if (student.RollNumber.StartsWith("1", StringComparison.OrdinalIgnoreCase)
                        || student.RollNumber.StartsWith("2", StringComparison.OrdinalIgnoreCase))
                    {
                        _universityContext.Students.Add(student);
                        _universityContext.SaveChanges();
                    }

                }
                else
                {
                    result.AddMessageItem(new ReturnMessage("Already exists"));
                }

            }
            catch (Exception ex)
            {
                result.AddMessageItem(new ReturnMessage(ex.Message));
            }

            return result;
        }
        public IEnumerable<Student> GetStudents(int branch, int classId, int section)
        {
            var a = _universityContext.Students.Where(x => x.BranchId == branch && (classId != 0 ? x.Class == classId : (section != 0 ? x.SectionId == section : x.BranchId == branch)));
            return a;
        }
        public IEnumerable<Student> GetList()
        {
            return _universityContext.Students;
        }
        public Result<Student> AddStudentsList(List<Student> students)
        {
            var result = new Result<Student>();
            try
            {
                foreach (var student in students)
                {
                    var exists = _uow.GetDbSet<Student>().Get(predicate: x => x.RollNumber == student.RollNumber).Count();
                    if (exists == 0)
                    {
                        _uow.GetDbSet<Student>().Add(student);
                    }
                }
                _uow.SaveChanges();

            }
            catch (Exception ex)
            {
                result.AddMessageItem(new ReturnMessage(ex.Message));
            }
            return result;
        }

        #region Branch, Section and Class
        public Result<Branch> AddBranches(Branch branch)
        {
            var result = new Result<Branch>();
            try
            {
                _uow.GetDbSet<Branch>().Add(branch);
                _uow.SaveChanges();
            }
            catch (Exception ex)
            {
                result.AddMessageItem(new ReturnMessage(ex.Message));
            }
            return result;
        }
        public Result<Caste> AddCaste(Caste caste)
        {
            var result = new Result<Caste>();
            try
            {
                _uow.GetDbSet<Caste>().Add(caste);
                _uow.SaveChanges();
            }
            catch (Exception e)
            {
                result.AddMessageItem(new ReturnMessage(e.Message));
            }
            return result;
        }
        public IEnumerable<Branch> GetBranches()
        {
            return _uow.GetDbSet<Branch>().Get();
        }
        public IEnumerable<Caste> GetCaste()
        {
            return _uow.GetDbSet<Caste>().Get();
        }
        #endregion
    }
}
