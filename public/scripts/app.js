$(document).ready(function(){
  const show_home_screen = function(){
    $('.page-add.vertical-center').show();
  };

  const hide_home_screen = function(){
    $('.page-add.vertical-center').hide();
  };

  //creat note element
  const create_note_element = function(data){
    let noteElement = $('<form>').text(data.text).addClass('item');
    let icon = $('<i>').addClass('material-icons').text('check_circle');
    noteElement.prepend(icon);
    return noteElement;
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


  const loadNotes = function(callback){
    $.get('/notes/eat', function(data){
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

