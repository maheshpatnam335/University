using Database;
using EntitiesAndModels.Entities;

namespace BusinessLogic
{
    public interface IRegisterService
    {
        Register AddUser(Register register);
        IEnumerable<Register> GetUsers();
        Register GetUserWithId(int id);
        Register Login(string email, string password, int roleId);
    }
    public class RegisterService : IRegisterService
    {
        private readonly UniversityContext _universityContext;
        public RegisterService(UniversityContext universityContext)
        {
            _universityContext = universityContext;
        }
        public Register AddUser(Register register)
        {
            _universityContext.Registers.Add(register);
            _universityContext.SaveChanges();
            return register;
        }
        public IEnumerable<Register> GetUsers()
        {
            var list = _universityContext.Registers.ToList();
            return list;
        }

        public Register GetUserWithId(int id)
        {
            var register = _universityContext.Registers.Single(x => x.Id == id);
            return register;
        }
        public Register Login(string email, string password, int roleId)
        {
            var user = new Register();
            try
            {
                user = _universityContext.Registers.SingleOrDefault(x => (x.EmployeeId == email || x.RoleNumber == email)
                && x.Password == password && x.RoleId == roleId);
            }
            catch
            {
                throw new InvalidOperationException();
            }
            return user;
        }
    }
}