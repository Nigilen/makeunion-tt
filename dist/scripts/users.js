const loadPosts = fetch('https://jsonplaceholder.org/users')
  .then((response) => response.json())
  .then((data) => {
    return data;
  });


const tpl = document.getElementById('user-card').content;
const ul = document.querySelector('.users-list');

loadPosts.then((data) => {
  data.forEach((i) => {
    const element = tpl.cloneNode(true);

    const userName = element.querySelector('.user-name');
    const userEmail = element.querySelector('.user-email');
    const btn = element.querySelector('.user-button');

    userName.textContent = i.firstname.concat(' ', i.lastname);
    userEmail.textContent = i.email;
    btn.href = '/user-details.html?id=' + i.id;

    ul.appendChild(element);
  });
});