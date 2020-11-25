const sortData = (data, value) => {
   switch(value) {
      case '人气排序':
         return data.sort((a, b) => b.orderNum - a.orderNum);
         break;
      case '价格最低':
         return data.sort((a, b) => a.price - b.price);
         break;
      case '价格最高':
         return data.sort((a, b) => b.price - a.price);
         break;
      default: 
         return data;
         break;
   }
}

const filterSearchData = (data, value) => {
   if (!value || value === '请输入搜索关键字') return data;
   return data.filter(item => item.name.includes(value))
}

export {
   sortData,
   filterSearchData
}