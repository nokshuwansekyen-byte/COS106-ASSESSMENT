// Contact form checks
(function () {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const name = form.querySelector('#name');
  const email = form.querySelector('#email');
  const phone = form.querySelector('#phone');
  const message = form.querySelector('#message');
  const status = document.getElementById('form-status');

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^\d+$/;

  function error(field, message) {
    const box = field.closest('.field');
    box.classList.toggle('error', Boolean(message));
    box.querySelector('.msg').textContent = message || '';
  }

  function checkForm() {
    let ok = true;

    if (!name.value.trim()) {
      error(name, 'Please enter your name.');
      ok = false;
    } else {
      error(name, '');
    }

    if (!email.value.trim()) {
      error(email, 'Please enter your email address.');
      ok = false;
    } else if (!emailPattern.test(email.value.trim())) {
      error(email, 'Enter a valid email address, e.g. name@example.com.');
      ok = false;
    } else {
      error(email, '');
    }

    if (!phone.value.trim()) {
      error(phone, 'Please enter your phone number.');
      ok = false;
    } else if (!phonePattern.test(phone.value.trim())) {
      error(phone, 'Phone number should contain digits only.');
      ok = false;
    } else {
      error(phone, '');
    }

    if (!message.value.trim()) {
      error(message, 'Please add a short message.');
      ok = false;
    } else {
      error(message, '');
    }

    return ok;
  }

  [name, email, phone, message].forEach(function (field) {
    field.addEventListener('input', function () {
      if (field.closest('.field').classList.contains('error')) {
        checkForm();
      }
    });
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    status.className = 'form-status';
    status.textContent = '';

    if (!checkForm()) {
      status.className = 'form-status bad';
      status.textContent = 'Please fix the highlighted fields before sending.';
      return;
    }

    status.className = 'form-status ok';
    status.textContent = 'Thanks, ' + name.value.trim().split(' ')[0] + '. Your message has been recorded.';
    form.reset();
  });
})();
