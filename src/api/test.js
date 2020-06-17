import Util from '../libs/util'

const service=Util.ajax;

export function getInfo(data) {
  return service({
    url:'./test.txt',
    method:'get',
    data
  })
}
