<template>
  <div>
    <div class="pt-1 sticky-top text-left bg-light">
      <div class="d-inline-block align-top">
        <button @click="backToPrescription()" class="btn btn-light">
          <i class="fas fa-arrow-left"></i>
        </button>
      </div>
      <div class="d-inline-block">
        <span class="d-block font-weight-bold">{{ title }}</span>
        <span class="msg d-block">{{ buttonMsg }}</span>
      </div>
    </div>
    <best-pharmacy></best-pharmacy>
    <div class="text-left">
      <button @click="goToTopTen()" class="btn btn-link btn-sm">
        <i class="fas fa-clipboard-list"></i>
        Ver as 10 melhores farmácias...
      </button>
    </div>
    <medicaments-list :medicaments="prescriptedMedicaments" :showPrice="showPrice"></medicaments-list>
    <p class="alert alert-light msg">{{ alertMsg }}</p>
  </div>
</template>

<script>
import BestPharmacy from './BestPharmacy'
import MedicamentsList from './MedicamentsList'
import { mapState } from 'vuex'

export default {
  name: 'FindBestPharmacy',
  components: {
    BestPharmacy,
    MedicamentsList
  },
  data: function () {
    return {
      title: 'Encontrar Farmácia',
      msgs: [
        '',
        'A Prescrição Digital Memed não dispensa a apresentação da sua versão impressa à farmácia. O médico responsável por esta prescrição não possui qualquer tipo de vínculo com os preços e/ou farmácias apresentados.',
        'Serviço oferecido por Memed'
      ]
    }
  },
  mounted: function () {
    console.log('[1] mounted FindBestPharmacy')
    if (this.bestPharmacy === undefined) {
      this.$router.push({ name: 'prescription' })
    }
  },
  computed: {
    alertMsg: function () {
      return this.msgs[1]
    },
    buttonMsg: function () {
      return this.msgs[2]
    },
    showPrice: function () {
      return true
    },
    // map vuex state
    ...mapState(['prescriptedMedicaments', 'bestPharmacy', 'pharmacies'])
  },
  methods: {
    // history.back()
    backToPrescription: function () {
      this.$router.push({ name: 'prescription' })
    },
    // go to top ten best pharmacies
    goToTopTen: function () {
      this.$router.push({ name: 'top-ten-pharmacies' })
    }
  }
}
</script>

<style scoped></style>
