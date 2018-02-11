$(document).ready(function(){
  let category;

  const show_home_screen = function(){
    $(".page-add.vertical-center").show();
  };

  const hide_home_screen = function(){
    $(".page-add.vertical-center").hide();
  };

  const removeScrollBorder = function(){
    $("#watchScrollBar").css("border-color", "white");
    $("#eatScrollBar").css("border-color", "white");
    $("#readScrollBar").css("border-color", "white");
    $("#buyScrollBar").css("border-color", "white");
  };

  const show_category_screen = function(){
    $(".saved-item").show();
    $(".under-nav").show();
    // $(".under-nav").text(category);
  };

  const hide_category_screen = function(){
    $(".saved-item").empty();
    $(".saved-item").hide();
    $(".under-nav").hide();
  };

  //create note element
  const create_note_element = function(data){
    let noteElement = $("<form>").text(data.text).addClass("item");
    //store dataId in the element
    noteElement.data("note_id", data.note_id);
    // console.log("Data: ", noteElement.data('note_id'));
    let icon = $("<i>").addClass("material-icons").text("close");
    let divExternal = $("<div>").addClass("external");
    let anchorTag = $("<a>");
    anchorTag.attr("href", "https://www.themoviedb.org/movie/15-citizen-kane?language=en");
    let imgTag = $("<img>");
    imgTag.attr("src", "http://image.tmdb.org/t/p/w185/sav0jxhqiH0bPr2vZFU0Kjt2nZL.jpg");
    anchorTag.append(imgTag);
    divExternal.append(anchorTag);
    let secondColumn = $("<div>");
    let titleSource = $("<div>").addClass("header");
    let title = $("<h5>").addClass("title").text("Citizen Kane");
    let group = $("<div>").addClass("group");
    let source = $("<p>").addClass("source").text("The Movie DB");
    let rating = $("<p>").addClass("source").text("6.5/10");
    group.append(source, rating);
    titleSource.append(title, group);
    let review = $("<p>").text("Newspaper magnate, Charles Foster Kane is taken from his mother as a boy and made the ward of a rich industrialist. As a result, every well-meaning, tyrannical or self-destructive move he makes for the rest of his life appears in some way to be a reaction to that deeply wounding event.");
    secondColumn.append(titleSource, review);
    divExternal.append(secondColumn);
    noteElement.append(icon);
    noteElement.append(divExternal);
    return noteElement;
  };

  //when the home screen button is pressed in the nav bar, send user to home screen
  $(".nav-item:nth-child(1)").on("click", function(){
    show_home_screen();
    hide_category_screen();
  });

  //when the werb logo is clicked in the nav bar, send user to home screen
  $(".navbar a.navbar-brand").on("click", function(){
    show_home_screen();
    removeScrollBorder();
    hide_category_screen();
  });

  $(".page-add.vertical-center a").on("click", function(){
    hide_home_screen();
  });

  //log user out when the logout button is pressed
  $(".logout-button").on("click", function(){
    $.post("/logout").then(function(){
      //refresh the browser after logout
      location.reload();
    });
  });

  $("#watch").on("click", function(){
    category = "watch";
    $("#watchScrollBar").css("border-color", "#ff5a5f");
    show_category_screen();
    loadNotes(renderNotes, category);
  });

  $("#eat").on("click", function(){
    category = "eat";
    $("#eatScrollBar").css("border-color", "#ff5a5f");
    show_category_screen();
    loadNotes(renderNotes, category);
  });

  $("#read").on("click", function(){
    category = "read";
    $("#readScrollBar").css("border-color", "#ff5a5f");
    show_category_screen();
    loadNotes(renderNotes, category);
  });

  $("#buy").on("click", function(){
    category = "buy";
    $("#buyScrollBar").css("border-color", "#ff5a5f");
    show_category_screen();
    loadNotes(renderNotes, category);
  });

  $("#watchScrollBar").on("click", function(){
    category = "watch";
    removeScrollBorder();
    $("#watchScrollBar").css("border-color", "#ff5a5f");
    loadNotes(renderNotes, category);
  });

  $("#eatScrollBar").on("click", function(){
    category = "eat";
    removeScrollBorder();
    $("#eatScrollBar").css("border-color", "#ff5a5f");
    loadNotes(renderNotes, category);
  });

  $("#readScrollBar").on("click", function(){
    category = "read";
    removeScrollBorder();
    $("#readScrollBar").css("border-color", "#ff5a5f");
    loadNotes(renderNotes, category);
  });

  $("#buyScrollBar").on("click", function(){
    category = "buy";
    removeScrollBorder();
    $("#buyScrollBar").css("border-color", "#ff5a5f");
    loadNotes(renderNotes, category);
  });

  //When a checkmark icon is clicked, get store the note_id of the note that was checked.
  $(".saved-item").on("click", "i", function(event){
    let note_id = $(event.target).parent().data("note_id");
    $.post("/delete", {"note_id": note_id}, function(){
      //refresh the notes
      loadNotes(renderNotes, category);
    });
  });

  const loadNotes = function(callback, category){
    console.log("category: ", category);
    $.get(`/notes/${category}`, function(data){
      callback(data);
    });
  };

  //calling data from server
  const renderNotes = function(data){
    $(".saved-item").empty();
    data.forEach(function(dataElement, index){
      let note = create_note_element(dataElement);
      $(".saved-item").prepend(note);
    });
  };

  //hide category screen;
  hide_category_screen();
  loadNotes(renderNotes);
});

