import axios from 'axios'

let util={};
util.title=function (title){
  title=title || 'test';
  window.document.title=title;
};
util.ajax=axios.create({
  baseURL:'/api',
  timeout:180000
});

export default util;

