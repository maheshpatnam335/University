using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController, Authorize]
    public class MiniAuthController : ControllerBase
    {
        public int Uid => int.Parse(User.Claims.FirstOrDefault(x => x.Type.Equals("Id", StringComparison.OrdinalIgnoreCase)).Value);

    }
}
