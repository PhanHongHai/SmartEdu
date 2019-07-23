$(document).ready(function (e) {
    var option = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    };
    $('#AddTinTuc').on('submit', function (e) {
        e.preventDefault();

        let fd = new FormData();
        let tieuDe = $('#tieuDe').val();
        let noiDung = $('#noiDung').val();
        let idLV = $('#idLV').val();
        let banner = $('#banner').prop('files')[0];
        for (let i = 0; i < banner.length; i++) {
            fd.append('banner', banner[i]);
        }
        fd.append('tieuDe', tieuDe);
        fd.append('noiDung', noiDung);
        fd.append('idLV', idLV);
        axios.post('/admin/tin-tuc', fd, option)
            .then((res) => {
                if (res.data.mess == 1) {
                    swal({
                        title: "Thêm thành công?",
                        icon: "success",
                        button: {
                            text: "Ok",
                            value: true,
                        }
                    })
                        .then(val => {
                            if (val) {
                                window.location.reload();
                            }
                        });
                }
                else
                    swal("Thông báo", "Thêm mới thất bại !", "error");
            })
            .catch((err) => {
                if (err)
                    swal("Thông báo", "Thêm mới thất bại !", "error");
            })



    });
    $('#updateTTt').on('submit', function (e) {

        let fd = new FormData();
        let tieuDe = $('#tieuDeCN').val();
        let noiDung = $('#noiDungCN').val();
        let idLV = $('#idLVCN').val();
        let banner = $('#bannerCN').prop('files')[0];
        if (banner != null) {
            for (let i = 0; i < banner.length; i++) {
                fd.append('banner', banner[i]);
            }
        }
        fd.append('tieuDe', tieuDe);
        fd.append('noiDung', noiDung);
        fd.append('idLV', idLV);
        axios.put(`/admin/tin-tuc/${idLV}`, fd, option)
            .then((res) => {
                if (res.data.mess == 1) {
                    swal({
                        title: "Cập nhật thành công?",
                        icon: "success",
                        button: {
                            text: "Ok",
                            value: true,
                        }
                    })
                        .then(val => {
                            if (val) {
                                window.location.reload();
                            }
                        });
                }
                else
                    swal("Thông báo", "Cập nhật thất bại !", "error");
            })
            .catch((err) => {
                if (err)
                    swal("Thông báo", "Cập nhật thất bại !", "error");
            });
        e.preventDefault();
        return false;
    });
    $('#deleteTT').on('click', function () {
        let id = $('#idTT').val();
        axios.delete(`/admin/tin-tuc/${id}`)
            .then((res) => {
                if (res.data.mess == 1) {
                    swal({
                        title: "Xóa thành công?",
                        icon: "success",
                        button: {
                            text: "Ok",
                            value: true,
                        }
                    })
                        .then(val => {
                            if (val) {
                                window.location.reload();
                            }
                        });
                }
                else {
                    swal("Thông báo", "Xóa thất bại !", "error");
                }
            })
            .catch(err => {
                if (err) {
                    swal("Thông báo", "Xóa thất bại !", "error");
                }
            })
    })
});