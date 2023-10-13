
using AutoMapper;
using BusinessLogic;
using EntitiesAndModels.Entities;
using EntitiesAndModels.Models.Authorisation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegisterController : ControllerBase
    {
        private readonly IRegisterService _registerService;
        private readonly IMapper _mapper;
        public RegisterController(IRegisterService registerService, IMapper mapper)
        {
            _registerService = registerService;
            _mapper = mapper;
        }
        [HttpGet, Authorize]
        public IActionResult GetUser()
        {
            return Ok(_registerService.GetUsers());
        }
        [HttpPost]
        public IActionResult AddUser(RegisterModel register)
        {
            _registerService.AddUser(_mapper.Map<Register>(register));
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
            return Ok(user);
        }
        [HttpPut("ChangePassword")]
        public IActionResult UpdatePassword(string oldPassword, string newPassword)
        {
            return Ok(_registerService.UpdateRegister(oldPassword, newPassword));
        }

        [HttpPost("Main"), Authorize]
        public IActionResult GetMain(TokenModel model)
        {
            Claim Id = User.Claims.FirstOrDefault(x => x.Type.Equals("Id", StringComparison.OrdinalIgnoreCase));
            return Ok(_registerService.RefreshGeneratedToken(model, Convert.ToInt32(Id.Value)));
        }
    }
}
