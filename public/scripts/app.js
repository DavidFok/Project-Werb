$(document).ready(function(){
  let category;

  const show_home_screen = function(){
    $(".page-add.vertical-center").fadeIn(500);
    $(".form-control").focus().select();
  };

  const hide_home_screen = function(){
    $(".page-add.vertical-center").fadeOut(300);
  };

  const removeScrollBorder = function(){
    $("#watchScrollBar").css("border-color", "white");
    $("#eatScrollBar").css("border-color", "white");
    $("#readScrollBar").css("border-color", "white");
    $("#buyScrollBar").css("border-color", "white");
  };

  const show_category_screen = function(){
    $(".saved-item").fadeIn(300);
    $(".under-nav").fadeIn(300);
    // $(".under-nav").text(category);
  };

  const hide_category_screen = function(){
    $(".saved-item").empty();
    $(".saved-item").hide();
    $(".under-nav").hide();
  };

  //gets email of user from server
  const user_email_indicate = function(){
    $.get('/email', function(data){
      //change email icon to indicate the user's email
      $('a.nav-link.user').text(data);
    });
  };

  //create note element
  const create_note_element = function(data){
    let parsedData = JSON.parse(data.processed_metadata);
    // console.log("photo is: ", data.processed_metadata);
    let noteElement = $("<form>").text(data.text).addClass("item");
    //store dataId in the element
    noteElement.data("note_id", data.note_id);
    // console.log("Data: ", noteElement.data('note_id'));
    let icon = $("<i>").addClass("material-icons delete").text("close");
    let editModal = $("<a>").addClass("button").attr("href", "#popup1");
    let editIcon = $("<i>").addClass("material-icons edit").text("mode_edit").attr("id", "editBtn");
    editModal.append(editIcon);
    let divExternal = $("<div>").addClass("external");
    let anchorTag = $("<a>");
    let imgTag = $("<img>");
    imgTag.attr("src", `http://image.tmdb.org/t/p/w185/${parsedData.poster_path}`);
    anchorTag.append(imgTag);
    divExternal.append(anchorTag);
    let secondColumn = $("<div>");
    let titleSource = $("<div>").addClass("header");
    let title = $("<h5>").addClass("title").text(parsedData.title);
    let group = $("<div>").addClass("group");
    let source = $("<p>").addClass("source").text("The Movie DB");
    let rating = $("<p>").addClass("source").text(`${parsedData.vote_average} /10`);
    group.append(source, rating);
    titleSource.append(title, group);
    let review = $("<p>").text(parsedData.overview);
    secondColumn.append(titleSource, review);
    divExternal.append(secondColumn);
    noteElement.append(icon, editModal);
    noteElement.append(divExternal);
    return noteElement;
  };

  const create_note_eat = function(data){
    let parsedData = JSON.parse(data.processed_metadata);
    let noteElement = $("<form>").text(data.text).addClass("item");
    //store dataId in the element
    noteElement.data("note_id", data.note_id);
    // console.log("Data: ", noteElement.data('note_id'));
    let icon = $("<i>").addClass("material-icons delete").text("close");
    let editIcon = $("<i>").addClass("material-icons edit").text("mode_edit");
    let divExternal = $("<div>").addClass("external");
    let anchorTag = $("<a>");
    let imgTag = $("<img>");
    imgTag.attr("src", parsedData.image_url);
    anchorTag.append(imgTag);
    divExternal.append(anchorTag);
    let secondColumn = $("<div>");
    let titleSource = $("<div>").addClass("header");
    let title = $("<h5>").addClass("title").text(parsedData.name);
    let group = $("<div>").addClass("group");
    let source = $("<p>").addClass("source").text("Yelp");
    let rating = $("<p>").addClass("source").text(`${parsedData.rating} /5`);
    group.append(source, rating);
    titleSource.append(title, group);
    // let review = $("<p>").text(parsedData.location.display_address[0]).html("<br/>").text(parsedData.location.display_address[1]);
    let review = $("<p>").text(parsedData.location.display_address[0]).css({'margin-top': '2px', 'margin-bottom': '2px'});
    let review2 = $("<p>").text(parsedData.location.display_address[1]).css({'margin-top': '2px', 'margin-bottom': '2px'});
    let review3 = $("<p>").text(parsedData.location.display_address[2]).css({'margin-top': '2px', 'margin-bottom': '2px'});
    secondColumn.css({"width": "100%"});
    secondColumn.append(titleSource, review, review2, review3);
    divExternal.append(secondColumn);
    noteElement.append(icon, editIcon);
    noteElement.append(divExternal);
    return noteElement;
  };
    //create note element
  const create_note_read = function(data){
    let noteElement = $("<form>").text(data.text).addClass("item");
    //store dataId in the element
    noteElement.data("note_id", data.note_id);
    // console.log("Data: ", noteElement.data('note_id'));
    let icon = $("<i>").addClass("material-icons delete").text("close");
    let editModal = $("<a>").addClass("button").attr("href", "#popup1");
    let editIcon = $("<i>").addClass("material-icons edit").text("mode_edit").attr("id", "editBtn");
    editModal.append(editIcon);
    let divExternal = $("<div>").addClass("external");
    let anchorTag = $("<a>");
    let imgTag = $("<img>");
    imgTag.attr("src", "https://images-na.ssl-images-amazon.com/images/I/51AEI3isFiL.jpg");
    anchorTag.append(imgTag);
    divExternal.append(anchorTag);
    let secondColumn = $("<div>");
    let titleSource = $("<div>").addClass("header");
    let title = $("<h5>").addClass("title").text("FIRE AND FURY");
    let group = $("<div>").addClass("group");
    let source = $("<p>").addClass("source").text("Amazon");
    let rating = $("<p>").addClass("source").text("4/5");
    group.append(source, rating);
    titleSource.append(title, group);
    let review = $("<p>").text("With extraordinary access to the West Wing, Michael Wolff reveals what happened behind-the-scenes in the first nine months of the most controversial presidency of our time in Fire and Fury: Inside the Trump White House.");
    secondColumn.append(titleSource, review);
    divExternal.append(secondColumn);
    noteElement.append(icon, editModal);
    noteElement.append(divExternal);
    return noteElement;
  };

    //create note element
  const create_note_buy = function(data){
    let noteElement = $("<form>").text(data.text).addClass("item");
    //store dataId in the element
    noteElement.data("note_id", data.note_id);
    // console.log("Data: ", noteElement.data('note_id'));
    let icon = $("<i>").addClass("material-icons delete").text("close");
    let editModal = $("<a>").addClass("button").attr("href", "#popup1");
    let editIcon = $("<i>").addClass("material-icons edit").text("mode_edit").attr("id", "editBtn");
    editModal.append(editIcon);
    let divExternal = $("<div>").addClass("external");
    let anchorTag = $("<a>");
    let imgTag = $("<img>");
    imgTag.attr("src", "https://images-na.ssl-images-amazon.com/images/I/81Gbb9J14xL._SL1500_.jpg");
    anchorTag.append(imgTag);
    divExternal.append(anchorTag);
    let secondColumn = $("<div>");
    let titleSource = $("<div>").addClass("header");
    let title = $("<h5>").addClass("title").text("Donald Trump Doll");
    let group = $("<div>").addClass("group");
    let source = $("<p>").addClass("source").text("amazon.com");
    let rating = $("<p>").addClass("source").text("2.0/5");
    group.append(source, rating);
    titleSource.append(title, group);
    let review = $("<p>").text(`Donald Trump "Bobbling Middle Finger" Doll is available for a limited time only. Get yours today, while you still can! Proudly display this bobblehead inspired figurine on your desk and help "Make America Great Again." The deplorables have spoken, it's time to put America First again! Show that you are on board the Trump train celebrating the victory of Donald Trump 45th president and Mike Pence vice-president.`);
    secondColumn.append(titleSource, review);
    divExternal.append(secondColumn);
    noteElement.append(icon, editModal);
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

  //When a X icon is clicked, get store the note_id of the note that was checked.
  $(".saved-item").on("click", ".material-icons.delete", function(event){
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
      const subtype = dataElement.subtype;
      let note;
      switch(category) {
        case 'watch':
          console.log("subtype is: ", subtype);
          console.log("create is: ", create_note_element);
          note = create_note_element(dataElement);
          break;

        case 'eat':
          console.log("subtype is: ", subtype);
          note = create_note_eat(dataElement);
          break;

        case 'read':
          note = create_note_read(dataElement);
          break;

        case 'buy':
          note = create_note_buy(dataElement);
          break;
      }
      $(".saved-item").prepend(note);
    });
  };

  //hide category screen;
  user_email_indicate();
  hide_category_screen();
  loadNotes(renderNotes);
});

