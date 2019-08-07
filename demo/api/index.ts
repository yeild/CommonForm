let userList = [
  {
    id: 1,
    name: '小明',
    age: 20,
    tel: 13000000000,
    email: 'xiaoming@example.com',
    province: 0,
    city: 0,
    gender: 0,
    interest: [0, 1, 2, 3],
    createDate: '2019/1/1'
  },
  {
    id: 2,
    name: '李雷',
    age: 21,
    tel: 13111111111,
    email: 'lilei@example.com',
    province: 1,
    city: 1,
    gender: 0,
    interest: [0, 1, 2, 3],
    createDate: '2019/1/1'
  },
  {
    id: 3,
    name: '韩梅梅',
    age: 22,
    tel: 13222222222,
    email: 'hanmeimei@example.com',
    province: 2,
    city: 1,
    gender: 1,
    interest: [0, 1, 2, 3],
    createDate: '2019/1/1'
  }
]
let ID = userList.length + 1

export function getUserList () {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve([...userList])
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
      user.createDate = new Date().toLocaleDateString()
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
        if (user.id === id) userList[index] = {
          ...userList[index],
          ...data
        }
      })
      resolve({
        code: 1,
        message: '修改成功'
      })
    }, 100)
  })
}
