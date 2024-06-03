﻿$(document).ready(function () {
    mMsater(0, "ddlRank", Rank, "");
    BindData()

    $("#btnProfileAdd").click(function () {
        Reset();
        ResetErrorMessage();
        $("#AddNewProfile").modal('show');
    });
    $("#btnProfileAddReset").click(function () {
        Reset();
        ResetErrorMessage();
    });
    
    $("#txtSearch").keyup(function () {
        var eThis = $(this);
        if ($("input[type='radio'][name=choice]:checked").length > 0) {
            if ($("input[type='radio'][name=choice]:checked").val() == "UserId") {
                var num_val = parseInt(eThis.val()); 
                if (isNaN(num_val)) {
                    alert("Enter only number");
                    eThis.val('')
                }
                else {
                    eThis.val(num_val)
                    BindData()
                }
            }
            else {
                BindData()
            }
        }
        else {
            alert("Select Choice");
        }
    });
});

function Proceed() {
    ResetErrorMessage();
    let formId = '#SaveProfile';
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
                Save();
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
    var userdata =
    {
        "Search": $("#txtSearch").val(),
        "Choice": $("input[type='radio'][name=choice]:checked").val()
    };
    $.ajax({
        url: '/Account/GetAllProfileManage',
        contentType: 'application/x-www-form-urlencoded',
        data: userdata,
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
                    ProfileCount();
                    for (var i = 0; i < response.length; i++) {

                        listItem += "<tr>";
                        listItem += "<td class='d-none'><span id='regId'>" + response[i].Id + "</span><span id='userId'>" + response[i].UserId + "</span><span id='rankId'>" + response[i].RankId + "</span><span id='mobileNo'>" + response[i].MobileNo + "</span></td>";
                        listItem += "<td class='align-middle'>" + (i + 1) + "</td>";
                        listItem += "<td class='align-middle'><span id='userId'>" + response[i].UserId + "</span></td>";
                        
                        if (response[i].DomainId != null && response[i].DomainId != "null")
                            listItem += "<td class='align-middle'><span id='domainId'>" + response[i].DomainId + "</span></td>";
                        else
                            listItem += "<td class='align-middle'><span><span class='badge badge-pill badge-danger' id='domainId'>NA</span></span></td>";

                        listItem += "<td class='align-middle'><span id='armyNo'>" + response[i].ArmyNo + "</span></td>";
                        listItem += "<td class='align-middle'><span id='rankName'>" + response[i].RankAbbreviation + "</span></td>";
                        listItem += "<td class='align-middle'><span id='username'>" + response[i].Name + "</span></td>";

                        if (response[i].IsToken == true)
                            listItem += "<td class='align-middle'><span><span class='badge badge-pill badge-success' id='isToken'>Yes</span></span></td>";
                        else
                            listItem += "<td class='align-middle'><span><span class='badge badge-pill badge-danger' id='isToken'>No</span></span></td>";

                        listItem += "<td class='align-middle'><span id='btnedit'><button type='button' class='cls-btnedit btn btn-icon btn-round btn-warning mr-1'><i class='fas fa-edit'></i></button></span></td>";


                        /*    listItem += "<td class='nowrap'><button type='button' class='cls-btnSend btn btn-outline-success mr-1'>Send To Verification</button></td>";*/
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
                        $("#spnUserProfileId").html($(this).closest("tr").find("#userId").html());
                        $("#txtArmyNo").val($(this).closest("tr").find("#armyNo").html());
                        $("#txtName").val($(this).closest("tr").find("#username").html());
                        $("#ddlRank").val($(this).closest("tr").find("#rankId").html());
                        $("#txtMobileNo").val($(this).closest("tr").find("#mobileNo").html());

                        //alert($(this).closest("tr").find("#domain_approval").html())

                        if ($(this).closest("tr").find("#isToken").html() == 'Yes') {
                            $("#isTokenyes").prop("checked", true);
                        }
                        else {
                            $("#isTokenno").prop("checked", true);
                        }

                        $("#btnProfileAdd").val("Update");
                        $("#AddNewProfile").modal('show');
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
function ProfileCount(){
    $.ajax({
        url: '/Account/TotalProfileCount',
        type: 'POST',
        success: function (result) {
            if (result == InternalServerError) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong or Invalid Entry!',

                })
            }
            else {
                $("#lblTotal").html(result);
            }
        }
    });
}
function Save() {
    $.ajax({
        url: '/Account/SaveProfileManage',
        type: 'POST',
        data: {
            "UserId": $("#spnUserProfileId").html(),
            "ArmyNo": $("#txtArmyNo").val(),
            "Name": $("#txtName").val(),
            "MobileNo": $("#txtMobileNo").val(),
            "RankId": $("#ddlRank").val(),
            "IsToken": $('input:radio[name=IsToken]:checked').val(),

        }, //get the search string
        success: function (result) {


            if (result == DataSave) {
                toastr.success('Profile has been saved');

                $("#AddNewProfile").modal('hide');
                ProfileCount();
                BindData();
                Reset();
                ResetErrorMessage();
            }
            else if (result == DataUpdate) {
                toastr.success('Profile has been Updated');

                $("#AddNewProfile").modal('hide');
                BindData();
                Reset();
                ResetErrorMessage();
            }
            else if (result == DataExists) {

                toastr.error('Army No. Exits!');

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
    $("#txtSearch").val("");

    $("#spnUserProfileId").html("0");
    $("#txtArmyNo").val("");
    $("#ddlRank").val("");
    $("#txtName").val("");
    $("#txtMobileNo").val("");
    $("#isTokenyes").prop("checked", false);
    $("#isTokenno").prop("checked", false);
}
function ResetErrorMessage() {
    $("#txtName-error").html("");
    $("#ddlRank-error").html("");
    $("#txtArmyNo-error").html("");
    $("#txtMobileNo-error").html("");
    $("#IsToken-error").html("");

}