import Vue from 'vue'
import Router from 'vue-router'
import Prescription from '@/components/Prescription'
import FindBestPharmacy from '@/components/FindBestPharmacy'
import TopTenPharmacies from '@/components/TopTenPharmacies'

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
    {// route to the best pharmacy according to the prescription (distance, price, duration)
      path: '/find-best-pharmacy',
      name: 'find-best-pharmacy',
      component: FindBestPharmacy
    },
    {// route to the top ten best pharmacies (distance, price, duration)
      path: '/top-ten-pharmacies',
      name: 'top-ten-pharmacies',
      component: TopTenPharmacies
    }
  ]
})
