/// <reference path="../scripts/typings/jquery/jquery.d.ts" />
var ScreenModes;
(function (ScreenModes) {
    ScreenModes[ScreenModes["Query"] = 0] = "Query";
    ScreenModes[ScreenModes["Add"] = 1] = "Add";
    ScreenModes[ScreenModes["Edit"] = 2] = "Edit";
    ScreenModes[ScreenModes["Start"] = 3] = "Start";
    ScreenModes[ScreenModes["DisableMenu"] = 4] = "DisableMenu";
})(ScreenModes || (ScreenModes = {}));
//By Muhammad Rajab 20-10-2020
//eslam 21 oct 2020
//eslam 25 oct 2020
//eslam 28 oct 2020
//3zoz 28/10
var JsGridHeaderCenter = "JsGridHeaderCenter";
var TransparentButton = "TransparentButton";
////6-10-2020 
var Modules = {
    Home: "Home",
};
var Keys = {
    Enter: "Enter"
};
function IsNullOrEmpty(value) {
    if (value == null || value == "")
        return true;
    else
        return false;
}
function GetIndexByUseId(idValue, BaseTableName, idFieldName, Condition) {
    var result = "";
    if (IsNullOrEmpty(idValue.toString()) || IsNullOrEmpty(BaseTableName) || IsNullOrEmpty(idFieldName)) {
        return result;
    }
    else {
        var sys = new SystemTools;
        var result_1 = "";
        Ajax.Callsync({
            url: sys.apiUrl("SystemTools", "GetIndexByUseId"),
            data: { idValue: idValue.toString(), BaseTableName: BaseTableName, idFieldName: idFieldName, Condition: Condition },
            success: function (d) {
                result_1 = d;
            }
        });
        return result_1;
    }
}
function GetIndexByUseCode(idValue, BaseTableName, idFieldName, condition) {
    var result = "";
    if (IsNullOrEmpty(idValue.toString()) || IsNullOrEmpty(BaseTableName) || IsNullOrEmpty(idFieldName)) {
        return result;
    }
    else {
        var result_2 = Ajax.Call({
            url: Url.Action("GetIndexByUseCode", "ClientTools"),
            data: { idValue: idValue.toString(), BaseTableName: BaseTableName, idFieldName: idFieldName, condition: condition }
        });
        return result_2;
    }
}
var SearchModulesNames = {
    cashCustomer: "cashCustomer",
    cashCustomerCategory: "cashCustomerCategory",
    categories: "categories",
    colours: "colours",
    CostCenter: "CostCenter",
    CustAdjType: "CustAdjType",
    customerInformation: "customerInformation",
    customers: "customers",
    groups: "groups",
    Icustomers: "Icustomers",
    items: "items",
    Items2: "Items2",
    marks: "marks",
    movements: "movements",
    nations: "nations",
    salesMan: "salesMan",
    TrReceipt: "TrReceipt",
    types: "types",
    uoms: "uoms",
    store: "store"
};
function Numeric(value) {
    var result = 0;
    if (!isNaN(value)) {
        var strValue = value.toFixed(2);
        result = Number(strValue); // value;
    }
    return result;
}
function Fixed(value) {
    return Number(value.toFixed(2));
}
var App;
(function (App) {
    var branchCodeSelected = "";
    var LanguageButton;
    function AssignLoginInformation() {
        var Env = GetSystemEnvironment();
        if (DocumentActions.GetElementById("infoSysName") != null)
            DocumentActions.GetElementById("infoSysName").innerText = Env.SystemCode;
        if (DocumentActions.GetElementById("infoSubSysName") != null)
            DocumentActions.GetElementById("infoSubSysName").innerText = Env.SubSystemCode;
        if (DocumentActions.GetElementById("infoCompanyName") != null) {
            if (Env.ScreenLanguage == "ar")
                DocumentActions.GetElementById("infoCompanyName").innerText = Env.CompanyNameAr;
            else
                DocumentActions.GetElementById("infoCompanyName").innerText = Env.CompanyName;
        }
        if (DocumentActions.GetElementById("infoCurrentYear") != null)
            DocumentActions.GetElementById("infoCurrentYear").innerText = Env.CurrentYear;
        if (DocumentActions.GetElementById("infoUserCode") != null)
            DocumentActions.GetElementById("infoUserCode").innerText = Env.UserCode;
    }
    function Startup() {
        var Env = GetSystemEnvironment();
        try {
            var SpanUserName = DocumentActions.GetElementById("SpanUserName");
            SpanUserName.innerText = Env.UserCode;
            SpanUserName.style.display = "block";
            SpanUserName.onclick = GetBranchs;
        }
        catch (e) {
        }
        var btnEditUserBranchs;
        try {
            btnEditUserBranchs = DocumentActions.GetElementById("btnEditUserBranchs");
            btnEditUserBranchs.onclick = EnableBranchSelected;
        }
        catch (e) {
        }
        //var btnChangeBranch: HTMLButtonElement;
        //try {
        //    btnChangeBranch = DocumentActions.GetElementById<HTMLButtonElement>("btnChangeBranch");
        //    btnChangeBranch.onclick = ChangeBranch;
        //} catch (e) {
        //}
        AssignLoginInformation();
        try {
            LanguageButton = DocumentActions.GetElementById("LanguageButton");
            LanguageButton.onclick = LanguageButton_Click;
        }
        catch (e) {
        }
        try {
            DocumentActions.GetElementById("btnChangePassword").onclick = function () {
                var oldPassword = DocumentActions.GetElementById("txtOldPassword").value;
                var newPassword = DocumentActions.GetElementById("txtNewPassword").value;
                ChangePassword(oldPassword, newPassword);
            };
        }
        catch (e) {
        }
        try {
            DocumentActions.GetElementById("spnFav").onclick = function () {
                var sys = new SystemTools();
                //sys.SwitchUserFavorite();
            };
        }
        catch (e) {
        }
        AssignLoginInformation();
    }
    App.Startup = Startup;
    function LanguageButton_Click() {
        var SysSession = GetSystemSession();
        if (SysSession.CurrentEnvironment.ScreenLanguage == "ar") {
            SysSession.CurrentEnvironment.ScreenLanguage = "en";
        }
        else {
            SysSession.CurrentEnvironment.ScreenLanguage = "ar";
        }
        document.cookie = "Inv1_systemProperties=" + JSON.stringify(SysSession.CurrentEnvironment) + ";expires=Fri, 31 Dec 2030 23:59:59 GMT;path=/";
        //Ajax.CallAsync({
        //    url: Url.Action("SetScreenLang", "ClientTools"),
        //    data: { lang: SysSession.CurrentEnvironment.ScreenLanguage },
        //    success: (response) => { }
        //});
    }
    function AppendStyleSheet(fileName) {
        var lnk = document.createElement('link');
        lnk.href = "../css/" + fileName + ".css";
        lnk.rel = 'stylesheet';
        lnk.type = 'text/css';
        var $head = $("head");
        var $headlinklast = $head.find("link[rel='stylesheet']:first");
        $headlinklast.after(lnk);
        //document.getElementsByTagName("head")[0].appendChild(lnk);
    }
    function RemoveStyleSheet(fileName) {
        var href = "../css/" + fileName + ".css";
        $("link[rel=stylesheet][href~='" + href + "']").remove();
    }
})(App || (App = {}));
function EnableBranchSelected() {
    var ddlBrachs = DocumentActions.GetElementById("ddlBrachs");
    ddlBrachs.removeAttribute("disabled");
}
function GetBranchs() {
    var sys = new SystemTools();
    var Env = GetSystemEnvironment();
    var ddlBrachs = DocumentActions.GetElementById("ddlBrachs");
    Ajax.Callsync({
        url: sys.apiUrl("SystemTools", "GetBranchsByUserCode"),
        data: { userCode: Env.UserCode, compCode: Env.CompCode },
        success: function (response) {
            var result = response;
            DocumentActions.FillCombo(result, ddlBrachs, "BRA_CODE", "BRA_DESCL");
        }
    });
}
var GQ_GetUserBranch = (function () {
    function GQ_GetUserBranch() {
        this.USER_CODE = "";
        this.COMP_CODE = 0;
        this.BRA_CODE = 0;
        this.BRA_DESCL = "";
        this.BRA_DESCE = "";
        this.BRA_DESC = "";
    }
    return GQ_GetUserBranch;
}());
function InitalizeLayout() {
    //ControlsButtons.ModuleEffects();
}
function GetParameterByName(name) {
    var url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
    if (!results)
        return null;
    if (!results[2])
        return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
function ChangePassword(OldPassword, NewPassword) {
    var sys = new SystemTools();
    var Env = GetSystemEnvironment();
    var UserCode = Env.UserCode;
    $.ajax({
        url: sys.apiUrl("SystemTools", "ChangePassword"),
        data: { OldPassword: OldPassword, NewPassword: NewPassword, UserCode: UserCode },
        success: function (response) {
            var result = response;
            if (result.IsSuccess == true) {
                alert("Password changed");
            }
            else {
                alert("Changing password failed");
            }
        }
    });
}
function CloseSearchBox() {
    $("#SearchBox").modal("hide"); //.css("display", "none");
}
// mahroos
function NavigateToSearchResultKey(IndexNo, Navigate) {
    //    CloseSearchBox();
    //    SharedWork.PageIndex = IndexNo;
    //    Navigate();
    //    SharedWork.Render();
}
function NavigateToSearchResult(Navigate) {
    //    CloseSearchBox();
    //    let index = SearchGrid.SearchDataGrid.SelectedKey;
    //    SharedWork.PageIndex = Number(index);
    //    Navigate();
    //    SharedWork.Render();
}
//var Url = {
//    Action: (actionName: string, controllerName: string) => ($.ajax({
//        url: $("#GetActionUrl").val(),
//        async: false,
//        data: { actionName: actionName, controllerName: controllerName }
//    }).responseJSON).result as string
//};
var Url = {
    Action: function (actionName, controllerName) { return (location.origin + "/" + controllerName + "/" + actionName); }
};
var Ajax = {
    Call: function (settings) {
        try {
            var json = $.ajax({
                url: settings.url,
                data: settings.data,
                cache: false,
                async: false
            }).responseJSON;
            var result = json.result;
            return result;
        }
        catch (e) {
            $(".waitMe").removeAttr("style").fadeOut(200);
            return null;
        }
    },
    CallAsync: function (settings) {
        //run_waitMe();
        $.ajax({
            type: settings.type,
            url: settings.url,
            data: settings.data,
            cache: false,
            headers: {
                'Accept': 'application/json; charset=utf-8',
                'Content-Type': 'application/json'
            },
            success: function (d) {
                settings.success(d, "", null);
                $(".waitMe").removeAttr("style").fadeOut(200);
            },
            error: function () { $(".waitMe").removeAttr("style").fadeOut(200); }
        });
    },
    Callsync: function (settings) {
        //run_waitMe();
        $.ajax({
            type: settings.type,
            url: settings.url,
            data: settings.data,
            headers: {
                'Accept': 'application/json; charset=utf-8',
                'Content-Type': 'application/json'
            },
            cache: false,
            async: false,
            success: function (d) {
                settings.success(d, "", null);
                $(".waitMe").removeAttr("style").fadeOut(2500);
            },
            error: function () { $(".waitMe").removeAttr("style").fadeOut(2500); }
        });
    }
};
function GetView(controllerName, ModuleCode) {
    //;
    //HomeComponent.UserAcsses(ModuleCode);
    var json = Ajax.CallAsync({
        //type: "GET",
        url: "OpenView",
        data: { controllerName: controllerName, ModuleCode: ModuleCode },
        cache: true,
        async: true,
        success: function (response) {
            window.open(Url.Action(controllerName + "Index", controllerName), "_self");
            //$("#cont").html(response);
        }
    });
    //back to home 
    //SysSession.ModuleCode = "Home";
}
function OpenPartial(ModuleCode, DivName) {
    var jsonf = $.ajax({
        type: "GET",
        url: "OpenView",
        data: { ModuleCode: ModuleCode },
        cache: false,
        async: false,
        success: function (response) {
            $("#" + DivName).html(response);
        }
    }).responseJSON;
}
function run_waitMe() {
    $('.please_wait').waitMe({
        effect: "win8",
        text: "...Pleasewait",
        color: '#fff',
        sizeW: '80px',
        sizeH: '80px',
        textPos: "horizontal"
    });
    $('.please_wait').waitMe({
        effect: "win8",
        text: "...Pleasewait",
        color: '#fff',
        sizeW: '400',
        waitTime: '40000',
        sizeH: '400'
    });
}
var RequiredClassName = " required";
var RequiredElements = new Array();
var exchangeElements = new Array();
var DocumentActions = {
    SetRequiredElements: function () {
        var elements = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            elements[_i] = arguments[_i];
        }
        RequiredElements = new Array();
        for (var _a = 0, elements_1 = elements; _a < elements_1.length; _a++) {
            var element = elements_1[_a];
            //element.className += RequiredClassName;
            RequiredElements.push(element);
        }
    },
    SetExchangeElements: function (ArElement, EnElement) {
        exchangeElements = new Array();
        exchangeElements.push(ArElement);
        exchangeElements.push(EnElement);
    },
    ValidateRequired: function () {
        //let result: boolean = false;
        var bools = new Array();
        var elements = RequiredElements; // Array.prototype.slice.call(document.getElementsByClassName("required")) as Array<HTMLElement>;
        for (var _i = 0, elements_2 = elements; _i < elements_2.length; _i++) {
            var element = elements_2[_i];
            switch (element.tagName.toUpperCase()) {
                case "INPUT":
                    if (element.type == "check") {
                        if (element.checked == false) {
                            bools.push(false);
                            element.style.borderColor = "red";
                        }
                        else {
                            bools.push(true);
                            element.style.borderColor = "";
                        }
                    }
                    else {
                        if (element.value == "") {
                            bools.push(false);
                            element.style.borderColor = "red";
                        }
                        else {
                            bools.push(true);
                            element.style.borderColor = "";
                        }
                    }
                    break;
                case "SELECT":
                    if (element.value == "") {
                        bools.push(false);
                        element.style.borderColor = "red";
                    }
                    else {
                        bools.push(true);
                        element.style.borderColor = "";
                    }
                    break;
                default:
            }
        }
        if (exchangeElements.length > 0) {
            if (exchangeElements[0].value == "" && exchangeElements[1].value == "") {
                bools.push(false);
                exchangeElements[0].style.borderColor = "orange";
                exchangeElements[1].style.borderColor = "orange";
            }
            else {
                bools.push(true);
                exchangeElements[0].style.borderColor = "";
                exchangeElements[1].style.borderColor = "";
            }
        }
        var count = bools.filter(function (f) { return f == false; }).length;
        if (count > 0)
            return false;
        else
            return true;
    },
    RenderFromModel: function (dataSource) {
        try {
            var properties = Object.getOwnPropertyNames(dataSource);
            for (var _i = 0, properties_1 = properties; _i < properties_1.length; _i++) {
                var property = properties_1[_i];
                var element = document.getElementsByName(property)[0];
                if (element == null)
                    continue;
                if (property == "CreatedAt" || property == "UpdatedAt") {
                    if (String(dataSource[property]).indexOf("Date") > -1) {
                        element.value = DateTimeFormat(dataSource[property]);
                    }
                    else {
                        element.value = dataSource[property];
                    }
                    continue;
                }
                if (property == "CreatedBy" || property == "UpdatedBy") {
                    var value = String(dataSource[property]).toString();
                    if (value != null)
                        element.value = value;
                    else
                        element.value = "";
                    continue;
                }
                if (dataSource[property] == null) {
                    try {
                        element.value = dataSource[property];
                    }
                    catch (e) {
                    }
                    finally {
                        continue;
                    }
                }
                if (element.type == "checkbox")
                    element.checked = (dataSource[property]);
                else if (element.type == "date") {
                    element.value = dataSource[property];
                }
                else
                    element.value = dataSource[property];
            }
        }
        catch (e) {
        }
    },
    AssignToModel: function (model) {
        var properties = Object.getOwnPropertyNames(model);
        for (var _i = 0, properties_2 = properties; _i < properties_2.length; _i++) {
            var property = properties_2[_i];
            var element = document.getElementsByName(property)[0];
            if (element != null) {
                if (element.type == "checkbox")
                    model[property] = element.checked;
                else
                    model[property] = element.value;
            }
        }
        return model;
    },
    FillComboSingular: function (dataSource, combo) {
        if (combo != null) {
            for (var i = combo.length; i >= 0; i--) {
                combo.remove(i);
            }
            for (var i = 0; i < dataSource.length; i++) {
                //let code = dataSource[i][i];
                //let name = dataSource[i][dataSource[i]];
                combo.add(new Option(dataSource[i], i.toString()));
            }
        }
    },
    FillCombo: function (dataSource, combo, codeField, textField) {
        if (combo != null) {
            for (var i = combo.length; i >= 0; i--) {
                combo.remove(i);
            }
            for (var i = 0; i < dataSource.length; i++) {
                var code = dataSource[i][codeField];
                var name_1 = dataSource[i][textField];
                combo.add(new Option(name_1, code));
            }
        }
    },
    FillComboFirstvalue: function (dataSource, combo, codeField, textField, Name, Code) {
        if (combo != null) {
            for (var i = combo.length; i >= 0; i--) {
                combo.remove(i);
            }
            combo.add(new Option(Name, Code));
            for (var i = 0; i < dataSource.length; i++) {
                var code = dataSource[i][codeField];
                var name_2 = dataSource[i][textField];
                combo.add(new Option(name_2, code));
                if (name_2 == Name && code == Code) {
                    combo.remove(i + 1);
                }
            }
        }
    },
    FillCombowithdefultAndEmptyChoice: function (dataSource, combo, codeField, textField, NameDefult, EmptyChoiceName) {
        if (combo != null) {
            for (var i = combo.length; i >= 0; i--) {
                combo.remove(i);
            }
            combo.add(new Option(NameDefult, null));
            for (var i = 0; i < dataSource.length; i++) {
                var code = dataSource[i][codeField];
                var name_3 = dataSource[i][textField];
                var id = dataSource[i][codeField];
                combo.add(new Option(name_3, code));
            }
            //add empty
            combo.add(new Option(EmptyChoiceName, "-1"));
        }
    },
    FillCombowithdefult: function (dataSource, combo, codeField, textField, NameDefult) {
        if (combo != null) {
            for (var i = combo.length; i >= 0; i--) {
                combo.remove(i);
            }
            combo.add(new Option(NameDefult, null));
            for (var i = 0; i < dataSource.length; i++) {
                var code = dataSource[i][codeField];
                var name_4 = dataSource[i][textField];
                var id = dataSource[i][codeField];
                //var x = true;
                //if (x==true) {
                //    $("#name").attr('id', id);
                //}
                //let test = 
                combo.add(new Option(name_4, code));
            }
        }
    },
    FillComboWithEmpty: function (dataSource, combo, codeField, textField) {
        for (var i = combo.length; i >= 0; i--) {
            combo.remove(i);
        }
        combo.add(new Option("", ""));
        for (var i = 0; i < dataSource.length; i++) {
            var code = dataSource[i][codeField];
            var name_5 = dataSource[i][textField];
            combo.add(new Option(name_5, code));
        }
    },
    GetElementById: function (id) {
        var element = document.getElementById(id);
        return element;
    },
    CreateElement: function (id) {
        var element = document.createElement(id);
        return element;
    }
};
function DateFormatddmmyyyy(dateForm) {
    try {
        var date = new Date();
        var myDate = "";
        if (dateForm.indexOf("Date(") > -1) {
            myDate = dateForm.split('(')[1].split(')')[0];
            date = new Date(Number(myDate));
        }
        else {
            date = new Date(ConvertTDate(dateForm).toString());
        }
        var yy = date.getFullYear();
        var mm = (date.getMonth() + 1);
        var dd = date.getDate();
        var year = yy;
        var month = (mm < 10) ? ("0" + mm.toString()) : mm.toString();
        var day = (dd < 10) ? ("0" + dd.toString()) : dd.toString();
        var startDate = year + "-" + month + "-" + day;
        var form_date = startDate;
        return form_date;
    }
    catch (e) {
        return DateFormat((new Date()).toString());
    }
}
function DateFormat(dateForm) {
    try {
        var date = new Date();
        var myDate = "";
        if (dateForm.indexOf("Date(") > -1) {
            myDate = dateForm.split('(')[1].split(')')[0];
            date = new Date(Number(myDate));
        }
        else {
            date = new Date(dateForm);
        }
        var yy = date.getFullYear();
        var mm = (date.getMonth() + 1);
        var dd = date.getDate();
        var year = yy;
        var month = (mm < 10) ? ("0" + mm.toString()) : mm.toString();
        var day = (dd < 10) ? ("0" + dd.toString()) : dd.toString();
        //The specified value "'2018-01-15'" does not conform to the required format, "yyyy-MM-dd".
        var startDate = year + "-" + month + "-" + day;
        var form_date = startDate;
        return form_date;
    }
    catch (e) {
        return DateFormat((new Date()).toString());
    }
}
function DateFormatRep(dateForm) {
    try {
        var date = new Date();
        var myDate = "";
        if (dateForm.indexOf("Date(") > -1) {
            myDate = dateForm.split('(')[1].split(')')[0];
            date = new Date(Number(myDate));
        }
        else {
            date = new Date(dateForm);
        }
        var yy = date.getFullYear();
        var mm = (date.getMonth() + 1);
        var dd = date.getDate();
        var year = yy;
        var month = (mm < 10) ? ("0" + mm.toString()) : mm.toString();
        var day = (dd < 10) ? ("0" + dd.toString()) : dd.toString();
        //The specified value "'2018-01-15'" does not conform to the required format, "dd/MM/yyyy".
        var startDate = day + "/" + month + "/" + year;
        return startDate;
    }
    catch (e) {
        return DateFormatRep((new Date()).toString());
    }
}
function DateTimeFormat(dateForm) {
    try {
        var date = new Date();
        var myDate = "";
        if (dateForm.indexOf("Date(") > -1) {
            myDate = dateForm.split('(')[1].split(')')[0];
            date = new Date(Number(myDate));
        }
        else {
            date = new Date(dateForm);
        }
        var yy = date.getFullYear();
        var mm = (date.getMonth() + 1);
        var dd = date.getDate();
        var hh = (date.getHours());
        var mn = (date.getMinutes());
        var ss = (date.getSeconds());
        var year = yy;
        var month = (mm < 10) ? ("0" + mm.toString()) : mm.toString();
        var day = (dd < 10) ? ("0" + dd.toString()) : dd.toString();
        var hour = (hh < 10) ? ("0" + hh.toString()) : hh.toString();
        var Minute = (mn < 10) ? ("0" + mn.toString()) : mn.toString();
        var Second = (ss < 10) ? ("0" + ss.toString()) : ss.toString();
        var startDate = year + "-" + month + "-" + day + "T" + hour + ":" + Minute; //+ ":" + Second;
        var form_date = startDate;
        return form_date;
    }
    catch (e) {
        return DateFormat((new Date()).toString());
    }
}
function ConvertToDate(date) {
    try {
        var x = date.split(" ");
        var dt = x[0].split("/");
        var tm = x[1].split(":");
        var st = x[2];
        var day = dt[0];
        var month = dt[1];
        var year = dt[2];
        var hour = tm[0];
        var Minute = tm[1];
        var Second = tm[2];
        var startDate = year + "-" + month + "-" + day + "T" + hour + ":" + Minute + ":" + Second;
        var form_date = new Date(startDate);
        return form_date;
    }
    catch (e) {
        return (GetCurrentDate());
    }
}
function DateTimeFormatWithoutT(dateForm) {
    try {
        var date = new Date();
        var myDate = "";
        if (dateForm.indexOf("Date(") > -1) {
            myDate = dateForm.split('(')[1].split(')')[0];
            date = new Date(Number(myDate));
        }
        else {
            date = new Date(dateForm);
        }
        var yy = date.getFullYear();
        var mm = (date.getMonth() + 1);
        var dd = date.getDate();
        var hh = (date.getHours());
        var mn = (date.getMinutes());
        var ss = (date.getSeconds());
        var year = yy;
        var month = (mm < 10) ? ("0" + mm.toString()) : mm.toString();
        var day = (dd < 10) ? ("0" + dd.toString()) : dd.toString();
        var hour = (hh < 10) ? ("0" + hh.toString()) : hh.toString();
        var Minute = (mn < 10) ? ("0" + mn.toString()) : mn.toString();
        var Second = (ss < 10) ? ("0" + ss.toString()) : ss.toString();
        var startDate = year + "-" + month + "-" + day + " " + hour + ":" + Minute; //+ ":" + Second;
        var form_date = new Date(startDate);
        return form_date.toLocaleString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true });
    }
    catch (e) {
        return DateFormat(new Date().toString());
    }
}
function ConvertTDate(date) {
    try {
        var x = date.split(" ");
        var dt = x[0].split("/");
        var day = dt[0];
        var month = dt[1];
        var year = dt[2];
        var startDate = year + "-" + month + "-" + day;
        var form_date = new Date(startDate);
        return form_date;
    }
    catch (e) {
        return (GetCurrentDate());
    }
}
function ClearGrid(_Grid, arr) {
    if (_Grid === void 0) { _Grid = new JsGrid(); }
    arr = new Array();
    _Grid.DataSource = arr;
    _Grid.Bind();
}
function HeaderTemplate(headerTitle, element) {
    var tbl = DocumentActions.CreateElement("table");
    tbl.style.width = "100%";
    var headerTr = DocumentActions.CreateElement("tr");
    headerTr.innerHTML = "<td style='text-align:center;' >" + headerTitle + "</td>";
    var cellTr = DocumentActions.CreateElement("tr");
    var cell = DocumentActions.CreateElement("td");
    cell.style.textAlign = "center";
    cell.setAttribute("Eslam", "democlass");
    cell.appendChild(element);
    cellTr.appendChild(cell);
    tbl.appendChild(headerTr);
    tbl.appendChild(cellTr);
    return tbl;
}
//eslam 25 oct 2020
function HeaderTemplate_ThreeElements(headerTitle, element_1, element_2) {
    var tbl = DocumentActions.CreateElement("table");
    tbl.style.width = "100%";
    var headerTr = DocumentActions.CreateElement("tr");
    headerTr.innerHTML = "<td style='text-align:center;'>" + headerTitle + "</td>";
    var cellTr = DocumentActions.CreateElement("tr");
    var cell = DocumentActions.CreateElement("td");
    cell.style.textAlign = "center";
    cell.appendChild(element_1);
    cell.appendChild(element_2);
    cellTr.appendChild(cell);
    tbl.appendChild(headerTr);
    tbl.appendChild(cellTr);
    return tbl;
}
var Resources = (function () {
    function Resources() {
    }
    return Resources;
}());
function CreateElement(typeElement, className, defaultValue, minValue, id, step) {
    typeElement = typeElement.toLocaleLowerCase();
    var element = DocumentActions.CreateElement("input");
    element.className = className;
    element.id = "h_" + id;
    element.type = typeElement;
    element.value = defaultValue;
    element.min = minValue;
    element.step = step;
    return element;
}
//eslam 25 oct 2020
function CreateLabelElement(defaultValue, id) {
    var element = DocumentActions.CreateElement("label");
    element.style.textAlign = "center";
    element.id = id;
    element.innerText = defaultValue;
    return element;
}
function SetSearchControlName(id) {
    $("#SearchControlName").val(id);
}
var CodeDesciptionModel = (function () {
    function CodeDesciptionModel() {
    }
    return CodeDesciptionModel;
}());
function WorningMessage(msg_Ar, msg_En, tit_ar, tit_en, OnOk) {
    if (tit_ar === void 0) { tit_ar = "تنبيه"; }
    if (tit_en === void 0) { tit_en = "Worning"; }
    var Env = GetSystemEnvironment();
    switch (Env.ScreenLanguage) {
        case "ar":
            MessageBox.Show(msg_Ar, tit_ar, OnOk);
            focus();
            break;
        case "en":
            MessageBox.Show(msg_En, tit_en, OnOk);
            focus();
            break;
    }
}
function ConfirmMessage(msg_Ar, msg_En, tit_ar, tit_en, OnOk) {
    if (msg_Ar === void 0) { msg_Ar = "تمت عملية الحفظ  بنجاح"; }
    if (msg_En === void 0) { msg_En = "Data Saved Successfully"; }
    if (tit_ar === void 0) { tit_ar = "تأكيد"; }
    if (tit_en === void 0) { tit_en = "Confirm"; }
    var Env = GetSystemEnvironment();
    switch (Env.ScreenLanguage) {
        case "ar":
            MessageBox.Show(msg_Ar, tit_ar, OnOk);
            break;
        case "en":
            MessageBox.Show(msg_En, tit_en, OnOk);
            break;
    }
}
function ConfirmMessagee(msg_Ar, msg_En, tit_ar, tit_en, OnOk) {
    if (msg_Ar === void 0) { msg_Ar = "تمت عملية الحفظ  بنجاح"; }
    if (msg_En === void 0) { msg_En = "Data Saved Successfully"; }
    if (tit_ar === void 0) { tit_ar = "تأكيد"; }
    if (tit_en === void 0) { tit_en = "Confirm"; }
    var Env = GetSystemEnvironment();
    switch (Env.ScreenLanguage) {
        case "ar":
            MessageBox.Show(msg_Ar, tit_ar, OnOk);
            return 1;
        case "en":
            MessageBox.Show(msg_En, tit_en, OnOk);
            return 1;
    }
}
function WorningMessageDailog(msg_Ar, msg_En, tit_ar, tit_en, OnOk, OnCancel) {
    if (tit_ar === void 0) { tit_ar = "تنبيه"; }
    if (tit_en === void 0) { tit_en = "Worning"; }
    var Env = GetSystemEnvironment();
    switch (Env.ScreenLanguage) {
        case "ar":
            MessageBox.Ask(msg_Ar, tit_ar, OnOk, OnCancel);
            break;
        case "en":
            MessageBox.Ask(msg_En, tit_en, OnOk, OnCancel);
            break;
    }
}
//function MessageDailog(msg_Ar: string, msg_En: string, tit_ar: string = "تنبيه", tit_en: string = "Worning") {
//     
//    switch (SysSession.CurrentEnvironment.ScreenLanguage) {
//        case "ar":
//            MessageBox.MSgBox(msg_Ar, tit_ar);
//            break;
//        case "en":
//            MessageBox.MSgBox(msg_En, tit_en);
//            break;
//    }
//}
function AddDate(prd, Sdate, count) {
    var Tdate;
    Tdate = Sdate; //new Date();
    switch (prd) {
        case 1:
            Tdate.setHours(Sdate.getHours() + count);
            break;
        case 2:
            Tdate.setDate(Sdate.getDate() + (count - 1));
            break;
        case 3:
            Tdate.setDate(Sdate.getDate() + ((7 * count) - 1));
            break;
        case 4:
            // Loop from cur month with Qty * Prd times 
            Tdate = Sdate;
            Tdate.setMonth(Tdate.getMonth() + count);
            Tdate.setDate(Tdate.getDate() + -1);
            break;
        case 5:
            // add 365 or 366 days 
            Tdate = Sdate;
            Tdate.setFullYear(Tdate.getFullYear() + count);
            Tdate.setDate(Tdate.getDate() + -1);
            break;
    }
    return Tdate;
}
function GetResourceByName(Sourcekey) {
    var result = "";
    Ajax.Callsync({
        url: Url.Action("GetResourceByName", "ClientTools"),
        data: { key: Sourcekey },
        success: function (d) {
            result = d.result;
        }
    });
    return result;
}
function GetResourceList(Sourcekey) {
    //var result = Ajax.Call<any>({
    //    url: Url.Action("GetResourceNames", "ClientTools"),
    //    data: { _prefix: Sourcekey },
    //    success: (d) => {
    //        result = JSON.parse(d.result) as any;
    //    }
    //});
    return 0;
}
function GetCurrentDate() {
    //  
    var ses = GetSystemSession();
    var kControl = ses.CurrentEnvironment.I_Control;
    if (kControl != undefined) {
        var now = new Date;
        var utc = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds());
        utc.setHours(utc.getHours() + kControl.UserTimeZoneUTCDiff);
        return utc;
    }
    else {
        return (new Date());
    }
}
function CreateDropdownList(arr, Name_Ar, Name_En, Key, IsSelectNull) {
    if (IsSelectNull === void 0) { IsSelectNull = false; }
    var Env = GetSystemEnvironment();
    var element = document.createElement("select");
    element.className = "form-control input-sm";
    if (IsSelectNull == true)
        element.options.add(new Option(" ", "null"));
    switch (Env.Language) {
        case "ar":
            for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
                var item = arr_1[_i];
                element.options.add(new Option(item[Name_Ar], item[Key]));
            }
            break;
        case "en":
            for (var _a = 0, arr_2 = arr; _a < arr_2.length; _a++) {
                var item = arr_2[_a];
                element.options.add(new Option(item[Name_En], item[Key]));
            }
            break;
    }
    return element;
}
//eslam elassal 20 oct 2020 => CreateDropdownListWithDefaultValue(K_D_ExpensesDataSource, "DescA", "DescE", "ExpenseID", "اختر",true);s
function CreateDropdownListWithDefaultValue(arr, Name_Ar, Name_En, Key, DefaultVal, IsSelectNull) {
    if (IsSelectNull === void 0) { IsSelectNull = false; }
    var Env = GetSystemEnvironment();
    var element = document.createElement("select");
    element.className = "form-control input-sm";
    if (IsSelectNull == true)
        element.options.add(new Option(DefaultVal, "null"));
    switch (Env.Language) {
        case "ar":
            for (var _i = 0, arr_3 = arr; _i < arr_3.length; _i++) {
                var item = arr_3[_i];
                element.options.add(new Option(item[Name_Ar], item[Key]));
            }
            break;
        case "en":
            for (var _a = 0, arr_4 = arr; _a < arr_4.length; _a++) {
                var item = arr_4[_a];
                element.options.add(new Option(item[Name_En], item[Key]));
            }
            break;
    }
    return element;
}
//function CreateListMaleFemale(): HTMLSelectElement {
//    var offDay = [
//        {
//            Name_Ar: "ولد",
//            Name_En: "Male",
//            Id: 1
//        },
//        {
//            Name_Ar: "بنت",
//            Name_En: "Female",
//            Id: 0
//        },
//    ];
//    let element = document.createElement("select") as HTMLSelectElement;
//    element.className = "form-control input-sm";
//    switch (SharedWork.Session.Language) {
//        case "ar":
//            for (var item of offDay) {
//                element.options.add(new Option(item.Name_Ar, item.Id.toString()));
//            }
//            break;
//        case "en":
//            for (var item of offDay) {
//                element.options.add(new Option(item.Name_En, item.Id.toString()));
//            }
//            break;
//    }
//    return element;
//}
function Errorinput(input) {
    if (input.selector != null) {
        $('' + input.selector + '').addClass('text_Mandatory');
        $('' + input.selector + '').focus();
        setTimeout(function () { $('' + input.selector + '').removeClass('text_Mandatory'); }, 5000);
    }
    else {
        input.classList.add('text_Mandatory');
        input.focus();
        setTimeout(function () { input.classList.remove('text_Mandatory'); }, 5000);
    }
}
function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp);
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = hour + ':' + min + ':' + sec;
    var timeString = converTime(time);
    return timeString;
}
var converTime = function (time) {
    var hour = (time.split(':'))[0];
    var min = (time.split(':'))[1];
    var part = hour > 12 ? 'pm' : 'am';
    min = (min + '').length == 1 ? "0" + min : min;
    hour = hour > 12 ? hour - 12 : hour;
    hour = (hour + '').length == 1 ? "0" + hour : hour;
    return (hour + ":" + min + " " + part);
};
function reindexArray(array) {
    var index = 0; // The index where the element should be
    for (var key in array) {
        //if (parseInt(key) !== index)     // If the element is out of sequence
        //{
        array[index] = array[key]; // Move it to the correct, earlier position in the array
        ++index; // Update the index
    }
    array.splice(index); // Remove any remaining elements (These will be duplicates of earlier items)
}
;
function OpenPopUp(moduleCode, PopupBody, PopupDialog) {
    var json = $.ajax({
        type: "GET",
        url: "OpenView",
        data: { ModuleCode: moduleCode },
        cache: false,
        async: false,
        success: function (response) {
            $("#" + PopupBody).html(response);
            //$("#PopupDialog").modal("show");
            $("#" + PopupDialog).modal('show');
            $("#" + PopupDialog).modal({
                refresh: true
            });
            //var val = $("#rpTitle").text();
            //$("#TitleSpanRep").html(val);
        }
    });
}
//# sourceMappingURL=App.js.map