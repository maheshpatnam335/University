////using EntitiesAndModels;
////using EntitiesAndModels.Models.ImportModels;
////using Microsoft.AspNetCore.Mvc;
////using System.Net;
////using System.Web.Http;
////using HttpGetAttribute = Microsoft.AspNetCore.Mvc.HttpGetAttribute;
////using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

////namespace WebApi.Controllers
////{
////    [Route("api/[controller]")]
////    [ApiController]
////    public class TestController : ControllerBase
////    {
////        public TestController()
////        {

////        }
////        [HttpGet]
////        public IActionResult TestAttributes()
////        {
////            foreach (var item in NewAttribute.AttributeDisplay(typeof(ImportStudent)))
////            {
////                var name = item.title;
////            }
////            return Ok();
////        }
////        [HttpGet("Test")]
////        public IActionResult TestGet()
////        {
////            var response = new HttpResponseMessage(HttpStatusCode.NotFound)
////            {
////                Content = new StringContent("Employee doesn't exist", System.Text.Encoding.UTF8, "text/plain"),
////                StatusCode = HttpStatusCode.NotFound
////            };
////            throw new HttpResponseException(response);
////        }
////    }
////}
