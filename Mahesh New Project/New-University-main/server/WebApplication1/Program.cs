using BusinessLogic;
using Database;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);


var dbConnection = builder.Configuration.GetConnectionString("DBConnection");
builder.Services.AddDbContext<UniversityContext>(options =>
                  options.UseSqlServer(dbConnection, builder => builder.MigrationsAssembly(typeof(Program).Assembly.FullName)))
    .AddUnitOfWork<UniversityContext>();

builder.Services.AddScoped<IRegisterService, RegisterService>();
builder.Services.AddScoped<IStudentService, StudentService>();
builder.Services.AddScoped<ITeacherService, TeacherService>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors(x => x.AllowAnyHeader().AllowAnyOrigin().AllowAnyMethod());

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
