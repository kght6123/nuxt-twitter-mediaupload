// import querystring from 'querystring'

export function getPostJson(req) {
  return new Promise((resolve, reject) => {
    if (req.method === 'POST') {
      let body = ''
      req.on('data', chunk => {
        body += chunk.toString()
      })
      req.on('end', () => {
        // console.log('body', body)
        // const parsed = querystring.parse(body)
        // const objectKeys = Object.keys(parsed)
        // if (objectKeys.length > 0) {
        //   const json = JSON.parse(objectKeys[0])
        //   resolve(json)
        // } else {
        //   reject(new Error('JSON parse error. (No Object Key)'))
        // }
        const json = JSON.parse(body)
        resolve(json)
      })
    } else {
      reject(new Error('JSON parse error. (No POST Method)'))
    }
  })
}

export default this