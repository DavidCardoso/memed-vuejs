import Vue from 'vue'
import Router from 'vue-router'
import Prescription from '@/components/Prescription'
import BestPharmacy from '@/components/BestPharmacy'

Vue.use(Router)

export default new Router({
  routes: [
    {// default route / home page
      path: '/',
      name: 'home',
      component: Prescription
    },
    {// route to some prescription
      path: '/prescription',
      name: 'prescription',
      component: Prescription
    },
    {// route to the best pharmacy according to the prescription
      path: '/best-pharmacy',
      name: 'best-pharmacy',
      component: BestPharmacy
    }
  ]
})
