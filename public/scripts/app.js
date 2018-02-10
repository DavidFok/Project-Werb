$(document).ready(function(){
  let category;

  const show_home_screen = function(){
    $('.page-add.vertical-center').show();
  };

  const hide_home_screen = function(){
    $('.page-add.vertical-center').hide();
  };

  const show_category_screen = function(){
    $('.saved-item').show();
    $('.under-nav').show();
    $('.under-nav').text(category.toUpperCase());
  };

  const hide_category_screen = function(){
    $('.saved-item').empty();
    $('.saved-item').hide();
    $('.under-nav').hide();
  };
  //hide category screen;
  hide_category_screen();

  //creat note element
  const create_note_element = function(data){
    let noteElement = $('<form>').text(data.text).addClass('item');
    let icon = $('<i>').addClass('material-icons').text('check_circle');
    noteElement.prepend(icon);
    return noteElement;
  };

  $('.nav-item:nth-child(1)').on('click', function(){
    show_home_screen();
    hide_category_screen();
  });

  $('.navbar a.navbar-brand').on('click', function(){
    show_home_screen();
    hide_category_screen();
  });

  $('.page-add.vertical-center a').on('click', function(){
    hide_home_screen();
  });

  $('#watch').on('click', function(){
    category = "watch";
    show_category_screen();
    loadNotes(renderNotes, category);
  });

  $('#eat').on('click', function(){
    category = "eat";
    show_category_screen();
    loadNotes(renderNotes, category);
  });

  $('#read').on('click', function(){
    category = "read";
    show_category_screen();
    loadNotes(renderNotes, category);
  });

  $('#buy').on('click', function(){
    category = "buy";
    show_category_screen();
    loadNotes(renderNotes, category);
  });


  const loadNotes = function(callback, category){
    $.get(`/notes/${category}`, function(data){
      console.log("data: ", data);
      callback(data);
    });
  };

  //calling data from server
  const renderNotes = function(data){
    $('.saved-item').empty();
    data.forEach(function(noteData, index){
      let note = create_note_element(noteData);
      $('.saved-item').prepend(note);
    });
  };

  loadNotes(renderNotes);

  //   const renderTweets = function(data){
  //   $('.tweets-container').empty();
  //   data.forEach(function(user, index){
  //     let tweet = createTweetElement(user);
  //     $('.tweets-container').prepend(tweet);
  //   });
  // };

  // //calls tweet data from server
  // const loadTweets = function(callback){
  //   $.get('/tweets', function(data){
  //     callback(data);
  //   });
  // };

});

