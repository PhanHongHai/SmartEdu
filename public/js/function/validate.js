$(document).ready(function () {
    $('#formDK').validate({
        rules: {
            ten: {
                required: true,
                minlength: 5,
                maxlength: 30
            },
            email: {
                required: true,
                email: true
            },
            sdt: {
                required: true,
                digits: true,
                minlength: 10,
                maxlength: 10,
            },
        },
        messages: {
            ten: {
                required: 'Vui lòng nhập họ tên',
                minlength: 'Nhập tối thiểu 5 ký tự',
                maxlength: 'Nhập tối đa 30 ký tự'
            },
            email: {
                required: 'Vui lòng nhập email',
                email: 'Email không hợp lệ'
            },
            sdt: {
                required: 'Vui lòng nhập số điện thoại',
                digits: 'Vui lòng nhập ký tự là số',
                minlength: 'Nhập tối thiểu 10 số',
                maxlength: 'Nhập tối đa 10 số'
            },
        }
    });
    $('#formBL').validate({
        rules: {
            ten: {
                required: true,
                minlength: 5,
                maxlength: 30
            },
            email: {
                required: true,
                email: true
            },
            noiDung: {
                required: true,
                minlength: 3,
            }
        },
        messages: {
            ten: {
                required: 'Vui lòng nhập tên',
                minlength: 'Nhập tối thiểu 5 ký tự',
                maxlength: 'Nhập tối đa 30 ký tự'
            },
            email: {
                required: 'Vui lòng nhập email',
                email: 'Email không hợp lệ'
            },
            noiDung: {
                required: 'Vui lòng nhập nội dung',
                minlength: 'Nhập tối thiểu 3 ký tự',
            },
        },
    });
    // loai danh muc
    $('#addCateType').validate({
        errorClass: "invalid",
        rules: {
            nameType: {
                required: true,
                minlength: 5,
                maxlength: 50
            }
        },
        messages: {
            nameType: {
                required: 'Vui lòng nhập thông tin',
                minlength: 'Nhập tối thiểu 5 ký tự',
                maxlength: 'Nhập tối đa 50 ký tự'
            }
        },
    });
    $('#editCateType').validate({
        errorClass: "invalid",
        rules: {
            name: {
                required: true,
                minlength: 5,
                maxlength: 50
            }
        },
        messages: {
            name: {
                required: 'Vui lòng nhập thông tin',
                minlength: 'Nhập tối thiểu 5 ký tự',
                maxlength: 'Nhập tối đa 50 ký tự'
            }
        },
    });
    // danh muc
    $('#addCate').validate({
        errorClass: "invalid",
        rules: {
            nameCate: {
                required: true,
                minlength: 5,
                maxlength: 50
            },
            typeCate: "required"
        },
        messages: {
            nameCate: {
                required: 'Vui lòng nhập thông tin',
                minlength: 'Nhập tối thiểu 5 ký tự',
                maxlength: 'Nhập tối đa 50 ký tự'
            },
            typeCate: { required: "Vui lòng chọn loại danh mục" }
        },
    });
    $('#editCate').validate({
        errorClass: "invalid",
        rules: {
            nameCate: {
                required: true,
                minlength: 5,
                maxlength: 50
            },
            typeCate: "required"
        },
        messages: {
            nameCate: {
                required: 'Vui lòng nhập thông tin',
                minlength: 'Nhập tối thiểu 5 ký tự',
                maxlength: 'Nhập tối đa 50 ký tự'
            },
            typeCate: { required: "Vui lòng chọn loại danh mục" }
        },
    });
    // co quan ban hanh
    $('#addAgen').validate({
        errorClass: "invalid",
        rules: {
            nameAg: {
                required: true,
                minlength: 5,
                maxlength: 50
            },
        },
        messages: {
            nameAg: {
                required: 'Vui lòng nhập thông tin',
                minlength: 'Nhập tối thiểu 5 ký tự',
                maxlength: 'Nhập tối đa 50 ký tự'
            },
        },
    });
    // linh vuc
    $('#addField').validate({
        errorClass: "invalid",
        rules: {
            nameField: {
                required: true,
                minlength: 5,
                maxlength: 40
            },
        },
        messages: {
            nameField: {
                required: 'Vui lòng nhập thông tin',
                minlength: 'Nhập tối thiểu 5 ký tự',
                maxlength: 'Nhập tối đa 40 ký tự'
            },
        },
    });
    // thu tuc hanh chinh
    $('#addTTHC').validate({
        errorClass: "invalid",
        rules: {
            titleAP: {
                required: true,
                minlength: 5,
                maxlength: 200
            }
        },
        messages: {
            titleAP: {
                required: 'Vui lòng nhập thông tin',
                minlength: 'Nhập tối thiểu 5 ký tự',
                maxlength: 'Nhập tối đa 200 ký tự'
            },
        },
    });
    // comment
    $('.formComment').validate({
        errorClass: "invalid",
        rules: {
            userName: {
                required: true,
                minlength: 5,
                maxlength: 50
            },
            email: {
                required: true,
                email: true
            },
            content: {
                required: true,
                maxlength: 300
            }
        },
        messages: {
            userName: {
                required: 'Vui lòng nhập tên',
                minlength: 'Nhập tối thiểu 5 ký tự',
                maxlength: 'Nhập tối đa 50 ký tự'
            },
            email: {
                required: 'Vui lòng nhập email',
                email: 'Email không xác định'
            },
            content: {
                required: 'Vui lòng nhập nội dung',
                maxlength: 'Nhập tối đa 300 ký tự'
            }
        }
    });
    // comment
    $('#lienHe').validate({
        rules: {
            hoTen: {
                required: true,
                minlength: 5,
                maxlength: 30
            },
            email: {
                required: true,
                email: true
            },
            content: {
                required: true,
                maxlength: 300
            },
            phone: {
                digits: true,
                minlength: 10,
                maxlength: 11,
            },
            title: {
                required: true,
                minlength: 5,
                maxlength: 100
            }
        },
        messages: {
            hoTen: {
                required: 'Vui lòng nhập tên',
                minlength: 'Nhập tối thiểu 5 ký tự',
                maxlength: 'Nhập tối đa 50 ký tự'
            },
            email: {
                required: 'Vui lòng nhập email',
                email: 'Email không xác định'
            },
            content: {
                required: 'Vui lòng nhập nội dung',
                maxlength: 'Nhập tối đa 300 ký tự'
            },
            phone: {
                minlength: 'Nhập tối thiểu 10 ký tự',
                digits: 'Ký tự phải là số',
                maxlength: 'Nhập tối đa 11 ký tự',
            },
            title: {
                required: 'Vui lòng nhập tiêu đề',
                maxlength: 'Nhập tối đa 300 ký tự',
                minlength: 'Nhập tối thiểu 5 ký tự'
            }
        }
    });
})
