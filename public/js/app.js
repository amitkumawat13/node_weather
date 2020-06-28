const say = console.log;

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const msg1 = document.querySelector('#msg-1');
const msg2 = document.querySelector('#msg-2');


weatherForm.addEventListener('submit',(e) => {
    e.preventDefault()
    msg1.textContent ='loading...'
    msg2.textContent =''
    let location = search.value;
    
    fetch(`/weather?address=${location}`).then((data) => {
    data.json().then((detail) => {
      if(detail.error) {
        msg1.textContent =''
         msg2.textContent = detail.error;
      } else {
          msg1.textContent = detail.info;
      }
  });
});
})