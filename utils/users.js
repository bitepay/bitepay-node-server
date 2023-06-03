const users = []; // this will serve as our state;

/* 
user = {
  id: socket.id,
  username: data.username,
  table: data.tableID,
  items: data.myItems ([ {name: , price: , qty: } ]),
  tip: data.tip,
  status: data.status
}
*/

function getCurrentUser(id, tableID) {
  return users.find((user) => user.id === id && user.tableID === tableID);
}


function createUser(id, username, tableID, myItems, tip, total, status) {

  const user = { id, username, tableID, myItems, tip, total, status };
  users.push(user);

  return user;
}


/* Create a function that will update user's items */
function userUpdate(user, payload) {
  const {id, tableID, tip, status} = user;
  const member = getCurrentUser(id, tableID);
  member.myItems = [...member.myItems, payload];
  member.total+= payload.itemPrice * payload.itemQuantity;
  member.tip = tip;
  member.status = status;
  return member;
}

/* Create a function that will update user's status */
function userUpdateStatus(user) {
  const {id, tableID, tip, status} = user;
  const member = getCurrentUser(id, tableID);
  member.status = status;
  member.tip = tip;
  return member;
}

/* Create a function that will delete user's items */
function userDeleteItem(user, payload) {
  const {id, tableID, tip, status} = user;
  const member = getCurrentUser(id, tableID);
  const updatedItems = member.myItems.filter((item) => item.itemID != payload.itemID);
  member.myItems = updatedItems;
  member.total-= payload.itemPrice * payload.itemQuantity;
  member.tip = tip;
  member.status = status;
  return member;
}




/* Remove user from memory and return that user. Make sure you are altering the global array that is acting as memory to store our users. */
function userLeft(userId) {
  const index = users.findIndex((user) => user.id === userId);

  if (index !== -1) return users.splice(index, 1)[0]; // return user object
}

/* Get room users and return an array of users located in the room argument */
function getTableMembers(tableID) {
  return users.filter((user) => user.tableID === tableID);
}

module.exports = {
  createUser,
  getCurrentUser,
  userUpdate,
  userUpdateStatus,
  userDeleteItem,
  userLeft,
  getTableMembers,
};