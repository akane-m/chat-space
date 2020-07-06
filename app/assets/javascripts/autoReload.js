$(function(){
  function buildHTML(message){
    if (message.image) {
      let html =
      `<div class="Chat-main__messages__message" data-message-id=${message.id}>
        <div class="Chat-main__messages__message__title">
          <div class="Chat-main__messages__message__title__name">
            ${message.user_name}
          </div>
          <div class="Chat-main__messages__message__title__date">
            ${message.created_at}
          </div>
        </div>
        <div class="Chat-main__messages__message__content-box">
          <p class="Chat-main__messages__message__content-box__content">
            ${message.content}
          </p>
        <img class="Chat-main__messages__message__content-box__image" src="${message.image}">
        </div>
      </div>`
      return html;
    } else {
      let html =
      `<div class="Chat-main__messages__message" data-message-id=${message.id}>
        <div class="Chat-main__messages__message__title">
          <div class="Chat-main__messages__message__title__name">
            ${message.user_name}
          </div>
          <div class="Chat-main__messages__message__title__date">
            ${message.created_at}
          </div>
        </div>
        <div class="Chat-main__messages__message__content-box">
          <p class="Chat-main__messages__message__content-box__content">
            ${message.content}
          </p>
        </div>
      </div>`
      return html;
    };
  }

  let reloadMessages = function() {
    let last_message_id = $('.Chat-main__messages__message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'GET',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        let insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.Chat-main__messages').append(insertHTML);
        $('.Chat-main__messages').animate({ scrollTop: $('.Chat-main__messages')[0].scrollHeight });
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  setInterval(reloadMessages, 7000);
});