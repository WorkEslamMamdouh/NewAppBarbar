using System;
using System.Collections.Generic;
using System.Linq;
using System.Web; 
using WebUI.Models;
using static WebUI.Controllers.HomeController;

namespace WebUI.Models.CustomModel
{
    
    public class Display_App
    {
        public List<Table_Hagz> Table_Hagz { get; set; }
        public GetStatus GetSts { get; set; }
    }



}