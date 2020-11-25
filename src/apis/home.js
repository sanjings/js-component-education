import { ajaxGet } from 'utils/ajax';
import { GET_DATAS } from './url'

const getDatas = () => {
   return ajaxGet(GET_DATAS)
}

export {
   getDatas
}

