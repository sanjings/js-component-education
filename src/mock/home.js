import Mock from 'mockjs';
import { BASE_URL } from '@/config/index'

const imgList = [
   'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3890960684,1210322488&fm=26&gp=0.jpg',
   'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4127793240,3303219247&fm=26&gp=0.jpg',
   'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=727286048,4166830577&fm=26&gp=0.jpg',
   'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1373560791,4228178890&fm=26&gp=0.jpg',
   'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1434252412,15152386&fm=26&gp=0.jpg',
   'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4000386096,2288866861&fm=26&gp=0.jpg',
   'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3684712122,727326575&fm=26&gp=0.jpg'
]

Mock.setup({
   timeout: '50-300'
})

Mock.mock(`${BASE_URL}/api/get_datas`, {
   code: 200,
   data: {
      fieldData: [
         {
            type: 'HOT',
            name: '热门'
         },
         
         {
            type: 'HTML',
            name: 'Html'
         },
         {
            type: 'CSS',
            name: 'Css'
         },
         {
            type: 'JAVASCRIPT',
            name: 'JavaScript'
         },
         {
            type: 'VUE',
            name: 'Vue'
         },
         {
            type: 'REACT',
            name: 'React'
         },
         
         {
            type: 'ANGULAR',
            name: 'Angular'
         },
         {
            type: 'WEBPACK',
            name: 'Webpack'
         },
         {
            type: 'NODE',
            name: 'Nodejs'
         }
      ],
      hotSearchData: [
         'javascript',
         'Web前端',
         'nodejs',
         'vue实战',
         'react全家桶'
      ],
      'swiperData|3': [
         {
            'url|1': imgList
         }
      ],
      'courseData|30': [
         {
            'imgSrc|1': imgList,
            'type|1': [
               'JAVASCRIPT',
               'HTML',
               'CSS',
               'REACT',
               'VUE',
               'ANGULAR',
               'NODE',
               'WEBPACK',
               'TYPESCRIPT'
            ],
            'hot|1': [
               true,
               false
            ],
            'orderNum|0-1000': 1,
            'price|500-2200': 600,
            'name|1': [
               'Web前端开发-从入门到精通',
               'Web前端开发-JavaScript进阶',
               'Web前端开发-实战项目(教你从零开始开发企业级项目)',
               'IT课堂项目实战'
            ]
         }
      ]
   }
})