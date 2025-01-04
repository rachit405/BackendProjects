using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using WebApp_FluentValidation.Models;
using FluentValidation;
using Microsoft.Extensions.Logging;

namespace WebApp_FluentValidation.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TaskController : ControllerBase
    // extra code 
    {
        private readonly ILogger<TaskController> _logger;
        public TaskController(ILogger<TaskController> logger)
        {
            _logger = logger;
        }

        [HttpPost]
        public TaskModel Post(TaskModel item)
        {
            // TODO save it in DB
            return item;
        }
    }
} 