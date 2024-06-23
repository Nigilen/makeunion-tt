const someField = document.querySelector('.user-name');
const id = new URLSearchParams(window.location.search).get('id');

const pageTitle = document.querySelector('.page-title');
const userNameDetails = document.querySelector(
  '.user-info-list--name .info-item-desc'
);
const userBirthDay = document.querySelector(
  '.user-info-list--bd .info-item-desc'
);
const userAddress = document.querySelector(
  '.user-info-list--address .info-item-desc'
);
const userEmail = document.querySelector(
  '.user-info-list--email .info-item-desc .info-item-link'
);
const userPhone = document.querySelector(
  '.user-info-list--phone .info-item-desc .info-item-link'
);
const userCompany = document.querySelector(
  '.user-info-list--company .info-item-desc'
);

loadPosts
  .then((data) => data.filter((i) => i.id === Number(id)))
  .then((data) => {
    pageTitle.textContent = 'Пользователь ' + data[0].firstname;
    userNameDetails.textContent = data[0].firstname.concat(
      ' ',
      data[0].lastname
    );
    userBirthDay.textContent = data[0].birthDate;
    userAddress.textContent = data[0].address.city.concat(
      ' ',
      data[0].address.street
    );
    userEmail.textContent = data[0].email;
    userEmail.setAttribute('href', data[0].email);
    userPhone.textContent = data[0].phone;
    userPhone.setAttribute('href', data[0].phone);
    userCompany.textContent = data[0].company.name;
  });