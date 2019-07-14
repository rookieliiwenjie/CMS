import Home from '@/module/home/page/home.vue';
import page_list from '@/module/cms/page/page_list.vue';
import page_add from '@/module/cms/page/page_add.vue';

export default [{
  path: '/',
  component: Home,
  name: 'CMS',
  hidden: false,
  children: [{
    path: '/cms/page/list',
    name: '页面列表',
    hidden: false,
    component: page_list

  }
    , {
      path: '/cms/page/add',
      component: page_add,
      name: '新加页面',
      hidden: true,


    }


  ]

  // ,
  // redirect: '/home',
  // children: [
  //   {path: 'home', component: Home}
  // ]
}


  /*,
  {
    path: '/login',
    component: Login,
    name: 'Login',
    hidden: true
  }*/
]
