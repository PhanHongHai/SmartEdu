$(function () {
    // menu responsive
    $('.menu-box').slideUp();
    $('.menu .tab-menu .head-box .fa-bars').click(function (event) {
        $('.menu-box').slideToggle(500);
    });
    // menu  fix
    $(window).scroll(function (event) {
        var vitri = $("html").scrollTop();
        if (vitri > 113) {
            $('.menu').addClass('menuZoom animated fadeInDown');
           // $('.sideBar-menu').addClass('sideBar-active');
        }
        else if (vitri < 100) {
            $('.menu').removeClass('menuZoom animated fadeInDown');
          //  $('.sideBar-menu').removeClass('sideBar-active');
        }
        /*
        if (vitri > 236) {
            $('.sideBar-menu').addClass('sideBar-active');
        }
        else if (vitri < 236) {
           $('.sideBar-menu').removeClass('sideBar-active');
        }
        if (vitri > 2849) {
            $('.sideBar-menu').removeClass('sideBar-active');
            $('.sideBar-menu').addClass('sideBar-active-1');
        }
        else if ( vitri >236 && vitri < 2849 ) {
            $('.sideBar-menu').removeClass('sideBar-active-1');
            $('.sideBar-menu').addClass('sideBar-active');
        }
        */
    });

    // small menu
    $('.small-head-box i').click(function () {
        $('.menu .small-menu-box').removeClass('hideMenu');
        $('.menu .small-menu-box').addClass('openMenu');
        $('.menu').addClass('disableAni');
    });
    $('.small-menu-box i').click(function () {
        $('.menu .small-menu-box').removeClass('openMenu');
        $('.menu .small-menu-box').addClass('hideMenu');
        $('.menu').removeClass('disableAni');
    });
    /// smooth scroll
    SmoothScroll({
        keyboardSupport: true,
        animationTime: 500, // [ms]
        stepSize: 100,
    });
    // tab news
    $('.nameTab button').click(function () {
        let giaTriTab = $(this).index();
        $('.nameTab .btn').removeClass('activeTab');
        $('.newTab .imageNewTab .classifyNews').removeClass('activeClassify');
        $(this).addClass('activeTab');
        $('.contentTab .tab').removeClass('activeContentNew');
        let vlaue = ".contentTab .tab:nth-child(" + (giaTriTab + 1) + ")";
        let vlaue1 = ".newTab .imageNewTab .classifyNews:nth-child(" + (giaTriTab + 1) + ")";
        $(vlaue).addClass('activeContentNew');
        $(vlaue1).addClass('activeClassify');
    });

    $('.contentTab .activeContentNew ul li').hover(function () {
        let giaTriListItem = $(this).index();
        $('.imageNewTab .newImage').removeClass('activeImageNew');
        $(".imageNewTab .newImage:nth-child(" + (giaTriListItem + 1) + ")").addClass('activeImageNew');

    });
    $('.hoatDong .headCate .subCate ul li').click(function () {
        let valueSubCate = $(this).index();
        $('.hoatDong .contentCate .cateClassify').removeClass('activeCate animated fadeInUp');
        let result = ".hoatDong .contentCate .cateClassify:nth-child(" + (valueSubCate + 1) + ")";
        $(result).addClass('activeCate animated fadeInUp');
        $(".hoatDong .headCate .subCate ul li").removeClass('activeSubCate');
        $(this).addClass('activeSubCate');
    });
    $('.vanHoaXaHoi .headCate .subCate ul li').click(function () {
        let valueSubCate = $(this).index();
        $('.vanHoaXaHoi .contentCate .cateClassify').removeClass('activeCate animated fadeInUp');
        let result = ".vanHoaXaHoi .contentCate .cateClassify:nth-child(" + (valueSubCate + 1) + ")";
        $(result).addClass('activeCate animated fadeInUp');
        $(".vanHoaXaHoi .headCate .subCate ul li").removeClass('activeSubCate');
        $(this).addClass('activeSubCate');
    });
    $('.anNinh .headCate .subCate ul li').click(function () {
        let valueSubCate = $(this).index();
        $('.anNinh .contentCate .cateClassify').removeClass('activeCate animated fadeInUp');
        let result = ".anNinh .contentCate .cateClassify:nth-child(" + (valueSubCate + 1) + ")";
        $(result).addClass('activeCate animated fadeInUp');
        $(".anNinh .headCate .subCate ul li").removeClass('activeSubCate');
        $(this).addClass('activeSubCate');
    });
    $('.coSo .tabCoSo ul li').click(function () {
        let valueCS = $(this).index();
        $('.coSo .contentCs .allContentCoSo').removeClass('activeContentCS animated fadeInUp');
        let result = ".coSo .contentCs .allContentCoSo:nth-child(" + (valueCS + 1) + ")";
        $(result).addClass('activeContentCS animated fadeInUp');
        $(".coSo .tabCoSo ul li").removeClass('activeTabCS');
        $(this).addClass('activeTabCS');
    });
    // ===== Scroll to Top ==== 
    $(window).scroll(function () {
        if ($(this).scrollTop() >= 200) {        // If page is scrolled more than 50px
            $('#return-to-top').fadeIn(200);    // Fade in the arrow
        } else {
            $('#return-to-top').fadeOut(200);   // Else fade out the arrow
        }
    });
    $('#return-to-top').click(function () {      // When arrow is clicked
        $('body,html').animate({
            scrollTop: 0                       // Scroll to top of body
        }, 500);
    });

});