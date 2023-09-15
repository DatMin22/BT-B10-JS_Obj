var dsnv = new DSNV();
// const DSNV_LOCAL = "DSNV_LOCAL";
var dataJSON = localStorage.getItem('dsnv');
// khi user load trang => lấy dữ liệu từ localStorage

var jsonData = localStorage.getItem('dsnv');
if (jsonData != null) {
    // JSON.parse(jsonData) => array
    // convert array cũ ( lấy localStorage ) => không có key tinhDTB() => khi lưu xuống bị mất => khi lấy lên ko còn => convert thành array mới
    dsnv.Employees = JSON.parse(jsonData).map(function (item) {
        // item : phần tử của array trong các lần lặp
        // return của map()
        return new NhanVien(
            item.taiKhoan,
            item.fullName,
            item.email,
            item.password,
            item.dateBeginWork,
            item.basicSalary,
            item.option,
            item.totalHourWork
        );
    });
    console.log("dsnv", dsnv);
    renderTable(dsnv.Employees);
}
function getElm(selector) {
    return document.querySelector(selector);
}

function renderTable(list) {
    var htmlString = '';
    for (let i = 0; i < list.length; i++) {
        var Employee = list[i];


        htmlString += `<tr>
            <td>${Employee.taiKhoan}</td>
            <td>${Employee.fullName}</td>
            <td>${Employee.email}</td>
            <td>${Employee.dateBeginWork}</td>
            <td>${Employee.option}</td>
            <td>${Employee.totalSalary()}</td>
            <td>${Employee.typeOfEmployee()}</td>
            <td>
                <button class="btn btn-warning" onclick="editEmployee('${Employee.taiKhoan}')">edit</button>
                <button class="btn btn-danger" onclick="deleteEmployee('${Employee.taiKhoan}')">delete</button>
            </td>
        </tr>
        `;
    }

    getElm("#tableDanhSach").innerHTML = htmlString;
}
function clickBtnAddEmployee() {
    document.getElementById('btnThem').click();
}
function btnThem() {
    clearForm();

}


// lấy thông tin từ form
function getInforFromForm() {

    var taiKhoan = getElm('#tknv').value;

    var fullName = getElm('#name').value;
    var email = getElm('#email').value;
    var password = getElm('#password').value;
    var dateBeginWork = getElm('#datepicker').value;
    var basicSalary = +getElm('#luongCB').value;
    var option = getElm('#chucvu').value;
    var totalHourWork = +getElm('#gioLam').value;

    var Employee = new NhanVien(taiKhoan,
        fullName, email, password, dateBeginWork, basicSalary, option, totalHourWork

    );


    return Employee;
}


// validation
function validateForm(E) {
    // var Employee = getInforFromForm();
    // E = Employee;

    var valid = true;
    // validate taiKhoan
    valid &= validationEmptyForm(
        E.taiKhoan,
        '#tbTKNV',
        'Tài khoản không được để trống!')
        &&
        kiemTraTrung(E.taiKhoan,
            dsnv.Employees,
            "#tbTKNV",
            "Mã nhân viên đã tồn tại!")
        && validationTaikhoan(
            E.taiKhoan,
            '#tbTKNV',
            'Tài khoản phải có 4 đến 6 kí tự!');

    // validate FullName
    valid &= validationEmptyForm(
        E.fullName,
        '#tbTen',
        'Tên không được để trống!')
        &&
        validationName(
            E.fullName,
            '#tbTen',
            'Tên phải là chữ!');
    // validate email
    valid &= validationEmptyForm(
        E.email,
        '#tbEmail',
        'Email không được để trống!')
        &&
        validationEmail(
            E.email,
            '#tbEmail',
            'Email không đúng định dạng!')
    // validate mật khẩu
    valid &= validationEmptyForm(
        E.password,
        '#tbMatKhau',
        'Mật khẩu không được để trống!')

        && validationPassword(
            E.password,
            '#tbMatKhau',
            'Mật khẩu chưa đúng định dạng!')


    // ngày vào làm
    valid &= validationEmptyForm(
        E.dateBeginWork,
        '#tbNgay',
        'Bạn chưa nhập ngày vào làm!')


    // validate Lương cơ bản
    valid &= validationNumber(
        E.basicSalary,
        '#tbLuongCB',
        'Lương không được để trống.'
    )
        &&
        validationBasicSalary(
            E.basicSalary,
            '#tbLuongCB',
            'Lương phải từ 1 triệu đến 20 triệu.'
        )
        ;

    // validate chức vụ
    valid &= validationPosition(
        E.option,
        '#tbChucVu',
        'Bạn chưa chọn chức vụ!');
    // validate số giờ làm
    valid &=
        validationNumber(
            E.totalHourWork,
            "#tbGiolam",
            "Số giờ không được để trống!.")
        &&
        validationWorkingHourPerMonth(
            E.totalHourWork,
            "#tbGiolam",
            "Số giờ làm mỗi tháng phải từ 80 đến 200.");

    return valid;
}
// /////////////////
function addEmployee() {

    var Employee = getInforFromForm();

    if (validateForm(Employee)) {
        // document.querySelector('#message').style.display = 'none';
        dsnv._addEmployee(Employee);
        var data = JSON.stringify(dsnv.Employees);
        localStorage.setItem("dsnv", data);
        renderTable(dsnv.Employees);
        clearForm();
    }
}

