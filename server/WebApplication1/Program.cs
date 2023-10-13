using BusinessLogic;
using Database;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using WebApi.AutoMapper;

var builder = WebApplication.CreateBuilder(args);
// test
builder.Services.AddControllers();
var dbConnection = builder.Configuration.GetConnectionString("DBConnection");
builder.Services.AddDbContext<UniversityContext>(options =>
                  options.UseSqlServer(dbConnection, builder => builder.MigrationsAssembly(typeof(Program).Assembly.FullName)))
    .AddUnitOfWork<UniversityContext>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddCors(x =>
{
    x.AddDefaultPolicy(x => x.AllowAnyMethod().AllowAnyOrigin().AllowAnyHeader());
});
builder.Services.AddScoped<IRegisterService, RegisterService>();
builder.Services.AddScoped<ILibraryService, LibraryService>();
builder.Services.AddScoped<IStudentService, StudentService>();
builder.Services.AddScoped<ITeacherService, TeacherService>();
builder.Services.AddScoped<IScholarshipService, ScholarshipService>();
builder.Services.AddScoped<IResultsService, ResultsService>();
builder.Services.AddScoped<IAttendanceService, AttendanceService>();
builder.Services.AddScoped<IEventsService, EventsService>();
builder.Services.AddScoped<ISportsService, SportsService>();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
   .AddJwtBearer(options =>
   {
       options.TokenValidationParameters = new TokenValidationParameters
       {
           ValidateIssuer = true,
           ValidateAudience = true,
           ValidateLifetime = true,
           ValidateIssuerSigningKey = true,
           ValidIssuer = builder.Configuration["JwtAuthenticate:Issuer"],
           ValidAudience = builder.Configuration["JwtAuthenticate:Issuer"],
           IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JwtAuthenticate:Key"]))
       };
   });
builder.Services.AddAuthorization();

builder.Services.AddSwaggerGen();
_ = builder.Services.AddAutoMapper(typeof(UniversityProfile));



var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors();

app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();

