import $ from 'jquery';
import { BASE_URL } from '@/config/index'

const ajax = (options) => {
   if (!options.url) throw new Error('url必须传入')
   $.ajax({
      url: BASE_URL + options.url,
      type: options.type || 'GET',
      data: options.data || '',
      async: options.async || true,
      dataType: 'json',
      success: options.success,
      error: options.error || (() => {})
   })
}

export const ajaxGet = (url, data) => {
   return new Promise((resolve, reject) => {
      ajax({
         url,
         data,
         success: (resp) => {
            resolve(resp.data);
         },
         error: (error) => {
            reject(error)
         }
      })
   })
}

export const ajaxPost = (url, data) => {
   return new Promise((resolve, reject) => {
      ajax({
         url,
         type: 'POST',
         data,
         success: (resp) => {
            resolve(resp.data);
         },
         error: (error) => {
            reject(error)
         }
      })
   })
}