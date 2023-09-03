var dsnv = new DSNV();
function getElm(selector) {
    return document.querySelector(selector);
}

function renderTable(listArr) {
    var htmlString = '';
    for (let i = 0; i < listArr.length; i++) {
        var Employee = listArr[i];


        htmlString += `<tr>
            <td>${Employee.taiKhoan}</td>
            <td>${Employee.fullName}</td>
            <td>${Employee.email}</td>
            <td>${Employee.dateBeginWork}</td>
            <td>${Employee.option}</td>
            <td>${Employee.totalSalary()}</td>
            <td>${Employee.typeOfEmployee()}</td>
            <td>
                <button class="btn btn-warning" onclick="editEmployee('${Employee.taiKhoan}'),clickBtnAddEmployee()">edit</button>
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

function addEmployee() {



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
    // validate Lương cơ bản
    valid &=
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
        validationWorkingHourPerMonth(
            Employee.totalHourWork,
            "#tbGiolam",
            "Số Giờ Làm mỗi Tháng phải từ 80 đến 200.");






    if (valid) {
        document.querySelector('#message').style.display = 'none';
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
    console.log(dsnv.Employees);
}


function clearForm() {
    getElm('#tknv').value = '';
    getElm('#name').value = '';
    getElm('#email').value = '';
    getElm('#password').value = '';
    getElm('#datepicker').value = '';
    getElm('#luongCB').value = 0;
    getElm('#chucvu').value = '';
    getElm('#gioLam').value = 0;
}
function editEmployee(taiKhoan) {
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
    dsnv._updateEmployee(Employee);
    // clearForm();
    renderTable(dsnv.Employees);
}

// ==========================================================================================================
// ==========================================================================================================
