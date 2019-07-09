// tai khoan
function updateAcc(id) {
    let username = $('.show .username').val();
    let pass = $('.show .pass').val();
    let role = $('.show .role').val();
    let data = {
        username: username,
        password: pass,
        role: role
    }
    axios.patch("/admin/tai-khoan/" + id, data)
        .then((res) => {
            // location.reload(true);
        })
        .catch((err) => {
            // location.reload(true);
        })
}
function deleteAcc(id) {

    axios.delete("/admin/tai-khoan/" + id)
        .then((res) => {
            location.reload(true);
        })
        .catch((err) => {
            location.reload(true);
        })
}
// -----------
// loai danh muc 
function addCateType(data) {

}
function updateCateType(id) {
    let name = $('.show .nameType').val();
    let link = $('.show .link').val();
    let data = {
        nameType: name,
        link: link
    };
    axios.patch("/admin/tin-tuc/loai-danh-muc/" + id, data)
        .then((res) => {
            location.reload(true);
        })
        .catch((err) => {
        })
}
function deleteCateType(id) {
    let confirmText = "Bạn có muốn xóa không ?";
    if (confirm(confirmText)) {
        axios.delete("/admin/tin-tuc/loai-danh-muc/" + id)
            .then((res) => {
                location.reload(true);
            })
            .catch((err) => {
            })
    }
}
// -------------------------

// danh muc
function updateCate(id) {
    let name = $('.show .nameCate').val();
    let link = $('.show .link').val();
    let type = $('.show .nameType').val();
    axios.patch("/admin/tin-tuc/danh-muc/" + id, { nameCate: name, typeCate: type,link:link })
        .then((res) => {
            location.reload(true);
        })
        .catch((err) => {
            if (err) throw err;
        })
}
function deleteCate(id) {
    let confirmText = "Bạn có muốn xóa không ?";
    if (confirm(confirmText)) {
        axios.delete("/admin/tin-tuc/danh-muc/" + id)
            .then((res) => {
                location.reload(true);
            })
            .catch((err) => {
            })
    }

}
// ------------------------
// linh vuc
function updateLV(id) {
    let name = $('.show .nameField').val();
    axios.patch("/admin/linh-vuc/" + id, { nameField: name })
        .then((res) => {
            location.reload(true);
        })
        .catch((err) => {
            if (err) throw err;
        })
}
function deleteLV(id) {
    let confirmText = "Bạn có muốn xóa không ?";
    if (confirm(confirmText)) {
        axios.delete("/admin/linh-vuc/" + id)
            .then((res) => {
                location.reload(true);
            })
            .catch((err) => {
            })
    }

}
//-----------------
// co quan ban hanh
function updateAg(id) {
    let name = $('.show .nameAg').val();
    axios.patch("/admin/co-quan-ban-hanh/" + id, { nameAg: name })
        .then((res) => {
            location.reload(true);
        })
        .catch((err) => {
            if (err) throw err;
        })
}
function deleteAg(id) {
    axios.delete("/admin/co-quan-ban-hanh/" + id)
        .then((res) => {
            location.reload(true);
        })
        .catch((err) => {
            if (err) throw err;
        })
}
//----------------------
// gop y
function deleteGY(id) {
    axios.delete("/admin/gop-y/" + id)
        .then((res) => {
            window.location.href = "/admin/gop-y";
        })
        .catch((err) => {
            if (err) throw err;
        })
}
function updateCheck(id) {
    axios.patch("/admin/gop-y/" + id)
        .then((res) => {
            $('#countGY').text(res.data.count);
        })
        .catch((err) => {
            if (err) throw err;
        })
}

//------------------------
/// bai viet 
function deleteNews(id) {
    axios.delete("/admin/tin-tuc/bai-viet/" + id)
        .then((res) => {
            window.location.href = "/admin/tin-tuc/bai-viet";
        })
        .catch((err) => {
            if (err) throw err;
        })
}

// THU TUC HANH CHINH
function deleteTTHC(id){
    axios.delete("/admin/thu-tuc-hanh-chinh/"+id)
    .then((res) => {
        window.location.href = "/admin/thu-tuc-hanh-chinh"; 
    })
    .catch((err) => {
        if(err) throw err;
    })
}
//******************* */