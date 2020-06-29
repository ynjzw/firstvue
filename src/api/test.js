import Util from '../libs/util'

const service=Util.ajax;

export function getInfo(data) {
  const params=data
  return service({
    url:'/court/case/getJurorList.jhtml',
    method:'get',
    params
  });
}
