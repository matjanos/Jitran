let rivets = require("rivets");

var user = {
  name: 'Bob Smith',
  photo: 'https://upload.wikimedia.org/wikipedia/commons/5/50/Patrick_Barrabe.jpg',
  favColour: 'blue'
};

var element =document.getElementById('user-profile');
console.log (element);

rivets.bind(
  element,
  { user: user }
);