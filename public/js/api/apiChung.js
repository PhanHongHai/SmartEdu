$(document).ready(function () {
    $('#dkSubmit').on('click', function (e) {

        var email = $('#email').val();
        var hoTen = $('#ten').val();
        var sdt = $('#sdt').val();
        var id = $('#id').val();
        if (email != '' && hoTen != '' && sdt != '') {
            var data = {
                email,
                sdt,
                hoTen,
                idKH: id
            };
            console.log(data);
            axios.post('/don-dang-ky',data)
            .then((res) => {
                if(res.data.mess == 1){
                      swal("Chúc mừng", "Đăng ký thành công !", "success");
                       $('#email').val('');
                       $('#ten').val('');
                       $('#sdt').val('');
                }
                else if(res.data.mess == 0){
        
                      swal("Thông báo", "Đăng ký thất bại !", "error");
                }
            })
            .catch((err,res) => {
                swal("Thông báo", "Đăng ký thất bại !", "error");
                console.log(err);
            })
        }
        else {
            swal("Thông báo", "Xin nhập lại thông tin !", "error");
        }
        e.preventDefault();
        return false;
    });

})