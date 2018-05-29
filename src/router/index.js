import Vue from 'vue'
import Router from 'vue-router'
import Prescription from '@/components/Prescription'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Prescription',
      component: Prescription
    }
  ]
})
