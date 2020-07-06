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

  $('.Chat-main__footer__form').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.Chat-main__messages').append(html);
      $('.Chat-main__messages').animate({ scrollTop: $('.Chat-main__messages')[0].scrollHeight });
      $('.Chat-main__footer__form')[0].reset();
      $('.Chat-main__footer__form__send-btn').prop('disabled', false);
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
      $('.Chat-main__footer__form__send-btn').prop('disabled', false);
    })
  })
});