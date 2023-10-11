using EmployeeApp.Modals;
using EmployeeApp.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
var connectionStrings = builder.Configuration.GetConnectionString("DBConnection");

builder.Services.AddDbContext<EmployeeContext>(o => o.UseSqlServer(connectionStrings,
    b => b.MigrationsAssembly(typeof(Program).Assembly.FullName)));
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<Registerservices>();
builder.Services.AddScoped<Detailsservices>();//for every user once
//builder.Services.AddSingleton<Detailsservices>();//for once
//builder.Services.AddTransient<Detailsservices>();
builder.Services.AddCors(x => x.AddDefaultPolicy(x => x.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin()));


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();
app.UseCors();

app.Run();
