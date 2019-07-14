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
    function showListBV(data) {
        var html = "";
        $.each(data, function (index, ele) {
            html += "<article class='post clearfix mb-30 pb-30'>";
            html += " <div class='entry-content border-1px p-20 pr-10'>";
            html += " <div class='entry-meta media mt-0 no-bg no-border'>";
            html += "    <div class='entry-date media-left text-center flip bg-theme-colored pt-5 pr-15 pb-5 pl-15'>";
            html += "   <ul>";
            html += ` <li class='font-16 text-white font-weight-600'>${ele.ngayTao}</li>`;
            html += "</ul>";
            html += "  </div>";
            html += " <div class='media-body pl-15'>";
            html += "  <div class='event-content pull-left flip'>";
            html += "<h4 class='entry-title text-white text-uppercase m-0 mt-5'>";
            html += `<a href="/tin-tuc/chi-tiet/${ele._id}">${ele.tieuDe}</a></h4>`;
            html += "</div></div></div>";
            html += `<p class="mt-10 fr-view">${ele.noiDung.slice(30,250)}</p>`;
            html += `<a href='/tin-tuc/chi-tiet/${ele._id}' class='btn btn-info'>Đọc thêm<i class="fas fa-info-circle pl-5"></i></a>`;
            html += "<div class='clearfix'></div>";
            html += "</div> </article>";
        });
        return html;
    };
    $('.blog-posts').pagination({
        totalNumber: function (done) {
            var id = $('#idLV').val();
            $.ajax({
                type: 'GET',
                url: '/bai-viet/linh-vuc/getList/' + id,
                success: function (res) {
                    console.log(res.total);
                    done(res.total);
                }
            });
        },
        dataSource: function (done) {
            var id = $('#idLV').val();
            $.ajax({
                type: 'GET',
                url: '/bai-viet/linh-vuc/getList/' + id,
                success: function (res) {
                    done(res.list);
                }
            });
        },
        pageSize: 5,
        showNavigator: false,
        autoHidePrevious: true,
        autoHideNext: true,
        className: 'pagination theme-colored xs-pull-center m-0',
        classPrefix: 'email-list',
        ajax: {
            beforeSend: function () {

            }
        },
        callback: function (data, pagination) {
            // template method of yourself
            var html = showListBV(data);
            $('.listBV').html(html);
        }
    });

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