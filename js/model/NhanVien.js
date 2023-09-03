function NhanVien(_taiKhoan, _fullName, _email, _password,
    _dateBeginWork, _basicSalary, _option, _totalHourWork) {
    // PROPERTY
    this.taiKhoan = _taiKhoan;
    this.fullName = _fullName;  // tên đầy đủ của nhân viên
    this.email = _email;// email của người dùng
    this.password = _password;
    this.dateBeginWork = _dateBeginWork;
    this.basicSalary = _basicSalary;
    this.option = _option;
    this.totalHourWork = _totalHourWork;

    // METHOD
    // loại nhân viên
    this.typeOfEmployee = function () {
        var typeOfEmployee = '';
        // +nếu nhân viên có giờ làm trên 192h (>=192): nhân viên xuất sắc
        // +nếu nhân viên có giờ làm trên 176h (>=176): nhân viên giỏi
        // +nếu nhân viên có giờ làm trên 160h (>=160): nhân viên khá
        // +nếu nhân viên có giờ làm dưới 160h: nhân viên trung bình

        if (this.totalHourWork >= 192) {
            return typeOfEmployee = "Xuất sắc";
        }
        else if (this.totalHourWork >= 176) {
            return typeOfEmployee = "Giỏi";
        }
        else if (this.totalHourWork >= 160) {
            return typeOfEmployee = "Khá";
        }
        else {
            return typeOfEmployee = "Trung bình";
        }
    }

    // tổng lương
    this.totalSalary = function () {
        var totalSalary = 0;
        // +nếu chức vụ là giám đốc: tổng lương = lương cơ bản * 3
        // +nếu chức vụ là trưởng phòng: tổng lương = lương cơ bản * 2
        // +nếu chức vụ là nhân viên: tổng lương = lương cơ bản
        if (this.option === 'GD') {
            return totalSalary = this.basicSalary * 3;
        }
        else if (this.option === 'TP') {
            return totalSalary = this.basicSalary * 2;
        }
        else if (this.option === 'NV') {
            return totalSalary = this.basicSalary;
        }
        else {
            return totalSalary;
        }
    }
}