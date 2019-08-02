let userList = [
  {
    id: 1,
    name: 'Allen Belem',
    age: 20,
    gender: 0,
    tel: 13000000000,
    email: 'allen@brown.com',
    remark: 'Allen Brown'
  },
  {
    id: 2,
    name: 'Berry Jerry',
    age: 21,
    gender: 0,
    tel: 13111111111,
    email: 'berry@jerry.com',
    remark: 'Berry Jerry'
  },
  {
    id: 3,
    name: 'Anna Ella',
    age: 22,
    gender: 1,
    tel: 13222222222,
    email: 'anna@ella.com',
    remark: 'Anna Ella'
  }
]
let ID = userList.length + 1

export function getUserList () {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(userList)
    }, 300)
  })
}

export function searchUsers (userName) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(userList.filter(({ name }) => name.indexOf(userName) > -1))
    }, 300)
  })
}

export function addUser (user) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      user.id = ID++
      userList.push(user)
      resolve({
        code: 1,
        message: '添加成功'
      })
    }, 100)
  })
}

export function deleteUser (ids) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      userList = userList.filter(({ id }) => ids.every(i => id !== i))
      resolve({
        code: 1,
        message: '删除成功'
      })
    }, 100)
  })
}


export function updateUser (id, data) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      userList.forEach(function (user, index) {
        if (user.id === id) userList[index] = data
      })
      resolve({
        code: 1,
        message: '修改成功'
      })
    }, 100)
  })
}
