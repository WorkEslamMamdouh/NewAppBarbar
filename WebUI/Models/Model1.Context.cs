﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace WebUI.Models
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    using System.Data.Entity.Core.Objects;
    using System.Linq;
    
    public partial class MyPushNotificationEntities : DbContext
    {
        public MyPushNotificationEntities()
            : base("name=MyPushNotificationEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<Contact> Contacts { get; set; }
        public virtual DbSet<G_Branch> G_Branch { get; set; }
        public virtual DbSet<SessionStorage> SessionStorages { get; set; }
        public virtual DbSet<Table_Hagz> Table_Hagz { get; set; }
        public virtual DbSet<Table_LastNum> Table_LastNum { get; set; }
        public virtual DbSet<Table_Server> Table_Server { get; set; }
        public virtual DbSet<Table_Tim_work> Table_Tim_work { get; set; }
    
        public virtual ObjectResult<Nullable<int>> Cheack_Num_Confirm(string trType, Nullable<int> branchCode)
        {
            var trTypeParameter = trType != null ?
                new ObjectParameter("TrType", trType) :
                new ObjectParameter("TrType", typeof(string));
    
            var branchCodeParameter = branchCode.HasValue ?
                new ObjectParameter("BranchCode", branchCode) :
                new ObjectParameter("BranchCode", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Nullable<int>>("Cheack_Num_Confirm", trTypeParameter, branchCodeParameter);
        }
    
        public virtual ObjectResult<Nullable<int>> Cheack_Num_Home_App(string trType, Nullable<int> iD, Nullable<int> branchCode)
        {
            var trTypeParameter = trType != null ?
                new ObjectParameter("TrType", trType) :
                new ObjectParameter("TrType", typeof(string));
    
            var iDParameter = iD.HasValue ?
                new ObjectParameter("ID", iD) :
                new ObjectParameter("ID", typeof(int));
    
            var branchCodeParameter = branchCode.HasValue ?
                new ObjectParameter("BranchCode", branchCode) :
                new ObjectParameter("BranchCode", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Nullable<int>>("Cheack_Num_Home_App", trTypeParameter, iDParameter, branchCodeParameter);
        }
    
        public virtual int closeDay(Nullable<int> branchCode)
        {
            var branchCodeParameter = branchCode.HasValue ?
                new ObjectParameter("BranchCode", branchCode) :
                new ObjectParameter("BranchCode", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("closeDay", branchCodeParameter);
        }
    
        public virtual int Delete_Rows(Nullable<int> iD, Nullable<int> branchCode)
        {
            var iDParameter = iD.HasValue ?
                new ObjectParameter("ID", iD) :
                new ObjectParameter("ID", typeof(int));
    
            var branchCodeParameter = branchCode.HasValue ?
                new ObjectParameter("BranchCode", branchCode) :
                new ObjectParameter("BranchCode", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("Delete_Rows", iDParameter, branchCodeParameter);
        }
    
        public virtual ObjectResult<Enter_Customer_Result> Enter_Customer(Nullable<int> iD, string tR_Type, Nullable<int> branchCode)
        {
            var iDParameter = iD.HasValue ?
                new ObjectParameter("ID", iD) :
                new ObjectParameter("ID", typeof(int));
    
            var tR_TypeParameter = tR_Type != null ?
                new ObjectParameter("TR_Type", tR_Type) :
                new ObjectParameter("TR_Type", typeof(string));
    
            var branchCodeParameter = branchCode.HasValue ?
                new ObjectParameter("BranchCode", branchCode) :
                new ObjectParameter("BranchCode", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Enter_Customer_Result>("Enter_Customer", iDParameter, tR_TypeParameter, branchCodeParameter);
        }
    
        public virtual int insert_Table(string name, string phone, string type, string message, string tR_Type, Nullable<int> branchCode)
        {
            var nameParameter = name != null ?
                new ObjectParameter("Name", name) :
                new ObjectParameter("Name", typeof(string));
    
            var phoneParameter = phone != null ?
                new ObjectParameter("Phone", phone) :
                new ObjectParameter("Phone", typeof(string));
    
            var typeParameter = type != null ?
                new ObjectParameter("Type", type) :
                new ObjectParameter("Type", typeof(string));
    
            var messageParameter = message != null ?
                new ObjectParameter("Message", message) :
                new ObjectParameter("Message", typeof(string));
    
            var tR_TypeParameter = tR_Type != null ?
                new ObjectParameter("TR_Type", tR_Type) :
                new ObjectParameter("TR_Type", typeof(string));
    
            var branchCodeParameter = branchCode.HasValue ?
                new ObjectParameter("BranchCode", branchCode) :
                new ObjectParameter("BranchCode", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("insert_Table", nameParameter, phoneParameter, typeParameter, messageParameter, tR_TypeParameter, branchCodeParameter);
        }
    
        public virtual ObjectResult<insert_Table_on_App_Result> insert_Table_on_App(string name, string phone, string type, string message, string tR_Type, Nullable<int> branchCode)
        {
            var nameParameter = name != null ?
                new ObjectParameter("Name", name) :
                new ObjectParameter("Name", typeof(string));
    
            var phoneParameter = phone != null ?
                new ObjectParameter("Phone", phone) :
                new ObjectParameter("Phone", typeof(string));
    
            var typeParameter = type != null ?
                new ObjectParameter("Type", type) :
                new ObjectParameter("Type", typeof(string));
    
            var messageParameter = message != null ?
                new ObjectParameter("Message", message) :
                new ObjectParameter("Message", typeof(string));
    
            var tR_TypeParameter = tR_Type != null ?
                new ObjectParameter("TR_Type", tR_Type) :
                new ObjectParameter("TR_Type", typeof(string));
    
            var branchCodeParameter = branchCode.HasValue ?
                new ObjectParameter("BranchCode", branchCode) :
                new ObjectParameter("BranchCode", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<insert_Table_on_App_Result>("insert_Table_on_App", nameParameter, phoneParameter, typeParameter, messageParameter, tR_TypeParameter, branchCodeParameter);
        }
    
        public virtual int insert_Table_Tim_work(string name, Nullable<bool> cheak, Nullable<int> branchCode)
        {
            var nameParameter = name != null ?
                new ObjectParameter("Name", name) :
                new ObjectParameter("Name", typeof(string));
    
            var cheakParameter = cheak.HasValue ?
                new ObjectParameter("Cheak", cheak) :
                new ObjectParameter("Cheak", typeof(bool));
    
            var branchCodeParameter = branchCode.HasValue ?
                new ObjectParameter("BranchCode", branchCode) :
                new ObjectParameter("BranchCode", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("insert_Table_Tim_work", nameParameter, cheakParameter, branchCodeParameter);
        }
    
        public virtual ObjectResult<insert_tw_Result> insert_tw(string name, Nullable<bool> cheak, Nullable<int> branchCode)
        {
            var nameParameter = name != null ?
                new ObjectParameter("name", name) :
                new ObjectParameter("name", typeof(string));
    
            var cheakParameter = cheak.HasValue ?
                new ObjectParameter("cheak", cheak) :
                new ObjectParameter("cheak", typeof(bool));
    
            var branchCodeParameter = branchCode.HasValue ?
                new ObjectParameter("BranchCode", branchCode) :
                new ObjectParameter("BranchCode", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<insert_tw_Result>("insert_tw", nameParameter, cheakParameter, branchCodeParameter);
        }
    
        public virtual int PushNotification()
        {
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("PushNotification");
        }
    
        public virtual ObjectResult<select_Table_Tim_work_Result> select_Table_Tim_work(Nullable<int> branchCode)
        {
            var branchCodeParameter = branchCode.HasValue ?
                new ObjectParameter("BranchCode", branchCode) :
                new ObjectParameter("BranchCode", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<select_Table_Tim_work_Result>("select_Table_Tim_work", branchCodeParameter);
        }
    }
}
