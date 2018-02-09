$(document).ready(function(){
  const show_home_screen = function(){
    alert("why?");
    $('.page-add.vertical-center').show();
  };

  const hide_home_screen = function(){
    $('.page-add.vertical-center').hide();
  };

  $('.page-add.vertical-center a').on('click', function(){
    hide_home_screen();
  });

  $('.nav-item:nth-child(1)').on('click', function(){
    show_home_screen();
  });

  $('.navbar a.navbar-brand').on('click', function(){
    show_home_screen();
  });

});

