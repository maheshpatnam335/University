using Database;
using EntitiesAndModels.Entities;

namespace BusinessLogic
{
    public interface IRegisterService
    {
        Register AddUser(Register register);
        Register UpdateRegister(string oldPassword, string newPassword);
        IEnumerable<Register> GetUsers();
        Register GetUserWithId(int id);
        Register Login(string email, string password, int roleId);
    }
    public class RegisterService : IRegisterService
    {
        private readonly UniversityContext _universityContext;
        private readonly IUnitOfWork _uow;
        public RegisterService(UniversityContext universityContext, IUnitOfWork uow)
        {
            _universityContext = universityContext;
            _uow = uow;
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
        public Register UpdateRegister(string oldPassword, string newPassword)
        {
            var register = _uow.GetDbSet<Register>().GetWithId(x => x.Password == oldPassword);
            register.Password = newPassword;

            _uow.GetDbSet<Register>().Update(register);
            _uow.SaveChanges();
            return register;
        }
    }
}