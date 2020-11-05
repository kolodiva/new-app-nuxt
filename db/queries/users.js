//users
export function getUserByEmail({email}) {

  return {
    name: 'getUserByEmail',
    text: "select id userid, password_digest from users where email=$1",
    values: [email],
  }
}

// export function getUsers(params) {
//   return {
//     name: 'fetch-user',
//     text: 'SELECT * FROM users WHERE id = $1',
//     values: params,
//   }
// }
//
// export function addNewUser({email, name, phone, password_digest}) {
//
//   return {
//     name: 'addNewUser',
//     text: "insert into users(email, name, phone, password_digest, updated_at, created_at) values( $1, $2, $3, $4, now(), now())",
//     values: [email, name ? name : email, phone, password_digest],
//   }
// }
// export function userAuth({keyUser}) {
//
//   return {
//     name: 'userAuth',
//     text: 'select id, email, name, phone from users where password_digest=$1',
//     values: [keyUser],
//   }
// }
