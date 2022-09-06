$(document).ready(function() {


    //
    //  Main Page
    //

    // dealing with header burger menu
    $(".header__burger").click(function(event) {
        $(".header__burger, .header__menu").toggleClass("active");
        // while clicking burger menu, cursor will not return to the beginning
        // in CSS you should add -> body {overflow: hidden} in media query
        $('body').toggleClass('lock');
    });


    // specifying icon variables
    var checkIcon = '<i class="fas fa-check"></i>'
    var deleteIcon = '<i class="fas fa-trash"></i>'


    // adding a new task with counting total and completed
    $("input").change(function() {
        var val = $(this).val();
        if (val != '') {
            $(".tasks__list").append('<li>' + val + checkIcon + deleteIcon + '</li>');
            $( ".content__title span").eq(2).replaceWith('<span>' + $(".tasks__list").children().length + '</span>');
            $(".content__title span").css("display", "inline-block");
        }
        $(this).val("");
    });


    // removing a task using the delete icon
    $("ul").on('click', '.fa-trash', function() {
        // $(this).parent('li').fadeOut(400);
        $(this).hide(300, function() {
            $(this).parent('li').remove();
            $( ".content__title span" ).eq(0).replaceWith('<span>' + $(".tasks__list").children('.checked').length + '</span>');
            $( ".content__title span" ).eq(2).replaceWith('<span>' + $(".tasks__list").children().length + '</span>');
            $(".content__title span").css("display", "inline-block");
            if ($(".tasks__list").children().length == 0) {
                $(".content__title span").css("display", "none");
            }
        });
    });

    // complete a task using the check icon
    $("ul").on('click', '.fa-check', function() {
        $(this).parent('li').toggleClass('checked');
        $( ".content__title span" ).eq(0).replaceWith('<span>' + $(".tasks__list").children('.checked').length + '</span>');
        $(".content__title span").css("display", "inline-block");
    });

    

    //
    //             Password Page
    //

    
    // generate password
    $("#button-password").click(function(event) {
        
        var passwordLength = $( "#length option:selected" ).text();
        var capFlag = $( "#caps option:selected" ).text();
        var specFlag = $( "#specs option:selected" ).text();
        var digitFlag = $( "#digits option:selected" ).text();

        const smallLetters ='abcdefghkmnopqstuvwxyz'
        const capitalLetters ='ABCDEFGHKMNOPRSTUVWXYZ'
        const specialCharacters ='!$^&*()'

        var password = '';

        for (var i = 0; i < passwordLength; i++) {

            // random number from 0 to 3 to pick random character
            var picker = Math.floor(Math.random() * 4);

            // depending on picker value, pick either small, capital letter, special character or digit
            if (picker == 1 && capFlag == "True") {
                password += capitalLetters.charAt(Math.floor(Math.random() * capitalLetters.length));
            } else if (picker == 2 && specFlag == "True") {
                password += specialCharacters.charAt(Math.floor(Math.random() * specialCharacters.length));
            } else if (picker == 3 && digitFlag == "True") {
                password += Math.floor(Math.random() * 10);
            } else {
                password += smallLetters.charAt(Math.floor(Math.random() * smallLetters.length));
            }
        }

        // add the new element to show password
        $(".result__list").append('<li>Your password is: <span>' + password +'</span>' + deleteIcon + '</li>');
    });

});