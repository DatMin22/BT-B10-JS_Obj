// ******************************************************************************************************
// Validation
// + Tài khoản tối đa 4 - 6 ký số, không để trống
// + Tên nhân viên phải là chữ, không để trống
// + Email phải đúng định dạng, không để trống
// + mật Khẩu từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt), không
// để trống
// + Ngày làm không để trống, định dạng mm/dd/yyyy
// + Lương cơ bản 1 000 000 - 20 000 000, không để trống
// ******************************************************************************************************

function validationEmptyForm(value, idErr, message) {
    let DOMidErr = document.querySelector(idErr);

    if (value.trim() === '') {
        DOMidErr.style.display = 'inline';
        DOMidErr.innerHTML = message;
        return false;
    } else {
        DOMidErr.style.display = 'none';

        DOMidErr.innerHTML = '';
        return true;
    }
}

// kiểm tra email
function validationEmail(value, idErr, message) {
    let DOMidErr = document.querySelector(idErr);
    const re =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    var isEmail = re.test(value);
    if (isEmail) {
        DOMidErr.style.display = 'none';

        DOMidErr.innerHTML = '';
        return true;
    } else {
        DOMidErr.style.display = 'inline';

        DOMidErr.innerHTML = message;
        return false;
    }
}
// kiểm tra tài khoản
function validationTaikhoan(value, idErr, message) {
    // account have to has 4 to 6 letters
    let DOMidErr = document.querySelector(idErr);
    if (value.length >= 4 && value.length <= 6) {
        DOMidErr.style.display = 'none';

        DOMidErr.innerHTML = '';
        return true;
    } else {
        DOMidErr.style.display = 'inline';

        DOMidErr.innerHTML = message;
        return false;
    }


}
// kiểm tra tên
function validationName(value, idErr, message) {
    // validate name have to letters by regex
    let DOMidErr = document.querySelector(idErr);
    const regexName = /[a-zA-Z]/g;
    const regexNumber = /\d/;
    const regexSpacing = /\s/g;
    var isName = regexName.test(value);
    // console.log('isName: ', isName);
    var isNumber = regexNumber.test(value);
    console.log('isNumber: ', isNumber);
    var isSpacing = regexSpacing.test(value);
    // console.log(isSpacing);
    if (isName && !isNumber && isSpacing) {
        DOMidErr.style.display = 'none';

        DOMidErr.innerHTML = '';

        return true;
    }
    else {
        DOMidErr.style.display = 'inline';

        DOMidErr.innerHTML = message;
        return false;
    }

}

// kiểm tra mật khẩu
function validationPassword(value, idErr, message) {

    let DOMidErr = document.querySelector(idErr);

    var lowerCaseLetters = /[a-z]/g;
    var upperCaseLetters = /[A-Z]/g;
    var numbers = /[0-9]/g;
    if (value.match(lowerCaseLetters)
        && value.match(upperCaseLetters)
        && value.match(numbers)
        && value.length >= 8) {
        DOMidErr.innerHTML = '';
        DOMidErr.style.display = 'none';
        return true;

    } else {
        DOMidErr.style.display = 'inline';
        DOMidErr.innerHTML = message;
        flag = -1;
        return false;
    }


}


// kiểm tra lương
function validationBasicSalary(value, idErr, message) {
    // validate name have to letters by regex
    let DOMidErr = document.querySelector(idErr);
    if (value >= 1000000 && value <= 20000000) {
        DOMidErr.style.display = 'none';
        DOMidErr.innerHTML = '';
        return true;
    }
    else {
        DOMidErr.style.display = 'inline';
        DOMidErr.innerHTML = message;
        return false;
    }

}
// kiểm tra số giờ làm
// + Số giờ làm trong tháng 80 - 200 giờ, không để trống
function validationWorkingHourPerMonth(value, idErr, message) {
    // validate name have to letters by regex
    let DOMidErr = document.querySelector(idErr);
    if (value >= 80 && value <= 200) {
        DOMidErr.style.display = 'none';
        DOMidErr.innerHTML = '';
        return true;
    }
    else {
        DOMidErr.style.display = 'inline';
        DOMidErr.innerHTML = message;
        return false;
    }

}

// kiểm tra chức vụ
// + Chức vụ phải chọn, chức vụ hợp lệ (Giám đốc, Trưởng Phòng, Nhân Viên)
function validationPosition(value, idErr, message) {
    // validate name have to letters by regex
    let DOMidErr = document.querySelector(idErr);
    if (value === 'GD' || value === 'TP' || value === 'NV') {
        DOMidErr.style.display = 'none';
        DOMidErr.innerHTML = '';
        return true;
    }
    else {
        DOMidErr.style.display = 'inline';
        DOMidErr.innerHTML = message;
        return false;
    }

}

