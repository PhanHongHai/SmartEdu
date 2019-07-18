$(document).ready(function () {
    $('#listKH').DataTable({
        "language": {
            "lengthMenu": "Hiện _MENU_ trên tổng trang",
            "zeroRecords": "Không tìm thấy",
            "info": "Trang_PAGE_ trong _PAGES_",
            "infoEmpty": "Không có dữ liệu",
            "infoFiltered": "(Lọc từ _MAX_ tổng dữ liệu)",
            "search": "Tìm kiếm :",
            "paginate": {
                "first": "Đầu",
                "last": "Cuối",
                "next": ">",
                "previous": "<"
            },
        }

    });
  
});