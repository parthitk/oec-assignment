using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using RL.Data.DataModels;
using RL.Data;
using System.Data.Entity;

namespace RL.Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserProcedureController : ControllerBase
    {
        private readonly ILogger<PlanProcedureController> _logger;
        private readonly RLContext _context;

        public UserProcedureController(ILogger<PlanProcedureController> logger, RLContext context)
        {
            _logger = logger;
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        [HttpGet]
        [EnableQuery]
        public  IEnumerable<UserProcedure> Get()
        {
            return  _context.UserProcedures;
        }
    }
}
