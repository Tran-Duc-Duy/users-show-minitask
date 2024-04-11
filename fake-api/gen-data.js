const { faker } = require('@faker-js/faker');
const fs = require('fs');

faker.locate = 'ru'

/**
 * {
    id: '{{objectId()}}',
    name: '{{firstName()}} {{surname()}}', 
    department:  '{{random("department1", "department2", "department3")}}',
    company: '{{company().toUpperCase()}}',
    jobTitle: '{{lorem(1, "words")}}'
  }
 */

const randomUserList = (n) => {
  if (n <= 0) { return []; }
  const userList = [];

  Array.from(new Array(n)).forEach(() => {
    const user = {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      department: faker.commerce.department(),
      company: faker.company.name(),
      jobTitle: faker.company.buzzPhrase(),
    };
    userList.push(user);
  })
  return userList
}
const userList = randomUserList(100);// change to 1000000 if you want
(() => {
  const db = {
    users: userList,
  };

  fs.writeFile('./db.json', JSON.stringify(db), () => {
    console.log("oke")
  })
})()