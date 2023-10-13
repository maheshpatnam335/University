using EntitiesAndModels.Entities;
using EntitiesAndModels.Entities.Events;
using EntitiesAndModels.Entities.Sports;
using EntitiesAndModels.Models.Library;
using Microsoft.EntityFrameworkCore;

namespace Database
{
    public class UniversityContext : DbContext
    {
        public UniversityContext(DbContextOptions<UniversityContext> dbContext) : base(dbContext)
        {

        }
        public DbSet<Register> Registers { get; set; }
        public DbSet<Student> Students { get; set; }
        public DbSet<Teacher> Teachers { get; set; }
        public DbSet<Attendance> Attendance { get; set; }
        public DbSet<Branch> Branches { get; set; }
        public DbSet<Caste> Castes { get; set; }
        public DbSet<Scholarship> Scholarship { get; set; }
        public DbSet<StudentResults> Results { get; set; }
        public DbSet<SubjectMarks> SubjectMarks { get; set; }
        public DbSet<Books> Books { get; set; }
        public DbSet<Events> Events { get; set; }
        public DbSet<Sports> Sports { get; set; }
    }
}
