
using BusinessLogic;
using EntitiesAndModels.Entities;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegisterController : ControllerBase
    {
        private readonly IRegisterService _registerService;
        public RegisterController(IRegisterService registerService)
        {
            _registerService = registerService;
        }
        [HttpGet]
        public IActionResult GetUser()
        {
            return Ok(_registerService.GetUsers());
        }
        [HttpPost]
        public IActionResult AddUser(Register register)
        {
            _registerService.AddUser(register);
            return Ok();
        }
        [HttpGet("Id")]
        public IActionResult GetUserWithId(int Id)
        {
            return Ok(_registerService.GetUserWithId(Id));
        }

        [HttpGet("Login")]
        public IActionResult Login(string email, string password, int roleId)
        {
            var user = _registerService.Login(email, password, roleId);
            if (user == null)
            {
                return BadRequest();
            }
            return Ok(user);
        }
        [HttpPut("ChangePassword")]
        public IActionResult UpdatePassword(string oldPassword, string newPassword)
        {
            return Ok(_registerService.UpdateRegister(oldPassword, newPassword));
        }
    }
}
