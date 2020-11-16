//users
export function getUserByEmail({email}) {

  return {
    name: 'getUserByEmail',
    text: "select id userid, name, email, phone, password_digest, inn from users where email=$1",
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
export function addNewUser({email, name, phone, password_digest}) {

  return {
    name: 'addNewUser',
    text: "insert into users(email, name, phone, password_digest, updated_at, created_at) values( $1, $2, $3, $4, now(), now()) RETURNING id",
    values: [email, name ? name : email, phone, password_digest],
  }
}

export function setUserRecoveryCode({email}) {

  return {
    name: '',
    text: `update users set inn = floor(random() * 10000000 + 1)::int where email='${email}'  RETURNING inn`,
    values: [],
  }
}

export function changeUserPassword({email, password_digest}) {

  return {
    name: '',
    text: `update users set password_digest = '${password_digest}', inn='' where email='${email}'`,
    values: [],
  }
}

export function userAuth( {keyUser} ) {

  return {
    name: 'userAuth',
    text: 'select id, email, name, phone from users where password_digest=$1',
    values: [keyUser],
  }
}

export function getUserInfo( {connectionid} ) {
  return {
    name: '',
    text: `
    select t2.id id, t2.email, t2.name, t2.phone
        from connections t1
        inner join users t2 on t1.user_id = t2.id and t1.remember_token=$1
        order by t1.id desc, t2.id desc
        limit 1
        `,
    values: [connectionid],
  }
}