function deleteEmployee(taiKhoan) {
    dsnv._deleteEmployee(taiKhoan);
    renderTable(dsnv.Employees);
    // console.log(dsnv.Employees);
}


function clearForm() {

    document.getElementById("formQLNV").reset();
    document.getElementById("tknv").disabled = false;
}
function editEmployee(taiKhoan) {
    $('#myModal').modal('show');

    var Employee = dsnv._inforEmployee(taiKhoan);
    // console.log(Employee);
    getElm('#name').value = Employee.fullName;


    getElm('#tknv').value = Employee.taiKhoan;
    getElm('#tknv').disabled = true;

    getElm('#email').value = Employee.email;
    getElm('#password').value = Employee.password;
    getElm('#datepicker').value = Employee.dateBeginWork;
    getElm('#luongCB').value = Employee.basicSalary;
    getElm('#chucvu').value = Employee.option;
    getElm('#gioLam').value = Employee.totalHourWork;
}

function updateEmployee() {
    var Employee = getInforFromForm();
    var valid = true;
    // validate taiKhoan
    valid &= validationEmptyForm(
        Employee.taiKhoan,
        '#tbTKNV',
        'Tài khoản không được để trống!')

        && validationTaikhoan(
            Employee.taiKhoan,
            '#tbTKNV',
            'Tài khoản phải có 4 đến 6 kí tự!');

    // validate FullName
    valid &= validationEmptyForm(
        Employee.fullName,
        '#tbTen',
        'Tên không được để trống!')
        &&
        validationName(
            Employee.fullName,
            '#tbTen',
            'Tên phải là chữ!');
    // validate email
    valid &= validationEmptyForm(
        Employee.email,
        '#tbEmail',
        'Email không được để trống!')
        &&
        validationEmail(
            Employee.email,
            '#tbEmail',
            'Email không đúng định dạng!')
    // validate mật khẩu
    valid &= validationEmptyForm(
        Employee.password,
        '#tbMatKhau',
        'Mật khẩu không được để trống!')

        && validationPassword(
            Employee.password,
            '#tbMatKhau',
            'Mật khẩu chưa đúng định dạng!')


    // ngày vào làm
    valid &= validationEmptyForm(
        Employee.dateBeginWork,
        '#tbNgay',
        'Bạn chưa nhập ngày vào làm!')


    // validate Lương cơ bản
    valid &= validationNumber(
        Employee.basicSalary,
        '#tbLuongCB',
        'Lương không được để trống.'
    )
        &&
        validationBasicSalary(
            Employee.basicSalary,
            '#tbLuongCB',
            'Lương phải từ 1 triệu đến 20 triệu.'
        )
        ;

    // validate chức vụ
    valid &= validationPosition(
        Employee.option,
        '#tbChucVu',
        'Bạn chưa chọn chức vụ!');
    // validate số giờ làm
    valid &=
        validationNumber(
            Employee.totalHourWork,
            "#tbGiolam",
            "Số giờ không được để trống!.")
        &&
        validationWorkingHourPerMonth(
            Employee.totalHourWork,
            "#tbGiolam",
            "Số giờ làm mỗi tháng phải từ 80 đến 200.");

    if (valid) {
        dsnv._updateEmployee(Employee);
        // clearForm();
        renderTable(dsnv.Employees);
        alert('update successfully!');
    }
}

//tìm kiếm
document.querySelector("#btnTimNV").onclick = function () {
    var textSearch = document.querySelector("#searchName").value?.toLowerCase();
    var result = [];

    if (textSearch.length > 0) {
        // for (let i = 0; i < dsnv.Employees.length; i++) {
        //     result = dsnv.Employees[i].fullName.toLowerCase().includes(textSearch);
        // }
        result = dsnv.Employees.filter(function (Employee) {
            return Employee.fullName.toLowerCase().includes(textSearch);
        });

        renderTable(result);
    } else {
        renderTable(dsnv.Employees);
    }

    // var searchValue = document.getElementById('searchName').value;
    // // var searchResults = document.getElementById('searchResults');
    // var result = '';


    // // searchResults.innerHTML = '';

    // result = dsnv.Employees.forEach(function (employee) {
    //     if (employee.fullName.toLowerCase().includes(searchValue.toLowerCase())) {
    //         // var employeeDiv = document.createElement('div');
    //         // employeeDiv.innerHTML = `<h3>${employee.name}</h3><p>Chức vụ: ${employee.position}</p>`;
    //         // searchResults.appendChild(employeeDiv);
    //         console.log(employee);
    //         // result = employee;
    //         // return result;
    //     }

    // });
    // console.log(result);
    // renderTable(result);

    // if (searchResults.children.length === 0) {
    //     searchResults.innerHTML = 'Không tìm thấy nhân viên.';
    // }
};

// ==========================================================================================================
// ==========================================================================================================