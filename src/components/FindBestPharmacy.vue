<template>
  <div>
    <div class="pt-1 sticky-top text-left bg-light">
      <div class="d-inline-block align-top">
        <button @click="backToPrescription()"
                class="btn btn-light">
          <i class="fas fa-arrow-left"></i>
        </button>
      </div>
      <div class="d-inline-block">
        <span class="d-block font-weight-bold">{{ title }}</span>
        <span class="msg d-block">{{ buttonMsg }}</span>
      </div>
    </div>
    <best-pharmacy :pharmacy="bestPharmacy"></best-pharmacy>
    <medicaments-list :medicaments="prescriptedMedicaments"></medicaments-list>
    <p class="alert alert-light msg">{{ alertMsg }}</p>
  </div>
</template>

<script>
import MedicamentsList from './MedicamentsList'
import BestPharmacy from './BestPharmacy'
import { mapState } from 'vuex'

export default {
  name: 'FindBestPharmacy',
  components: {
    MedicamentsList,
    BestPharmacy
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
  computed: {
    alertMsg: function () {
      return this.msgs[1]
    },
    buttonMsg: function () {
      return this.msgs[2]
    },
    ...mapState(['bestPharmacy', 'prescriptedMedicaments'])
  },
  // get pharmacies
  created: function () {
    // this.getPharmacies()
    console.log('created')
  },
  methods: {
    // history.back()
    backToPrescription: function () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped></style>
