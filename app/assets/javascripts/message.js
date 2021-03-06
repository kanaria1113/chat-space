$(function(){
  $('.new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this); 
    var url = $(this).attr('action');
    $.ajax({ 
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildHTML(message);
      $('.message').append(html); 
      $('form')[0].reset();
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast'); 
    })
    .fail(function(){
      alert('メッセージが入力されておりません');
    })
    return false;
  })

  function buildHTML(message){
    let image = ( message.image ) ? `<img class= "lower-message__image" src=${message.image} >` : "";
    let html = `<div class="message", data-message-id="${message.id}">
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                   ${message.user_name}
                   </div>
                   <div class="upper-message__date">
                   ${message.created_at}
                   </div>
                  </div>
                  <div class="lower-message">
                    <p class="lower-message__content">
                    ${message.content}
                    </p>
                    ${image}
                  </div>
                </div>`
  $('.messages').append(html); 
  }
  
  let reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      let last_message_id = $('.message:last').data("message-id");
      $.ajax({
        url: "api/messages",
        type: 'GET',
        dataType: 'json',
        data: {last_id: last_message_id}
      })
      .done(function(messages) {
        let insertHTML = '';
        messages.forEach(function (message) {
          insertHTML = buildHTML(message);
          $('.messages').append(insertHTML);
          $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
        })
      })
      .fail(function() {
        console.log('error');
      });
    };
  };
setInterval(reloadMessages, 3000);
});
