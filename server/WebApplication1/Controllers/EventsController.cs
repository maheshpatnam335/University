using AutoMapper;
using BusinessLogic;
using EntitiesAndModels.Entities.Events;
using EntitiesAndModels.Models.Events;
using Microsoft.AspNetCore.Mvc;
using System.Drawing;
using System.Drawing.Imaging;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventsController : MiniAuthController
    {
        private readonly IMapper _mapper;
        private readonly IEventsService _service;
        public EventsController(IMapper mapper, IEventsService service)
        {
            _mapper = mapper;
            _service = service;
        }

        [HttpPost("Events")]
        public IActionResult AddEvents([FromForm] EventsModel model)
        {
            if (model.File == null)
            {
                return BadRequest();
            }
            var image = Image.FromStream(model.File.OpenReadStream());
            model.ImageName=model.File.FileName;
            var resizedImage = new Bitmap(image, new Size(64, 64));
            var ms = new MemoryStream();
            model.File.CopyTo(ms);
            //  var entity = _mapper.Map<Events>(model);
            model.ImageData = ms.ToArray();
            var resizedMs = new MemoryStream();
            resizedImage.Save(resizedMs, ImageFormat.Jpeg);
            model.ResizeImageData = resizedMs.ToArray();
            return Ok(_service.AddEvents(_mapper.Map<Events>(model)));
        }

        [HttpGet("Cultural")]
        public IActionResult GetCultural()
        {
           return Ok(_service.GetCultural());
        }
        [HttpGet("Technical")]
        public IActionResult GetTechnical()
        {
            return Ok(_service.GetTechnical());
        }
        [HttpGet("Fun")]
        public IActionResult GetFun()
        {
            return Ok(_service.GetFun());
        }
        [HttpGet("Literary")]
        public IActionResult GetLiterary()
        {
            return Ok(_service.GetLiterary());
        }
        [HttpGet("PastEvents")]
        public IActionResult GetPastEvents()
        {
            return Ok(_service.GetPastEvents());
        }
    }
}
