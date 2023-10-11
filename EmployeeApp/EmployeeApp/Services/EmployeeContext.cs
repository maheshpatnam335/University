using EmployeeApp.Modals;
using Microsoft.EntityFrameworkCore;

namespace EmployeeApp.Services
{
    public class EmployeeContext:DbContext
    { 
        public EmployeeContext(DbContextOptions options):base(options) { 
        }
        public DbSet<EmployeeRegistration>employeeregister { get; set; }
        public DbSet<EmployeeDetails>employeedetail { get; set; }
    }
}
