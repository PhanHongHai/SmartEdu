function postGopY() {
    let name = $('.contentTinChung .name').val();
    let email = $('.contentTinChung .email').val();
    let diaChi = $('.contentTinChung .adress').val();
    let sdt = $('.contentTinChung .phone').val();
    let title = $('.contentTinChung .title').val();
    let content = $('.contentTinChung .content').val();
    let data = {
        name: name,
        email: email,
        address: diaChi,
        phone: sdt,
        title: title,
        content: content
    };
    let config = {
        header: {
            'content-type': 'multipart/form-data'
        }
    }
    axios.post('/gop-y', data,config)
        .then((res) => {
            $('.contentTinChung .name').val('');
            $('.contentTinChung .email').val('');
            $('.contentTinChung .adress').val('');
            $('.contentTinChung .phone').val('');
            $('.contentTinChung .title').val('');
            $('.contentTinChung .content').val('');
            $('body').animate({
                scrollTop: 0
            }, 500);
            $.toast({
                heading: 'Chúc mừng!',
                text: "<strong>Chúc Mừng !</strong><span style='font-size:18px;'>" + res.data.mess + "</span>",
                position: 'mid-center',
                loaderBg: '#5ba035',
                icon: 'success',
                hideAfter: 5000,
                stack: 1
            });

        })
        .catch((err) => {
            if (err) {
                $.toast({
                    heading: 'Thông báo !',
                    text: res.data.mess,
                    position: 'top-right',
                    loaderBg: '#5ba035',
                    icon: 'error',
                    hideAfter: 5000,
                    stack: 1
                });
            }
        })
}