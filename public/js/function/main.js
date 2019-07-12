
    function openCourse(id) {
        swal({
            title: "Thông báo",
            text: "Bạn có muốn đăng khóa học này không ?",
            showCancelButton: "Hủy",
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Xác nhận",
            closeOnConfirm: false
        },
            function (isConfirm) {
                if (isConfirm) {
                    axios.get(`/mo-khoa-hoc/${id}`)
                        .then((res) => {
                            if (res.data.mess == 1)
                                swal("Thông báo", "Đã gửi yêu cầu lên hệ thống !", "success");
                            else
                                swal("Thông báo", "Gửi yêu cầu thất bại !", "error");
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                }
            })
    }
    function changeCourse(idKH,idQ,idDV){
        var data={
            idKH,
            idQ,
            idDV
        }
        axios.post('/change-course',data)
        .then((res) => {
            console.log(res.data);
            location.reload(true);
        })
        .catch((err) => {
            console.log(err);
        })
    }
    function cancelCourse(id){
        axios.get(`/cancel-course/${id}`)
        .then((res) => {
            console.log(res.data);
            location.reload(true);
        })
        .catch((err) => {
            console.log(err);
        })
    }
    function deleteKH(id){
        axios.delete(`/khoa-hoc/xoa/${id}`)
        .then((res) => {
            location.reload(true);
        })
        .catch((err) => {
            console.log(err);
        })
        
    };






