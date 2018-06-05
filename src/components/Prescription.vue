<template>
  <div class="pt-2">
    <h3>{{ title }}</h3>
    <p class="msg">{{ date_msg }}</p>
    <medicaments-list :medicaments="prescriptedMedicaments"></medicaments-list>
    <p class="alert alert-light msg">{{ alert_msg }}</p>
    <button @click="findBestPharmacy()"
            type="button"
            class="btn btn-info btn-lg btn-block fixed-bottom">
      <i class="fas fa-map-marker-alt"></i> Encontrar Farmácia
      <span class="msg d-block">{{ button_msg }}</span>
    </button>
  </div>
</template>

<script>
import MedicamentsList from './MedicamentsList'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Prescription',
  components: {
    MedicamentsList
  },
  data () {
    return {
      title: 'Dr. Memed',
      date: '04/05/2018',
      msgs: [
        'Prescrição criada em ',
        'A Prescrição Digital Memed não dispensa a apresentação da sua versão impressa à farmácia. O médico responsável por esta prescrição não possui qualquer tipo de vínculo com os preços e/ou farmácias apresentados.',
        'Serviço oferecido por Memed'
      ]
    }
  },
  computed: {
    date_msg () {
      return this.msgs[0] + this.date
    },
    alert_msg () {
      return this.msgs[1]
    },
    button_msg () {
      return this.msgs[2]
    },
    // map vuex state
    ...mapState(['prescriptedMedicaments'])
  },
  // fetch pharmacies
  mounted: function () {
    console.log('[1] mounted Prescription')
    this.fetchPharmacies()
    console.log('[2] mounted Prescription')
  },
  methods: {
    // history.back()
    backToPrescription: function () {
      this.$router.go(-1)
    },
    // change route
    findBestPharmacy () {
      this.$router.push({ name: 'find-best-pharmacy' })
    },
    // map vuex actions
    ...mapActions(['fetchPharmacies'])
  }
}
</script>

<style scoped></style>
