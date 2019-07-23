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
    var addTT = new FroalaEditor('#noiDungAddTT', {
        language: 'vi',
        heightMin: 100,
        heightMax: 500,
        imageUploadURL: 'upload',
        imageUploadMethod: 'POST',
        imageUploadParams: {
            id: 'my_editor'
        }
    });
    var updateTT = new FroalaEditor('#noiDungCN', {
        language: 'vi',
        heightMin: 100,
        heightMax: 500,
        imageUploadURL: 'upload',
        imageUploadMethod: 'POST',
        imageUploadParams: {
            id: 'my_editor'
        }
    });
    $('#lienHe').on('submit',function(e){
        e.preventDefault();
         
        let hoTen=$('#hoTen').val();
        let email=$('#email').val();
        let title=$('#title').val();
        let phone=$('#phone').val();
        let content=$('#content').val();
        let data={hoTen,email,title,phone,content};
        axios.post('/lien-he',data)
        .then((res) => {
            if(res.data.mess == 1){
                swal("Chúc mừng", "Đã gửi thành công !", "success");
                $('#hoTen').val('');
                $('#email').val('');
                $('#title').val('');
                $('#phone').val('');
                $('#content').val('');
            }
            else{
                swal("Thông báo", "Gửi thất bại !", "error");
            }
        })
        .catch((err) => {
            if(err){
                console.log(err);
                swal("Thông báo", "Xin nhập lại thông tin !", "error");
            } 
         
        })
    });

})