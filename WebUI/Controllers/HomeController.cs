using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebUI.Models;
using WebUI.Models.CustomModel;

namespace WebUI.Controllers
{
    public class HomeController : Controller
    {
        MyPushNotificationEntities db = new MyPushNotificationEntities();

        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Login()
        {
            return View();
        }
        public ActionResult NotifactionIndex()
        {
            return View();
        }
        
        public JsonResult GetNotificationContacts()
        {
            var notificationRegisterTime = Session["LastUpdated"] != null ? Convert.ToDateTime(Session["LastUpdated"]) : DateTime.Now;
            NotificationComponent NC = new NotificationComponent();
            var list = NC.GetContacts(notificationRegisterTime);
            //update session here for get only new added contacts (notification)
            Session["LastUpdate"] = DateTime.Now;
            return new JsonResult { Data = list, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
         
        public ActionResult Home()
        {
            return View("~/Views/Home/Home.cshtml");
        }


        //-----------------------------------------------------------Home-----------------------------------------

        public class GetStatus
        {
            public int TrNo { get; set; }
            public string StatusName { get; set; }

        }


        public JsonResult Insert_SessionStorage(SessionStorage Session)
        {
            if (ModelState.IsValid)
            {
                int Check_ID_Device = 0;

                Check_ID_Device = db.Database.SqlQuery<int>("select COUNT([ID_Device]) from [dbo].[SessionStorage] Where [ID_Device] = '" + Session.ID_Device + "'").FirstOrDefault();

                if (Check_ID_Device == 0)
                {
                    string qerye = "insert into [dbo].[SessionStorage] values(" + Session.BranchCode + ",'" + Session.ID_Device + "','" + Session.Name + "','" + Session.Phone + "','" + Session.TR_Type + "'," + Session.page + "," + Session.TurnNumber + "," + Session.ServiceId + "," + Session.Id_Cust + ")";
                    db.Database.ExecuteSqlCommand(qerye);
                }
                else
                {
                    db.Database.ExecuteSqlCommand("update [dbo].[SessionStorage] set BranchCode = " + Session.BranchCode + ",[Name] ='" + Session.Name + "' , [Phone] = '" + Session.Phone + "', [page] = 2  where ID_Device = '" + Session.ID_Device + "'");
                }

                return new JsonResult { Data = 100, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
            return new JsonResult { Data = 100, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        public JsonResult GetBranch()
        {
            var Branch = db.Database.SqlQuery<G_Branch>("select * from [dbo].[G_Branch]").ToList(); 
            return new JsonResult { Data = Branch, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }


      
        public JsonResult Get_Uesr_Session(string ID_Device)
        {
            if (ModelState.IsValid)
            {
                var SessionStorage = db.Database.SqlQuery<SessionStorage>("select * from SessionStorage Where [ID_Device] = N'" + ID_Device + "'").ToList();

                if (SessionStorage.Count > 0)
                {
                    if (SessionStorage[0].page == null)
                    {
                        SessionStorage[0].page = 2;
                    }
                }

                 
                return new JsonResult { Data = SessionStorage, JsonRequestBehavior = JsonRequestBehavior.AllowGet };

            }
       
            return new JsonResult { Data = ModelState, JsonRequestBehavior = JsonRequestBehavior.AllowGet };

        }


        public JsonResult cheakcloseDay(int BranchCode)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var companies = db.Database.SqlQuery<int>("select LastNum from Table_LastNum where [Type] ='3' and BranchCode =" + BranchCode + "").ToList();
                
                    return new JsonResult { Data = companies, JsonRequestBehavior = JsonRequestBehavior.AllowGet };


                }
                catch (Exception ex)
                { 
                    return new JsonResult { Data = ex.Message, JsonRequestBehavior = JsonRequestBehavior.AllowGet };

                }
            } 
            return new JsonResult { Data = ModelState, JsonRequestBehavior = JsonRequestBehavior.AllowGet };

        }


        public JsonResult GetAllEmb_InApp(int TR_Type, string ID_Device, int BranchCode)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var companies = db.Database.SqlQuery<Table_Tim_work>("select * from [dbo].[Table_Tim_work] where  BranchCode = " + BranchCode + " ").ToList();
                    //var companies = db.GFun_Companies(userCode).ToList();

                    db.Database.ExecuteSqlCommand("update [dbo].[SessionStorage] set [page] = 3 , [TR_Type] = " + TR_Type + "  where ID_Device = '" + ID_Device + "'");

                     
                    return new JsonResult { Data = companies, JsonRequestBehavior = JsonRequestBehavior.AllowGet };



                }
                catch (Exception ex)
                { 
                    return new JsonResult { Data = ex.Message, JsonRequestBehavior = JsonRequestBehavior.AllowGet };

                }
            } 
            return new JsonResult { Data = ModelState, JsonRequestBehavior = JsonRequestBehavior.AllowGet };

        }


        public JsonResult insert_Table_on_App(string Name, string Phone, string Type, string Message, string TR_Type, string ID_Device, int BranchCode)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var companies = db.Database.SqlQuery<Table_Hagz>("insert_Table_on_App  N'" + Name + "',N'" + Phone + "',N'" + Type + "',N'" + Message + "',N'" + TR_Type + "' , " + BranchCode + "").ToList();
                    //var companies = db.GFun_Companies(userCode).ToList();
                    db.Database.ExecuteSqlCommand("update [dbo].[SessionStorage] set [page] = 5  , TurnNumber =" + companies[0].Num + " , Id_Cust=" + companies[0].ID + ",TR_Type=" + TR_Type + " where ID_Device = '" + ID_Device + "'");
                     
                    return new JsonResult { Data = companies, JsonRequestBehavior = JsonRequestBehavior.AllowGet };



                }
                catch (Exception ex)
                { 
                    return new JsonResult { Data = ex.Message, JsonRequestBehavior = JsonRequestBehavior.AllowGet };

                }
            } 
            return new JsonResult { Data = ModelState, JsonRequestBehavior = JsonRequestBehavior.AllowGet };

        }


        public JsonResult Cheack_Num_Confirm(string TrType, string ID_Device, int BranchCode)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var companies = db.Database.SqlQuery<int>("Cheack_Num_Confirm " + TrType + " , " + BranchCode + "").ToList();

                    db.Database.ExecuteSqlCommand("update [dbo].[SessionStorage] set [page] = 4 , TR_Type =" + TrType + " where ID_Device = '" + ID_Device + "'");


               
                    return new JsonResult { Data = companies, JsonRequestBehavior = JsonRequestBehavior.AllowGet };


                }
                catch (Exception ex)
                { 
                    return new JsonResult { Data = ex.Message, JsonRequestBehavior = JsonRequestBehavior.AllowGet };

                }
            } 
            return new JsonResult { Data = ModelState, JsonRequestBehavior = JsonRequestBehavior.AllowGet };

        }

        public JsonResult Delete_Cut(int ID, string ID_Device, int BranchCode)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    db.Database.ExecuteSqlCommand("Delete_Rows " + ID + " , " + BranchCode + "");
                    db.Database.ExecuteSqlCommand("PushNotification");
                    db.Database.ExecuteSqlCommand("update [dbo].[SessionStorage] set [page] = 2 , [TR_Type] = null ,Id_Cust =null where ID_Device = '" + ID_Device + "'");

                  
                    return new JsonResult { Data = 100, JsonRequestBehavior = JsonRequestBehavior.AllowGet };



                }
                catch (Exception ex)
                { 
                    return new JsonResult { Data = ex.Message, JsonRequestBehavior = JsonRequestBehavior.AllowGet };

                }
            } 
            return new JsonResult { Data = ModelState, JsonRequestBehavior = JsonRequestBehavior.AllowGet };

        }


        public JsonResult GetAll_App(string TR_Type, int ID, string ID_Device, int BranchCode)
        {
            if (ModelState.IsValid)
            {
                Display_App Display = new Display_App();

                GetStatus GSta = new GetStatus();
                 

                var Corse = db.Database.SqlQuery<Table_Hagz>("select * from Table_Hagz where [Type] = '" + TR_Type + "' and cheak = 1 and BranchCode = "+ BranchCode + "").ToList();

                int TrNo = db.Database.SqlQuery<int>(" select Num from Table_Hagz where ID = " + ID + "").FirstOrDefault();

                int StatusName = db.Database.SqlQuery<int>(" Cheack_Num_Home_App  '" + TR_Type + "' , " + ID + " , " + BranchCode + "").FirstOrDefault();


                Display.Table_Hagz = Corse;
                GSta.TrNo = TrNo;

                string Name;
                if (StatusName == -1)
                {
                    Name = "يمكنك الدخول";
                }
                else if (StatusName == -2)
                {
                    Name = "لقد بدائت الحلاقة نتمني لكم وقت طيب";
                }
                else if (StatusName == -3)
                {
                    Name = "الحجز الخاص بك غير موجود او تم الانتهتء من الخدمة الرجاء الحجز مره اخري";
                    db.Database.ExecuteSqlCommand("update [dbo].[SessionStorage] set [page] = 2  where ID_Device = '" + ID_Device + "'");
                }
                else if (StatusName == -4)
                {
                    Name = "لقد انتهيت من الحلاقه نشكرك علي زيارتك";
                    db.Database.ExecuteSqlCommand("update [dbo].[SessionStorage] set [page] = 2  where ID_Device = '" + ID_Device + "'");
                }
                else
                {
                    Name = StatusName.ToString();
                }
                GSta.StatusName = Name;

                Display.GetSts = GSta;


         
                return new JsonResult { Data = Display, JsonRequestBehavior = JsonRequestBehavior.AllowGet };

            } 
            return new JsonResult { Data = ModelState, JsonRequestBehavior = JsonRequestBehavior.AllowGet };

        }



    }
}