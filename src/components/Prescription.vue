<template>
  <div>
    <h1>{{ doctor }}</h1>
    <p class="msg">{{ date_msg }}</p>
    <medicaments-list :medicaments="medicaments"></medicaments-list>
    <p class="alert alert-light">{{ alert_msg }}</p>
    <button type="button" class="btn btn-info btn-lg btn-block fixed-bottom">
      <i class="fas fa-map-marker-alt"></i> Encontrar Farmácia
      <span class="msg">Serviço oferecido por Memed</span>
    </button>
  </div>
</template>

<script>
import MedicamentsList from './MedicamentsList'

export default {
  name: 'Prescription',
  components: {
    MedicamentsList
  },
  data () {
    return {
      doctor: 'Dr. Memed',
      date: '04/05/2018',
      msgs: [
        'Prescrição criada em ',
        'A Prescrição Digital Memed não dispensa a apresentação da sua versão impressa à farmácia. O médico responsável por esta prescrição não possui qualquer tipo de vínculo com os preços e/ou farmácias apresentados.'
      ],
      medicaments: [
        {
          qty: 1,
          unit: 'unidade',
          name: 'Ácido zoledrônico 4mg',
          icon: './static/medicine-bottle-01.png'
        },
        {
          qty: 1,
          unit: 'unidade',
          name: 'Água para injeção 1mL',
          icon: './static/medicine-bottle-01.png'
        },
        {
          qty: 1,
          unit: 'unidade',
          name: 'Bromazepam 3mg',
          icon: './static/medicine-bottle-01.png'
        }
      ]
    }
  },
  computed: {
    date_msg () {
      return this.msgs[0] + this.date
    },
    alert_msg () {
      return this.msgs[1]
    }
  }
}
</script>

<style scoped></style>
