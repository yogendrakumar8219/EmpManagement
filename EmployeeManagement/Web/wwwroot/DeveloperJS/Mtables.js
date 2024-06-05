function mMsater(sectid = '', ddl, TableId, ParentId) {
    

    var userdata =
    {
        "id": TableId,
        "ParentId": ParentId,

    };
    $.ajax({
        url: '/Master/GetAllMMaster',
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
               
                else {
                    //alert(JSON.stringify(response));

                    var listItemddl = "";
                    if (parseInt(TableId) == 1) {
                        listItemddl += '<option value="">Select Gender</option>';
                    }
                    else if (parseInt(TableId) == 2) {
                        listItemddl += '<option value="">Select State</option>';
                    }
                    else if (parseInt(TableId) == 3) {
                        listItemddl += '<option value="">Select District</option>';
                    }
                    else
                    {
                        listItemddl += '<option value="">Please Select</option>';
                    }
                   
                    for (var i = 0; i < response.length; i++) {
                        listItemddl += '<option value="' + response[i].Id + '">' + response[i].Name + '</option>';
                    }
                    $("#" + ddl +"").html(listItemddl);

                    //if (TableId == 5 || TableId == 7 || TableId == 8) {
                       
                    //    if (sectid != '') {
                    //        $("#" + ddl + " option").filter(function () {
                    //            return this.text == sectid;
                    //        }).attr('selected', true);

                    //    }
                    //}
                    //else
                    //{
                        if (sectid != '') {
                            $("#" + ddl + "").val(sectid);

                        }

                    //}


                }
            }
            else {
                //Swal.fire({
                //    text: "No data found Offrs"
                //});
            }
        },
        error: function (result) {
            Swal.fire({
                text: errormsg002
            });
        }
    });
}

function yeardata(sectid = '', ddl) {
    var listItemddl = "";
   
    listItemddl += '<option value="">select One</option>';


    for (var i = new Date().getFullYear(); i >= 1950; i--) {
        listItemddl += '<option value="' + i + '">' + i + '</option>';
    }
    $("#" + ddl + "").html(listItemddl);


    if (sectid != '') {
        $("#" + ddl + "").val(sectid);

    }
}