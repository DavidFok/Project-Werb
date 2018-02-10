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

  //create note element
  const create_note_element = function(data){
    let noteElement = $('<form>').text(data.text).addClass('item');
    //store dataId in the element
    noteElement.data("note_id", data.note_id);
    // console.log("Data: ", noteElement.data('note_id'));
    let icon = $('<i>').addClass('material-icons').text('check_circle');
    noteElement.prepend(icon);
    return noteElement;
  };

  //when the home screen button is pressed in the nav bar, send user to home screen
  $('.nav-item:nth-child(1)').on('click', function(){
    show_home_screen();
    hide_category_screen();
  });

  //when the werb logo is clicked in the nav bar, send user to home screen
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

  //When a checkmark icon is clicked, get store the note_id of the note that was checked.
  $('.saved-item').on('click', 'i', function(event){
    let note_id = $(event.target).parent().data('note_id');
    $.post("/delete", {"note_id": note_id}, function(){
      //refresh the notes
      loadNotes(renderNotes);
    });
  });

  const loadNotes = function(callback, category){
    $.get(`/notes/${category}`, function(data){
      callback(data);
    });
  };

  //calling data from server
  const renderNotes = function(data){
    $('.saved-item').empty();
    data.forEach(function(dataElement, index){
      let note = create_note_element(dataElement);
      $('.saved-item').prepend(note);
    });
  };

  //hide category screen;
  hide_category_screen();
  loadNotes(renderNotes);
});

