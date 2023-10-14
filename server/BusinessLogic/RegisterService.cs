using Database;
using EntitiesAndModels;
using EntitiesAndModels.Entities;
using EntitiesAndModels.Models.Authorisation;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Mail;
using System.Net;
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
        int SendEmail(string emailToAddress);
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

        public int SendEmail(string emailToAddress)
        {            string smtpAddress = "smtp.gmail.com";
            int portNumber = 587;
            int otp = Convert.ToInt32(GenerateString());
            bool enableSSL = true;
            string emailFromAddress = "maheshpatnam30@gmail.com"; //Sender Email Address
            string password = "xcka afny abfe mkwn"; //Sender Password

            string subject = "Verify OTP";
            string body = "<div style='font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2'>"
         + "<div style='margin:50px auto;width:70%;padding:20px 0'>" +
           "<div style='border-bottom:1px solid #eee'>" +
             "<a href='' style='font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600'>Holy Mary Institute of Technology and Science</a>" +
           "</div>" +
           "<p style='font-size:1.1em'>Hi,</p>" +
           "<p>Thank you for choosing HITS. Use the following OTP to complete your Sign Up procedures. OTP is valid for 5 minutes</p>" +
           "<h2 style='background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;'>" + otp + "</h2>" +
           "<p style='font-size:0.9em;'>Regards,<br />HITS</p>" +
           "<hr style='border:none;border-top:1px solid #eee' />" +
           "<div style='float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300'>" +
            " <p>HITS Inc</p>  <p>Keesara, ghatkesar</p> <p>Hyderabad</p> </div></div></div>";
            using (MailMessage mail = new MailMessage())
            {
                mail.From = new MailAddress(emailFromAddress, "Holy Mary");
                mail.To.Add(emailToAddress);
                mail.Subject = subject;
                mail.Body = body;
                mail.IsBodyHtml = true;
                //mail.Attachments.Add(new Attachment("D:\\TestFile.txt"));//--Uncomment this to send any attachment
                using (SmtpClient smtp = new SmtpClient(smtpAddress, portNumber))
                {
                    smtp.Credentials = new NetworkCredential(emailFromAddress, password);
                    smtp.EnableSsl = enableSSL;
                    smtp.Send(mail);
                }
            }
            
            return otp;
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