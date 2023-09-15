function DSNV() {
    this.Employees = [];
    // phương thức thêm Nhân viên
    this._addEmployee = function (Employee) {
        this.Employees.push(Employee);
    };


    // phương thức tìm vị trí
    this._findIndexEmployee = function (taiKhoan) {
        var index = -1;
        for (let i = 0; i < this.Employees.length; i++) {
            var Employee = this.Employees[i];

            if (Employee.taiKhoan === taiKhoan) {

                index = i;
                break;
            }
        }
        return index;
    }



    // lấy thông tin Nhân viên
    this._inforEmployee = function (taikhoan) {
        var index = this._findIndexEmployee(taikhoan);
        // xử lý lấy thông tin sinh viên
        if (index !== -1) {
            var Employee = this.Employees[index];
            // console.log('Employee: ', Employee);

        }
        return Employee;
    }

    // phương thức xóa Nhân viên
    this._deleteEmployee = function (taikhoan) {
        var index = this._findIndexEmployee(taikhoan);
        // console.log(index);
        if (index !== -1) {
            // xử lý xóa Nhân viên thứ i
            this.Employees.splice(index, 1);
        }
    }

    // phương thức cập nhật Nhân viên
    this._updateEmployee = function (Employee) {
        var index = this._findIndexEmployee(Employee.taiKhoan);
        if (index !== -1) {
            this.Employees[index] = Employee;
            // console.log(sv.tenSV);

        }

    };
}