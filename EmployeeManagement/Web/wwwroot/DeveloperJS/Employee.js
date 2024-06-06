$(function () {
    mMsater(0, "ddlGender", Gender, "");
    mMsater(0, "ddlState", State, "");
    BindData();

    $("#btnEmployeeAdd").on("click",function () {
        Reset();
        ResetErrorMessage();
        $("#AddNewEmployee").modal('show');
    });
    $("#btnEmployeeAddReset").on("click",function () {
        Reset();
        ResetErrorMessage();
    });
    $("#btnEmployeeSubmit").on("click", function () {
        Proceed();
    });
    $("#ddlState").on("change", function () {
        //alert($("#ddlState").val());
        mMsater(0, "ddlDistrict",District, $("#ddlState").val());
    });
  
});

function Proceed() {
    ResetErrorMessage();
    let formId = '#SaveEmployee';
    $.validator.unobtrusive.parse($(formId));

    if ($(formId).valid()) {
        Swal.fire({
            title: 'Are you sure?',
            text: "",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Save it!'
        }).then((result) => {
            if (result.isConfirmed) {
               SaveEmployee();
            }
        })
    }
    else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please fill required field.',

        })
        toastr.error('Please fill required field.');
        return false;
    }
}
function BindData() {
    var listItem = "";
    $.ajax({
        url: '/Employee/GetAllEmployee',
        contentType: 'application/x-www-form-urlencoded',
        type: 'POST',

        success: function (response) {
            if (response != "null" && response != null) {

                if (response == InternalServerError) {
                    Swal.fire({
                        text: errormsg
                    });

                }
                else if (response.length == 0) {
                    $("#tbldata").DataTable().destroy();

                    $("#DetailBody").html(listItem);
                    memberTable = $('#tbldata').DataTable({
                        "language": {
                            "emptyTable": "No data available"
                        }
                    });


                }

                else {

                    $("#tbldata").DataTable().destroy();
                    for (var i = 0; i < response.length; i++) {

                        listItem += "<tr>";
                        listItem += "<td class='d-none'><span id='empId'>" + response[i].Id + "</span><span id='genderId'>" + response[i].GenderId + "</span><span id='stateId'>" + response[i].StateId + "</span><span id='districtId'>" + response[i].DistrictId + "</span></td>";
                        listItem += "<td class='align-middle'>" + (i + 1) + "</td>";
                        listItem += "<td class='align-middle'>" + response[i].Id + "</td>";
                        listItem += "<td class='align-middle'><span id='empName'>" + response[i].Name + "</span></td>";
                        listItem += "<td class='align-middle'>" + response[i].GenderName + "</td>";
                        listItem += "<td class='align-middle'><span id='empAddress'>" + response[i].Address + "</span></td>";
                        listItem += "<td class='align-middle'>" + response[i].StateName + "</td>";
                        listItem += "<td class='align-middle'>" + response[i].DistrictName + "</td>";
                        listItem += "<td class='align-middle'><span id='btnedit'><button type='button' class='cls-btnedit btn btn-icon btn-round btn-warning mr-1'><i class='fas fa-edit'></i></button></span><button type='button' class='cls-btnDelete btn-icon btn-round btn-danger mr-1'><i class='fas fa-trash-alt'></i></button>";
                        listItem += "</tr>";

                    }

                    $("#DetailBody").html(listItem);
                    //$("#lblTotal").html(response.length - 1);

                    memberTable = $('#tbldata').DataTable({
                        retrieve: true,
                        lengthChange: false,
                        searching: false,
                        "order": [[1, "asc"]],
                        buttons: [{
                            extend: 'copy',
                            exportOptions: {
                                columns: "thead th:not(.noExport)"
                            }
                        }, {
                            extend: 'excel',
                            exportOptions: {
                                columns: "thead th:not(.noExport)"
                            }
                        }, {
                            extend: 'pdfHtml5',
                            orientation: 'portrait',
                            pageSize: 'A4',
                            title: 'E-IASC_User_Profile',
                            exportOptions: {
                                columns: "thead th:not(.noExport)"
                            },
                            customize: function (doc) {
                                WaterMarkOnPdf(doc)
                            }
                        }]
                    });

                    memberTable.buttons().container().appendTo('#tbldata_wrapper .col-md-6:eq(0)');

                    var rows;

                    $("body").on("click", ".cls-btnedit", function () {
                        Reset();
                        ResetErrorMessage();
                        $("#spnEmployeeId").html($(this).closest("tr").find("#empId").html());
                        $("#txtName").val($(this).closest("tr").find("#empName").html());
                        $("#ddlGender").val($(this).closest("tr").find("#genderId").html());
                        $("#txtAddress").val($(this).closest("tr").find("#empAddress").html());
                        $("#ddlState").val($(this).closest("tr").find("#stateId").html());
                        mMsater($(this).closest("tr").find("#districtId").html(), "ddlDistrict", District, $(this).closest("tr").find("#stateId").html());

                        $("#btnEmployeeAdd").val("Update");
                        $("#AddNewEmployee").modal('show');
                    });
                    $("body").on("click", ".cls-btnDelete", function () {

                        Swal.fire({
                            title: 'Are you sure?',
                            text: "You want to Delete ",
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#072697',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Yes, Delete It!'
                        }).then((result) => {
                            if (result.value) {

                                Delete($(this).closest("tr").find("#empId").html());

                            }
                        });
                    });
                }
            }
            else {
                $("#tbldata").DataTable().destroy();

                $("#DetailBody").html(listItem);
                memberTable = $('#tbldata').DataTable({
                    "language": {
                        "emptyTable": "No data available"
                    }
                });


            }
        },
        error: function (result) {
            Swal.fire({
                text: errormsg002
            });
        }
    });

}
function SaveEmployee() {
    $.ajax({
        url: '/Employee/SaveEmployee',
        type: 'POST',
        data: {
            "Id": $("#spnEmployeeId").html(),
            "Name": $("#txtName").val(),
            "GenderId": $("#ddlGender").val(),
            "Address": $("#txtAddress").val(),
            "DistrictId": $("#ddlDistrict").val(),

        }, //get the search string
        success: function (result) {


            if (result == DataSave) {
                toastr.success('Employee has been saved');

                $("#AddNewEmployee").modal('hide');
                BindData();
                Reset();
                ResetErrorMessage();
            }
            else if (result == DataUpdate) {
                toastr.success('Employee has been Updated');

                $("#AddNewEmployee").modal('hide');
                BindData();
                Reset();
                ResetErrorMessage();
            }
            else if (result == DataExists) {

                toastr.error('Employee Name Exits!');

            }
            else if (result == InternalServerError) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong or Invalid Entry!',

                })

            } else {
                if (result.length > 0) {
                    for (var i = 0; i < result.length; i++) {
                        toastr.error(result[i][0].ErrorMessage)
                    }


                }

                        
            }
        }
    });
}

function Reset() {
    $("#spnEmployeeId").html("0");
    $("#txtName").val("");
    $("#ddlGender").val("");
    $("#txtAddress").val("");
    $("#ddlState").val("");
    $("#ddlDistrict").val("");
}
function ResetErrorMessage() {
    $("#txtName-error").html("");
    $("#ddlGender-error").html("");
    $("#txtAddress-error").html("");
    $("#ddlState-error").html("");
    $("#ddlDistrict-error").html("");

}
function Delete(Id) {
    var userdata =
    {
        "Id": Id,

    };
    $.ajax({
        url: '/Employee/DeleteEmployee',
        contentType: 'application/x-www-form-urlencoded',
        data: userdata,
        type: 'POST',
        success: function (response) {
            if (response != "null") {
                if (response == InternalServerError) {
                    Swal.fire({
                        text: errormsg
                    });
                }

                else if (response == Success) {
                    //lol++;
                    //if (lol == Tot) {

                    toastr.success('Deleted Selected');
                    BindData();
                }

                //}
            }
            else {
                Swal.fire({
                    text: errormsg001
                });
            }
        },
        error: function (result) {
            Swal.fire({
                text: errormsg002
            });
        }
    });
}