export default function () {
  return function () {
    const result = [
      {
        'userId': 1,
        'id': 2,
        'title': 'quis ut nam facilis et officia qui',
        'completed': false
      },
      {
        'userId': 1,
        'id': 3,
        'title': 'fugiat veniam minus',
        'completed': false
      },
      {
        'userId': 1,
        'id': 4,
        'title': 'et porro tempora',
        'completed': true
      }
    ]

    return new Promise(resolve => {
      resolve({data: result})
    })
  }
}
