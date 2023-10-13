using Database;
using EntitiesAndModels;
using EntitiesAndModels.Entities;
using EntitiesAndModels.Models.Authorisation;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace BusinessLogic
{
    public interface IRegisterService
    {
        Register AddUser(Register register);
        Register UpdateRegister(string oldPassword, string newPassword);
        IEnumerable<Register> GetUsers();
        Register GetUserWithId(int id);
        dynamic Login(string email, string password, int roleId);
        TokenModel RefreshGeneratedToken(TokenModel model, int Id);
    }
    public class RegisterService : IRegisterService
    {
        private readonly UniversityContext _universityContext;
        private readonly IUnitOfWork _uow;
        private readonly IConfiguration _configuration;
        public RegisterService(UniversityContext universityContext, IUnitOfWork uow, IConfiguration configuration)
        {
            _universityContext = universityContext;
            _uow = uow;
            _configuration = configuration;
        }
        public Register AddUser(Register register)
        {
            _universityContext.Registers.Add(register);
            _universityContext.SaveChanges();
            return register;
        }
        public IEnumerable<Register> GetUsers()
        {
            return _universityContext.Registers.ToList();
        }
        public Register GetUserWithId(int id)
        {
            return _universityContext.Registers.Single(x => x.Id == id);
        }
        public dynamic Login(string email, string password, int roleId)
        {
            var result = new Result<Register>();
            var user = new Register();
            try
            {
                user = _universityContext.Registers.SingleOrDefault(x => (x.EmployeeId == email || x.RoleNumber == email)
                && x.Password == password && x.RoleId == roleId);
                if (user == null)
                {
                    result.AddMessageItem(new ReturnMessage("Invalid details"));
                    return result;
                }
                else
                {
                    user.RefreshToken = GenerateString();
                    user.RefreshTokenExpiry = DateTime.Now.AddHours(4);
                    result.ReturnValue = user;
                    _uow.GetDbSet<Register>().Update(user);
                    _uow.SaveChanges();
                }
                return new
                {
                    jwtToken = GenerateAccesstoken(user),
                    refreshToken = user.RefreshToken,
                    refreshTokenExpiry = user.RefreshTokenExpiry,
                    roleId = user.RoleId,
                    loginId = user.Id
                };
            }
            catch (Exception ex)
            {
                result.AddMessageItem(new ReturnMessage(ex.Message));
            }
            return result;
        }

        private string GenerateString()
        {
            Random generatedNumber = new Random();
            var random = generatedNumber.Next();
            return random.ToString();
        }

        public string GenerateAccesstoken(Register user)
        {
            var claims = new[] { new Claim("Id", user.Id.ToString()) };
            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtAuthenticate:Key"] ?? ""));
            var singingCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                _configuration["JwtAuthenticate:Issuer"],
                _configuration["JwtAuthenticate:Issuer"],
                claims,
                expires: DateTime.Now.AddSeconds(30),
                signingCredentials: singingCredentials
                );
            return new JwtSecurityTokenHandler().WriteToken(token).ToString();
        }
        public Register UpdateRegister(string oldPassword, string newPassword)
        {
            var register = _uow.GetDbSet<Register>().GetWithId(x => x.Password == oldPassword);
            register.Password = newPassword;

            _uow.GetDbSet<Register>().Update(register);
            _uow.SaveChanges();
            return register;
        }

        public TokenModel RefreshGeneratedToken(TokenModel model, int Id)
        {
            var user = _uow.GetDbSet<Register>().GetWithId(x => x.Id == Id);
            model.RefreshToken = GenerateString();
            model.AccessToken = GenerateAccesstoken(user ?? new Register());

            return model;
        }
    }
}