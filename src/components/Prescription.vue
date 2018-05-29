<template>
  <div>
    <h1>{{ doctor }}</h1>
    <p class="msg">{{ date_msg }}</p>
    <medicaments-list :medicaments="medicaments"></medicaments-list>
    <p class="alert alert-light">{{ alert_msg }}</p>
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
      msg: [
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
      return this.msg[0] + this.date
    },
    alert_msg () {
      return this.msg[1]
    }
  }
}
</script>

<style scoped></style>
