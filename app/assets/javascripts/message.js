$(function(){
  $('.new_message').on('submit', function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action')
    
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      let html = buildHTML(message);
      $('.messages').animate({scrollTop: 
      $('.messages')[0].scrollHeight}, 'fast');
      $('form')[0].reset();
    })
    .fail(function(){
      alert('メッセージ送信に失敗しました');
    });
    return false;
  })
})

function buildHTML(message){
  image = ( message.image ) ? `<img class= "lower-message__image" src=${message.image} >` : "";
    let html = `<div class=message>
                    <div class="upper-message">
                      <div class="upper-message__user-name">
                      ${message.user_name}　
                      </div>
                      <div class="upper-message__date">
                      ${message.date}
                      </div>
                    </div>
                    <div class="lower-message">
                      <p class="lower-message__content">
                      ${message.content}
                      </p>
                      ${image}
                    </div>
                  </div> `
  $('.messages').append(html); 
}