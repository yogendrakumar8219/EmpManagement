document.addEventListener('DOMContentLoaded', function () {
    mMsater(0, "ddlGender", EntityType.Gender, "");
    //mMsater(0, "ddlState", EntityType.State, "");
    BindData();

    document.getElementById("btnEmployeeAdd").addEventListener("click", function () {
        Reset();
        ResetErrorMessage();
        new bootstrap.Modal(document.getElementById("AddNewEmployee")).show();
    });

    document.getElementById("btnEmployeeAddReset").addEventListener("click", function () {
        Reset();
        ResetErrorMessage();
    });

    document.getElementById("btnEmployeeSubmit").addEventListener("click", function () {
        Proceed();
    });

    document.getElementById("ddlState").addEventListener("change", function () {
        mMsater(0, "ddlDistrict", EntityType.District, document.getElementById("ddlState").value);
    });
});

async function Proceed() {
    ResetErrorMessage();
    const formId = '#SaveEmployee';
    const form = document.querySelector(formId);

    if (form.checkValidity()) {
        const result = await Swal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Save it!'
        });

        if (result.isConfirmed) {
            SaveEmployee();
        }
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please fill required fields.',
        });
    }
}

async function BindData() {
    let listItem = "";
    try {
        const response = await fetch('/Employee/GetAllEmployee', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        });

        const data = await response.json();

        if (data && data !== "null") {
            const tableBody = document.getElementById("DetailBody");
            if (data === InternalServerError) {
                Swal.fire({ text: errormsg });
            } else if (data.length === 0) {
                $("#tbldata").DataTable().destroy();
                tableBody.innerHTML = listItem;
                $('#tbldata').DataTable({ language: { emptyTable: "No data available" } });
            } else {
                $("#tbldata").DataTable().destroy();
                data.forEach((employee, index) => {
                    listItem += `<tr>
                        <td class="d-none"><span id="empId">${employee.Id}</span><span id="genderId">${employee.GenderId}</span><span id="stateId">${employee.StateId}</span><span id="districtId">${employee.DistrictId}</span></td>
                        <td class="align-middle">${index + 1}</td>
                        <td class="align-middle">${employee.Id}</td>
                        <td class="align-middle"><span id="empName">${employee.Name}</span></td>
                        <td class="align-middle">${employee.GenderName}</td>
                        <td class="align-middle"><span id="empAddress">${employee.Address}</span></td>
                        <td class="align-middle">${employee.StateName}</td>
                        <td class="align-middle">${employee.DistrictName}</td>
                        <td class="align-middle"><span id="btnedit"><button type="button" class="cls-btnedit btn btn-icon btn-round btn-warning mr-1"><i class="fas fa-edit"></i></button></span><button type="button" class="cls-btnDelete btn-icon btn-round btn-danger mr-1"><i class="fas fa-trash-alt"></i></button></td>
                    </tr>`;
                });
                tableBody.innerHTML = listItem;
                $('#tbldata').DataTable({ retrieve: true, lengthChange: false, searching: false, order: [[1, "asc"]] });
            }

            // Edit and Delete actions
            document.querySelectorAll(".cls-btnedit").forEach(btn => {
                btn.addEventListener("click", function () {
                    Reset();
                    ResetErrorMessage();
                    const row = this.closest("tr");
                    document.getElementById("spnEmployeeId").innerHTML = row.querySelector("#empId").innerHTML;
                    document.getElementById("txtName").value = row.querySelector("#empName").innerHTML;
                    document.getElementById("ddlGender").value = row.querySelector("#genderId").innerHTML;
                    document.getElementById("txtAddress").value = row.querySelector("#empAddress").innerHTML;
                    document.getElementById("ddlState").value = row.querySelector("#stateId").innerHTML;
                    mMsater(row.querySelector("#districtId").innerHTML, "ddlDistrict", EntityType.District, row.querySelector("#stateId").innerHTML);

                    new bootstrap.Modal(document.getElementById("AddNewEmployee")).show();
                });
            });

            document.querySelectorAll(".cls-btnDelete").forEach(btn => {
                btn.addEventListener("click", function () {
                    const rowId = this.closest("tr").querySelector("#empId").innerHTML;
                    Swal.fire({
                        title: 'Are you sure?',
                        text: "You want to Delete",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#072697',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes, Delete It!'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            Delete(rowId);
                        }
                    });
                });
            });
        }
    } catch (error) {
        Swal.fire({ text: errormsg002 });
    }
}

async function SaveEmployee() {
    const formData = {
        Id: document.getElementById("spnEmployeeId").innerHTML,
        Name: document.getElementById("txtName").value,
        GenderId: document.getElementById("ddlGender").value,
        Address: document.getElementById("txtAddress").value,
        DistrictId: document.getElementById("ddlDistrict").value,
    };

    const response = await fetch('/Employee/SaveEmployee', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(formData)
    });

    const result = await response.json();

    if (result === DataSave) {
        toastr.success('Employee has been saved');
        new bootstrap.Modal(document.getElementById("AddNewEmployee")).hide();
        BindData();
        Reset();
        ResetErrorMessage();
    } else if (result === DataUpdate) {
        toastr.success('Employee has been updated');
        new bootstrap.Modal(document.getElementById("AddNewEmployee")).hide();
        BindData();
        Reset();
        ResetErrorMessage();
    } else if (result === DataExists) {
        toastr.error('Employee Name Exists!');
    } else if (result === InternalServerError) {
        Swal.fire({ icon: 'error', title: 'Oops...', text: 'Something went wrong or Invalid Entry!' });
    }
}

async function Delete(Id) {
    const userdata = { Id };

    const response = await fetch('/Employee/DeleteEmployee', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(userdata)
    });

    const result = await response.json();

    if (result === Success) {
        toastr.success('Deleted Successfully');
        BindData();
    } else if (result === InternalServerError) {
        Swal.fire({ text: errormsg });
    } else {
        Swal.fire({ text: errormsg001 });
    }
}

function Reset() {
    document.getElementById("spnEmployeeId").innerHTML = "0";
    document.getElementById("txtName").value = "";
    document.getElementById("ddlGender").value = "";
    document.getElementById("txtAddress").value = "";
    document.getElementById("ddlState").value = "";
    document.getElementById("ddlDistrict").value = "";
}

function ResetErrorMessage() {
    const errorFields = ["txtName-error", "ddlGender-error", "txtAddress-error", "ddlState-error", "ddlDistrict-error"];

    errorFields.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.innerHTML = "";
        } else {
            console.warn(`Element with ID ${id} not found.`);
        }
    });
}
