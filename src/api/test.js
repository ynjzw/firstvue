import Util from '../libs/util'

const service=Util.ajax;

export function getInfo(data) {
  return service({
    url:'/court/case/test1.jhtml',
    method:'get',
    data
  });
}
