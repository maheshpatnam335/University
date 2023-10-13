using AutoMapper;
using BusinessLogic;
using EntitiesAndModels.Entities.Sports;
using EntitiesAndModels.Models.Sports;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SportsController : MiniAuthController
    {
        private readonly ISportsService _sportsService;
        private readonly IMapper _mapper;
        public SportsController(ISportsService sportsService,IMapper mapper)
        {
            _sportsService = sportsService;
            _mapper = mapper;
        }
        [HttpPost("AddSports")]
        public IActionResult AddSports([FromForm] SportsModel model)
        {
            return Ok(_sportsService.AddSports(_mapper.Map<Sports>(model)));
        }

        [HttpGet("Sports")]
        public IActionResult GetSports()
        {
            return Ok(_sportsService.GetSports());
        }
    }
}
