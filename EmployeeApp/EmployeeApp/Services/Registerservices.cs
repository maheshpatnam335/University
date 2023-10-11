using EmployeeApp.Modals;
using System.Collections.Generic;
using System.Linq;

namespace EmployeeApp.Services
{
    public class Registerservices
    {
        public EmployeeContext _context;
        public Registerservices(EmployeeContext context)
        {
            _context = context;

        }
        public void SaveRegister(EmployeeRegistration register)
        {
            _context.employeeregister.Add(register);
         
        }
        public EmployeeRegistration GetRegistrationLogin(string email, string password)
        {
            return _context.employeeregister.SingleOrDefault(x => x.email == email && x.password == password);
             
        }

        internal List<EmployeeRegistration> GetRegistrations()
        {
            return _context.employeeregister.Where(x => x.Id == 1).ToList();
        }
    }
}
