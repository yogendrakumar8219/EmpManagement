async function mMsater(sectid = '', ddl, TableId, ParentId) {
    const userdata = {
        id: TableId,
        ParentId: ParentId,
    };

    try {
        const response = await fetch('/Master/GetAllMMaster', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(userdata) // Convert userdata to URL-encoded string
        });

        const result = await response.json();

        if (result !== "null" && result !== null) {
            if (result === InternalServerError) {
                Swal.fire({
                    text: errormsg
                });
            } else {
                let listItemddl = "";

                switch (parseInt(TableId)) {
                    case 1:
                        listItemddl += '<option value="">Select Gender</option>';
                        break;
                    case 2:
                        listItemddl += '<option value="">Select State</option>';
                        break;
                    case 3:
                        listItemddl += '<option value="">Select District</option>';
                        break;
                    default:
                        listItemddl += '<option value="">Please Select</option>';
                }

                for (let i = 0; i < result.length; i++) {
                    listItemddl += `<option value="${result[i].Id}">${result[i].Name}</option>`;
                }

                document.getElementById(ddl).innerHTML = listItemddl;

                if (sectid !== '') {
                    document.getElementById(ddl).value = sectid;
                }
            }
        } else {
            Swal.fire({
                text: "No data found Offrs"
            });
        }
    } catch (error) {
        Swal.fire({
            text: errormsg002
        });
    }
}

function yeardata(sectid = '', ddl) {
    let listItemddl = '<option value="">Select One</option>';

    for (let i = new Date().getFullYear(); i >= 1950; i--) {
        listItemddl += `<option value="${i}">${i}</option>`;
    }

    document.getElementById(ddl).innerHTML = listItemddl;

    if (sectid !== '') {
        document.getElementById(ddl).value = sectid;
    }
}