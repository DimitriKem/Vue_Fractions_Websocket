import Vue from 'vue';
import VueRouter from 'vue-router';
import Calculator from '../components/calculator/Calculator';
import Comments from '../components/Comments';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Calculator',
    component: Calculator
  },
  {
    path: '/Calculator',
    name: 'Calculator',
    component: Calculator
  },
  {
    path: '/Comments',
    name: 'Comments',
    component: Comments
  }
];


export default new VueRouter({
  mode: 'history',
  routes
});