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
            axios.post('/don-dang-ky', data)
                .then((res) => {
                    if (res.data.mess == 1) {
                        swal("Chúc mừng", "Đăng ký thành công !", "success");
                        $('#email').val('');
                        $('#ten').val('');
                        $('#sdt').val('');
                    }
                    else if (res.data.mess == 0) {

                        swal("Thông báo", "Đăng ký thất bại !", "error");
                    }
                })
                .catch((err, res) => {
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
    // phan trang
   
    $('#binhLuan').on('click', function (e) {
        var email = $('#email').val();
        var ten = $('#ten').val();
        var noiDung = $('#noiDung').val();
        var id = $('#id').val();
        if (email != '' && ten != '' && noiDung != '') {
            var data = {
                email,
                noiDung,
                ten,
                idBV: id
            };
            axios.post('/bai-viet/binh-luan', data)
                .then((res) => {
                    var html = '';
                    if (res.data.mess == 1) {
                        html += " <li><div class='media comment - author'>";
                        html += " <a class='media-left pull-left flip' href='#'><img class='img-thumbnail' src='/public/images/profile.jpg' alt=''></a> ";
                        html += "<div class='media-body'>";
                        html += `<h5 class="media-heading comment-heading">${ten}:</h5>`;
                        html += `<div class="comment-date">${res.data.thoiGian}</div>`;
                        html += `<p>${noiDung}</p>`;
                        html += "</div></div></li>";
                        swal("Thông báo", "Bình luận thành công !", "success");
                        $('.comment-list').append(html);
                        $('#email').val('');
                        $('#ten').val('');
                        $('#noiDung').val('');
                    }
                    else if (res.data.mess == 0) {
                        swal("Thông báo", "Bình luận thất bại !", "error");
                    }
                })
                .catch((err, res) => {
                    swal("Thông báo", "Bình luận thất bại !", "error");
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