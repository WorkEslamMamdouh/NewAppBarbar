$(document).ready(function () {
    // ;
    Login.InitalizeComponent();
});
var Login;
(function (Login) {
    var Client = new ClientDto();
    var User_Add = new UserAdd();
    var User = new Userclose();
    var Cuts_Display_App = new Display_App();
    var SessionStorages = new Array();
    var Sessions = new SessionStorage();
    var Branch = new Array();
    var GetStat = new GetStatus();
    var Details_Employee = new Array();
    var Details_API = new Array();
    var Details_Check = new Array();
    var sys = new SystemTools();
    var txtName;
    var txtPhone;
    var txt_Branch;
    var submit;
    var btnMan;
    var btnChild;
    var btnContinue;
    var butConfirm;
    var butRemove;
    var butBack;
    var TR_Type = '1';
    var StatusId;
    var close;
    var MyTimer;
    var flag_corse;
    var ID_Device;
    var BranchCode = 1;
    function InitalizeComponent() {
        debugger;
        ID_Device = Get_ID_Device();
        InitalizeControls();
        InitalizeEvents();
        Get_Branch();
        Get_Uesr_Session();
        cheakcloseDay();
        if (close == '0') {
            alert('المحل مغلق');
            $('#Div_Login').removeClass('display_none');
            $('#Div_Type').addClass('display_none');
            $('#Div_Confirm').addClass('display_none');
            $('#Div_Home').addClass('display_none');
            $('#Div_Employess').addClass('display_none');
            $('#butBack').addClass('display_none');
            $('#butRemove').addClass('display_none');
            $('#txt_titel').html('قائمة التسجيل');
        }
    }
    Login.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        txtName = document.getElementById("txtName");
        txtPhone = document.getElementById("txtPhone");
        submit = document.getElementById("submit");
        btnMan = document.getElementById("btnMan");
        btnChild = document.getElementById("btnChild");
        btnContinue = document.getElementById("btnContinue");
        butConfirm = document.getElementById("butConfirm");
        butRemove = document.getElementById("butRemove");
        butBack = document.getElementById("butBack");
        txt_Branch = document.getElementById("txt_Branch");
    }
    function InitalizeEvents() {
        submit.onclick = submit_onclick;
        btnMan.onclick = btnMan_onclick;
        btnChild.onclick = btnChild_onclick;
        btnContinue.onclick = btnContinue_onclick;
        butConfirm.onclick = butConfirm_onclick;
        butRemove.onclick = butRemove_onclick;
        butBack.onclick = butBack_onclick;
    }
    function Get_Branch() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Home", "GetBranch"),
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    Branch = result.Response;
                    DocumentActions.FillCombowithdefult(Branch, txt_Branch, "BranchCode", "NameA", "اختار الفرع");
                }
            }
        });
    }
    function Get_Uesr_Session() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Home", "Get_Uesr_Session"),
            data: { ID_Device: ID_Device },
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    SessionStorages = result.Response;
                    debugger;
                    if (SessionStorages.length > 0) {
                        sessionStorage.setItem("BranchCode", "" + SessionStorages[0].BranchCode + "");
                        sessionStorage.setItem("Name", SessionStorages[0].Name);
                        sessionStorage.setItem("Phone", SessionStorages[0].Phone);
                        sessionStorage.setItem("page", "" + SessionStorages[0].page + "");
                        sessionStorage.setItem("TR_Type", SessionStorages[0].TR_Type);
                        sessionStorage.setItem("TurnNumber", "" + SessionStorages[0].TurnNumber + "");
                        sessionStorage.setItem("ServiceId", "" + SessionStorages[0].ServiceId + "");
                        sessionStorage.setItem("Id", "" + SessionStorages[0].Id_Cust + "");
                        txtName.value = SessionStorages[0].Name.toString();
                        txtPhone.value = SessionStorages[0].Phone.toString();
                        txt_Branch.value = SessionStorages[0].BranchCode.toString();
                        BranchCode = SessionStorages[0].BranchCode;
                        if (SessionStorages[0].Phone == null) {
                            sessionStorage.setItem("page", "2");
                            LoadPage();
                        }
                        else {
                            LoadPage();
                        }
                    }
                    else {
                        txt_Branch.selectedIndex = 0;
                        BranchCode = Number(txt_Branch.value);
                        sessionStorage.setItem("page", "1");
                        txtName.value = '';
                        txtPhone.value = '';
                        LoadPage();
                    }
                }
            }
        });
    }
    function Get_ID_Device() {
        var navigator_info = window.navigator;
        var screen_info = window.screen;
        var uid = navigator_info.mimeTypes.length.toString();
        uid += navigator_info.userAgent.replace(/\D+/g, '');
        uid += navigator_info.plugins.length;
        uid += screen_info.height || '';
        uid += screen_info.width || '';
        uid += screen_info.pixelDepth || '';
        return uid;
    }
    function setTime() {
        MyTimer = setTimeout(function () {
            Refresh();
            setTime();
        }, 15000);
    }
    function cheakcloseDay() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Home", "cheakcloseDay"),
            data: { BranchCode: Number(txt_Branch.value) },
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    close = result.Response;
                }
            }
        });
    }
    function LoadPage() {
        var page = sessionStorage.getItem("page");
        if (page == '2') {
            clearTimeout(MyTimer);
            $('#Div_Type').removeClass('display_none');
            $('#Div_Login').addClass('display_none');
            $('#Div_Confirm').addClass('display_none');
            $('#Div_Home').addClass('display_none');
            $('#Div_Employess').addClass('display_none');
            $('#butBack').removeClass('display_none');
            $('#butRemove').addClass('display_none');
            $('#txt_titel').html('أختر نوع الخدمة');
        }
        else if (page == '3') {
            clearTimeout(MyTimer);
            TR_Type = sessionStorage.getItem("TR_Type");
            $('#Div_Type').addClass('display_none');
            $('#Div_Login').addClass('display_none');
            $('#Div_Confirm').addClass('display_none');
            $('#Div_Home').addClass('display_none');
            $('#Div_Employess').removeClass('display_none');
            $('#butBack').removeClass('display_none');
            $('#butRemove').addClass('display_none');
            $('#txt_titel').html('قائمة الحضور');
            Disbly_Emb();
        }
        else if (page == '4') {
            clearTimeout(MyTimer);
            $('#Div_Type').addClass('display_none');
            $('#Div_Login').addClass('display_none');
            $('#Div_Employess').addClass('display_none');
            $('#Div_Home').addClass('display_none');
            $('#Div_Confirm').removeClass('display_none');
            $('#butBack').removeClass('display_none');
            $('#butRemove').addClass('display_none');
            $('#txt_titel').html('تأكيد الحجز');
            Cheack_Num_Confirm();
        }
        else if (page == '5') {
            TR_Type = sessionStorage.getItem("TR_Type");
            $('#Div_Type').addClass('display_none');
            $('#Div_Login').addClass('display_none');
            $('#Div_Employess').addClass('display_none');
            $('#Div_Confirm').addClass('display_none');
            $('#Div_Home').removeClass('display_none');
            $('#butBack').addClass('display_none');
            $('#butRemove').removeClass('display_none');
            $('#txt_titel').html('معرفة دورك');
            Refresh();
            setTime();
        }
        else {
            clearTimeout(MyTimer);
            $('#Div_Login').removeClass('display_none');
            $('#Div_Type').addClass('display_none');
            $('#Div_Confirm').addClass('display_none');
            $('#Div_Home').addClass('display_none');
            $('#Div_Employess').addClass('display_none');
            $('#butBack').addClass('display_none');
            $('#butRemove').addClass('display_none');
            $('#txt_titel').html('قائمة التسجيل');
        }
    }
    function submit_onclick() {
        if (txt_Branch.selectedIndex == 0) {
            alert('برجاء أختيار الفرع');
            Errorinput(txt_Branch);
            return;
        }
        if (txtName.value.trim() == '') {
            alert('برجاء أدخال الاسم');
            Errorinput(txtName);
            return;
        }
        if (txtPhone.value.trim() == '') {
            alert('برجاء أدخال رقم التليفون');
            Errorinput(txtPhone);
            return;
        }
        else {
            cheakcloseDay();
            if (close == 0) {
                alert('لا يمكنك تسجيل الدخول لانه المحل مغلق');
            }
            else {
                Insert_SessionStorage();
            }
        }
    }
    function Insert_SessionStorage() {
        Sessions = new SessionStorage();
        Sessions.ID_Device = ID_Device;
        Sessions.Name = txtName.value;
        Sessions.Phone = txtPhone.value;
        Sessions.page = 2;
        Sessions.TR_Type = "";
        Sessions.ServiceId = 0;
        Sessions.TurnNumber = 0;
        Sessions.Id_Cust = 0;
        Sessions.BranchCode = Number(txt_Branch.value);
        BranchCode = Number(txt_Branch.value);
        Ajax.Callsync({
            type: "Post",
            url: sys.apiUrl("Home", "Insert_SessionStorage"),
            data: JSON.stringify(Sessions),
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    $('#Div_Type').removeClass('display_none');
                    $('#Div_Login').addClass('display_none');
                    $('#Div_Confirm').addClass('display_none');
                    $('#Div_Home').addClass('display_none');
                    $('#Div_Employess').addClass('display_none');
                    $('#butBack').removeClass('display_none');
                    $('#butRemove').addClass('display_none');
                    $('#txt_titel').html('أختر نوع الخدمة');
                    sessionStorage.setItem("page", "2");
                    sessionStorage.setItem("Name", txtName.value);
                    sessionStorage.setItem("Phone", txtPhone.value);
                    sessionStorage.setItem("BranchCode", txt_Branch.value);
                }
            }
        });
    }
    function btnMan_onclick() {
        TR_Type = '1';
        sessionStorage.setItem("TR_Type", TR_Type);
        $('#Div_Type').addClass('display_none');
        $('#Div_Login').addClass('display_none');
        $('#Div_Confirm').addClass('display_none');
        $('#Div_Home').addClass('display_none');
        $('#Div_Employess').removeClass('display_none');
        $('#butBack').removeClass('display_none');
        $('#butRemove').addClass('display_none');
        $('#txt_titel').html('قائمة الحضور');
        Disbly_Emb();
        sessionStorage.setItem("page", "3");
    }
    function btnChild_onclick() {
        TR_Type = '2';
        sessionStorage.setItem("TR_Type", TR_Type);
        $('#Div_Type').addClass('display_none');
        $('#Div_Login').addClass('display_none');
        $('#Div_Confirm').addClass('display_none');
        $('#Div_Home').addClass('display_none');
        $('#Div_Employess').removeClass('display_none');
        $('#butBack').removeClass('display_none');
        $('#butRemove').addClass('display_none');
        $('#txt_titel').html('قائمة الحضور');
        Disbly_Emb();
        sessionStorage.setItem("page", "3");
    }
    function Disbly_Emb() {
        $("#div_Emb").html("");
        Details_Employee = new Array();
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Home", "GetAllEmb_InApp"),
            data: { TR_Type: TR_Type, ID_Device: ID_Device, BranchCode: BranchCode },
            success: function (d) {
                ;
                var result = d;
                Details_Employee = result.Response;
                for (var i = 0; i < Details_Employee.length; i++) {
                    BuildControls(i);
                    $('#id_' + i).val(Details_Employee[i].ID);
                    $('#label_' + i).html(Details_Employee[i].Name);
                    Details_Employee[i].Cheak == true ? $('#checkbox_' + i).prop("checked", true) : $('#checkbox_' + i).prop("checked", false);
                }
            }
        });
    }
    function BuildControls(cnt) {
        var html;
        html = '<div id="But_' + cnt + '" class="col-sm-12 col-md-12 col-lg-12 col-xl-12 checkbox_Div">' +
            '<input id="id_' + cnt + '" class=" display_none  " type = "text"  /> ' +
            '<input id="checkbox_' + cnt + '" disabled Data-Num="' + cnt + '" class="col-sm-2 col-md-2 col-lg-2 col-xl-2   checkbox  check " type = "checkbox" /> ' +
            '<label id="label_' + cnt + '" class="col-sm-8 col-md-8 col-lg-8 col-xl-8 checkbox_label  " > سامح البحيري  ' +
            '</div > ';
        $("#div_Emb").append(html);
    }
    function btnContinue_onclick() {
        $('#Div_Type').addClass('display_none');
        $('#Div_Login').addClass('display_none');
        $('#Div_Employess').addClass('display_none');
        $('#Div_Home').addClass('display_none');
        $('#Div_Confirm').removeClass('display_none');
        $('#butBack').removeClass('display_none');
        $('#butRemove').addClass('display_none');
        $('#txt_titel').html('تأكيد الحجز');
        sessionStorage.setItem("page", "4");
        Cheack_Num_Confirm();
    }
    function butConfirm_onclick() {
        var r = confirm('هل تود فعلا بتاكيد الحجز');
        if (r == true) {
            $('#Div_Type').addClass('display_none');
            $('#Div_Login').addClass('display_none');
            $('#Div_Employess').addClass('display_none');
            $('#Div_Confirm').addClass('display_none');
            $('#Div_Home').removeClass('display_none');
            $('#butBack').addClass('display_none');
            $('#butRemove').removeClass('display_none');
            $('#txt_titel').html('معرفة دورك');
            insert_Cust();
            sessionStorage.setItem("page", "5");
            setTime();
        }
        else {
        }
    }
    function insert_Cust() {
        debugger;
        var Name = sessionStorage.getItem("Name");
        var Phone = sessionStorage.getItem("Phone");
        var Type = sessionStorage.getItem("TR_Type");
        var BraCode = sessionStorage.getItem("BranchCode");
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Home", "insert_Table_on_App"),
            data: { Name: Name, Phone: Phone, Type: Type, Message: "حجز خارجي", TR_Type: Type, ID_Device: ID_Device, BranchCode: BraCode },
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    Details_API = result.Response;
                    sessionStorage.setItem("TurnNumber", Details_API[0].Num.toString());
                    sessionStorage.setItem("ServiceId", Details_API[0].Type.toString());
                    sessionStorage.setItem("Id", Details_API[0].ID.toString());
                    $('#label_Num').html(Details_API[0].Num.toString());
                    Display();
                }
            }
        });
    }
    function Refresh() {
        Display();
        var TurnNumber = sessionStorage.getItem("TurnNumber");
        $('#label_Num').html(TurnNumber);
    }
    function Cheack_Num_Confirm() {
        TR_Type = sessionStorage.getItem("TR_Type");
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Home", "Cheack_Num_Confirm"),
            data: { TrType: TR_Type, ID_Device: ID_Device, BranchCode: BranchCode },
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    var num = result.Response;
                    if (TR_Type == '1') {
                        if (num == -1) {
                            num = 'يمكنك الدخول';
                        }
                    }
                    else {
                        if (num == -1) {
                            num = 'يمكنك الدخول';
                        }
                    }
                    $('#Confirm_Num_Dor').html(' في الانتظار : متاح الان ' + num.toString() + '');
                }
            }
        });
    }
    function butRemove_onclick() {
        var r = confirm('هل انت متاكد من اللغاء الحجز الخاص بك');
        if (r == true) {
            var ReservationId = sessionStorage.getItem("Id");
            Ajax.Callsync({
                type: "Get",
                url: sys.apiUrl("Home", "Delete_Cut"),
                data: { ID: ReservationId, ID_Device: ID_Device, BranchCode: BranchCode },
                success: function (d) {
                    sessionStorage.setItem("page", "2");
                    sessionStorage.setItem("TR_Type", "");
                    sessionStorage.setItem("Id", "");
                    LoadPage();
                    //txtName.value = '';
                    //txtPhone.value = '';
                }
            });
        }
        else {
        }
    }
    function chack_Remove() {
        Display();
        var Id = sessionStorage.getItem("Id");
        var check = Details_Check.filter(function (x) { return x.ServiceId == Number(TR_Type) && x.Id == Number(Id); });
        if (check[0].StatusId == 3) {
            StatusId = 4;
        }
        else {
            StatusId = 2;
        }
    }
    function butBack_onclick() {
        debugger;
        var page = sessionStorage.getItem("page");
        var New_Page = Number(Number(page) - 1);
        sessionStorage.setItem("page", New_Page.toString());
        LoadPage();
    }
    function Display() {
        Cuts_Display_App = new Display_App();
        var ID = sessionStorage.getItem("Id");
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Home", "GetAll_App"),
            data: { TR_Type: TR_Type, ID: ID, ID_Device: ID_Device, BranchCode: BranchCode },
            success: function (d) {
                debugger;
                var result = d;
                if (result.IsSuccess) {
                    debugger;
                    Cuts_Display_App = result.Response;
                    GetStat = Cuts_Display_App.GetSts;
                    var id_Corse = 1;
                    Corse_ON_Active();
                    for (var i = 0; i < Cuts_Display_App.Table_Hagz.length; i++) {
                        if (Cuts_Display_App.Table_Hagz[i].cheak == true) {
                            Corse_Is_Active(id_Corse, Cuts_Display_App.Table_Hagz, i);
                            id_Corse++;
                            flag_corse = true;
                        }
                    }
                    $('#label_Num').html(GetStat.TrNo.toString());
                    $('#Home_Num_Dor').html('باقي علي دورك : ' + GetStat.StatusName.toString() + '');
                    if (GetStat.StatusName == "الحجز الخاص بك غير موجود او تم الانتهتء من الخدمة الرجاء الحجز مره اخري") {
                        var page = sessionStorage.getItem("page");
                        if (page == '5') {
                            alert('الحجز الخاص بك غير موجود او تم الانتهتء من الخدمة الرجاء الحجز مره اخري');
                            $('#Home_Num_Dor').html('باقي علي دورك : يمكنك الدخول');
                            sessionStorage.setItem("page", "2");
                            sessionStorage.setItem("TR_Type", "");
                            sessionStorage.setItem("Id", "");
                            LoadPage();
                        }
                    }
                }
            }
        });
    }
    function Corse_Is_Active(id_Corse, Details, i) {
        $('#Corse_' + id_Corse + '').attr('class', ' col-sm-3 col-md-3 col-lg-3 col-xl-3  jq-tab-title Corse_Is_Active');
        $('#Corse_' + id_Corse + '').attr('Data_ID', Details[i].ID);
        $('#Corse_' + id_Corse + '').attr('StatusId', '' + Details[i].cheak + '');
        $('#Corse_' + id_Corse + '').attr('Num', Details[i].Num);
        $('#Corse_' + id_Corse + '').attr('Phone', Details[i].Phone);
        $('#Corse_' + id_Corse + '').attr('DesName', Details[i].Name);
        //let timer = timeConverter(Details[i].RegistredTime)
        $('#Corse_' + id_Corse + '').attr('Time', Details[i].RegistredTime);
        $('#Corse_' + id_Corse + '').attr('Message', '');
        $('#Corse_' + id_Corse + '').attr('cheak', '' + Details[i].cheak + '');
        $('#text_Num_' + id_Corse + '').html('' + Details[i].Num + '');
        $('#disc_Corse').attr('style', '');
        $('#btnExit').attr('style', 'background-color: #b72020;width: 261px;font-size: 31px;');
    }
    function Corse_ON_Active() {
        for (var i = 1; i < 5; i++) {
            $('#Corse_' + i + '').attr('class', 'jq-tab-title Corse_ON_Active');
            $('#Corse_' + i + '').attr('Num', '');
            $('#Corse_' + i + '').attr('Phone', '');
            $('#Corse_' + i + '').attr('DesName', '');
            $('#Corse_' + i + '').attr('Message', '');
            $('#Corse_' + i + '').attr('cheak', 'false');
            $('#Corse_' + i + '').attr('style', '');
            $('#text_Num_' + i + '').html('');
        }
        if (TR_Type == "1") {
            for (var i = 1; i < 5; i++) {
                $('#Corse_' + i + '').removeClass('display_none');
            }
        }
        else {
            for (var i = 2; i < 5; i++) {
                $('#Corse_' + i + '').addClass('display_none');
            }
        }
    }
})(Login || (Login = {}));
//# sourceMappingURL=Login.js.map