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

  //  <div class="page-add vertical-center">
  //    <div class="container">
  //       <div class="col-15 align-self-center">
//           <form class="input-group mb-3" action="/note" method="POST">
//             <input name="text" type="text" class="form-control" placeholder="werb" aria-label="Recipient's username" aria-describedby="basic-addon2">
//             <div class="input-group-append">
//               <button class="btn btn-outline-secondary" type="submit">Save</button>
//             </div>
//           </form>
  //       </div>
  //       <div class="category-links buttons text-center">
  //         <a class="btn btn-primary" href="#" role="button">Watch</a>
  //         <a class="btn btn-primary" href="#" role="button">Eat</a>
  //         <a class="btn btn-primary" href="#" role="button">Read</a>
  //         <a class="btn btn-primary" href="#" role="button">Buy</a>
  //       </div>
  //    </div> container
  //  </div> page add vertical center
});

