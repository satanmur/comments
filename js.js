textarea.onblur = function () {
   if (textarea.value.length < 5) {
      textarea.classList.add('invalid');
      errComm.innerHTML = 'Комментарий должен содержать от 5 до 1000 символов.'
   }
};

input.onblur = function () {
   if (input.value.length < 1) {
      input.classList.add('invalid');
      errName.innerHTML = 'Поле обязательно для заполнения!'
   }
};

textarea.onkeypress = function () {
   if (this.classList.contains('invalid')) {
      this.classList.remove('invalid');
      errComm.innerHTML = "";
   }
};

input.onkeypress = function () {
   if (this.classList.contains('invalid')) {
      this.classList.remove('invalid');
      errName.innerHTML = "";
   }
};

function getDateTime() {

   let commDate = new Date(date.value).toLocaleDateString();
   let nowDate = new Date().toLocaleDateString();
   let prevDate = new Date(Date.now() - 86400000).toLocaleDateString();

   if (!date.value || commDate == nowDate) {
      return 'Сегодня, ' + new Date().toLocaleTimeString();
   } else if (commDate == prevDate) {
      return 'Вчера, ' + new Date().toLocaleTimeString();
   }
   else {
      return commDate + ', ' + new Date().toLocaleTimeString();
   }
}

function sendComm() {

   if (input.value.length >= 1 && textarea.value.length >= 5) {

      let commentsBlock = document.createElement('div');
      commentsBlock.id = "commentsBlock";
      white.before(commentsBlock);

      let commName = document.createElement('div');
      commName.id = "commName";
      commName.innerHTML = input.value;
      commentsBlock.append(commName);
      input.value = '';

      let commText = document.createElement('div');
      commText.id = "commText";
      commText.innerHTML = textarea.value;
      commentsBlock.append(commText);
      textarea.value = '';

      let commDate = document.createElement('div');
      commDate.id = "commDate";
      commDate.innerHTML = getDateTime();
      commentsBlock.append(commDate);
      date.value = false;

      let commDel = document.createElement('button');
      commDel.id = "commDel";
      commentsBlock.append(commDel);
      commDel.onclick = function () {
         let answer = confirm('Вы хотите удалить комментарий?');
         if (answer) {
            commentsBlock.remove();
         }
      }

      let commLike = document.createElement('button');
      commLike.id = "commLike";
      commentsBlock.append(commLike);
      commLike.onclick = function () {
         let commLike_act = document.createElement('button');
         commLike_act.id = "commLike_act";
         commLike.replaceWith(commLike_act);
         commLike_act.onclick = function () {
            commLike_act.replaceWith(commLike);
         }
      }
   } else {
      if (input.value.length < 1) {
         input.classList.add('invalid');
         errName.innerHTML = 'Поле обязательно для заполнения!'
      }

      if (textarea.value.length < 5) {
         textarea.classList.add('invalid');
         errComm.innerHTML = 'Комментарий должен содержать от 5 до 1000 символов.'
      }
   }
}

function handleKeyPress(e) {
   let key = e.keyCode;
   if (key === 13) { // Клавиша Enter
      white.focus();
      sendComm();
   }
}
