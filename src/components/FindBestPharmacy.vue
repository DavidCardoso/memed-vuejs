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
    <best-pharmacy :pharmacy="getBestPharmacy()"></best-pharmacy>
    <medicaments-list :medicaments="medicaments"></medicaments-list>
    <p class="alert alert-light msg">{{ alertMsg }}</p>
  </div>
</template>

<script>
import MedicamentsList from './MedicamentsList'
import BestPharmacy from './BestPharmacy'
import axios from 'axios'
import gapi from 'google-distance-api'

const pharmaciesEndpoint = 'https://wydfdauvw5.execute-api.sa-east-1.amazonaws.com/desafio/farmacias'

export default {
  name: 'FindBestPharmacy',
  components: {
    MedicamentsList,
    BestPharmacy
  },
  data () {
    return {
      title: 'Encontrar Farmácia',
      msgs: [
        '',
        'A Prescrição Digital Memed não dispensa a apresentação da sua versão impressa à farmácia. O médico responsável por esta prescrição não possui qualquer tipo de vínculo com os preços e/ou farmácias apresentados.',
        'Serviço oferecido por Memed'
      ],
      medicaments: [
        {
          qty: 1,
          unit: 'unidade',
          name: 'Ácido zoledrônico 4mg',
          icon: './static/medicine-bottle-01.png',
          price: 9.99
        },
        {
          qty: 1,
          unit: 'unidade',
          name: 'Água para injeção 1mL',
          icon: './static/medicine-bottle-01.png',
          price: 9.99
        },
        {
          qty: 1,
          unit: 'unidade',
          name: 'Bromazepam 3mg',
          icon: './static/medicine-bottle-01.png',
          price: 9.99
        }
      ],
      pharmacies: []
    }
  },
  computed: {
    alertMsg () {
      return this.msgs[1]
    },
    buttonMsg () {
      return this.msgs[2]
    },
    // matrix API destinations
    destinations () {
      const destinations = []
      this.pharmacies.forEach(function (item, index) {
        destinations.push(item.attributes.lat + ',' + item.attributes.lon)
      })
      return destinations
    }
  },
  // get pharmacies
  mounted () {
    this.getPharmacies()
  },
  methods: {
    // history.back()
    backToPrescription () {
      this.$router.go(-1)
    },
    // get user device | memed geolocation
    getUserLocation () {
      return ['-23.5648304,-46.6436604']
    },
    // get pharmacies basic data
    getPharmacies () {
      axios.get(pharmaciesEndpoint)
      // axios.get(process.env.PHARMACIES_ENDPOINT)
        .then(response => {
          this.pharmacies = response.data.data
          this.getPharmaciesMedicaments()
          this.getPharmaciesMatrix()
        })
        .catch(error => {
          console.log(`Error trying to fetch pharmacies: ${error}`)
        })
    },
    // get pharmacies medicaments data (name, price)
    getPharmaciesMedicaments () {
      this.pharmacies.forEach((pharmacy) => {
        // request all medicaments of each pharmacy
        axios.get(`${pharmaciesEndpoint}/${pharmacy.id}`)
          .then(response => {
            // keep only the prescripted medicaments
            pharmacy.medicamentos = response.data.data.attributes.medicamentos.filter(
              med => this.medicaments.find(x => x.name === med.nome)
            )
            // calculate the total price based on the matched medicaments
            pharmacy.totalPrice = pharmacy.medicamentos.reduce(
              (total, med) => total + med.preco, 0
            )
          })
          .catch(error => {
            console.log(`Error trying to fetch pharmacies (id ${pharmacy.id}): ${error}`)
          })
      })
    },
    // get pharmacies matrix data (distance, duration)
    getPharmaciesMatrix () {
      // prepare request options
      const options = {
        key: process.env.GAPI_KEY,
        mode: 'driving',
        origins: this.getUserLocation(),
        destinations: this.destinations
      }
      // request all distance/duration from origins to destinations
      gapi.distance(options, (error, response) => {
        if (error) {
          return console.log(error)
        }
        // as known that matrix api returns at the same order of the destinations
        // it is possible to iterate each pharmacies and set its matrix data
        response.forEach((item, index) => {
          this.pharmacies[index].matrix = item
        })
      })
    },
    // find the best pharmacy based on distance and total price of the prescripted medicaments
    getBestPharmacy () {
      return {
        type: 'farmacias',
        id: 1,
        attributes: {
          nome: 'Farmais',
          lat: -23.5640019,
          lon: -46.6489309
        },
        links: {
          self: 'https://wydfdauvw5.execute-api.sa-east-1.amazonaws.com/desafio/farmacias/1'
        },
        medicamentos: [
          {
            nome: 'Ácido zoledrônico 4mg',
            preco: 10.86
          },
          {
            nome: 'Água para injeção 1mL',
            preco: 30.06
          },
          {
            nome: 'Betaserc 16mg',
            preco: 8.46
          },
          {
            nome: 'Bromazepam 3mg',
            preco: 0.46
          }
        ],
        distance: {
          text: '1,1 km',
          value: 1148
        },
        duration: {
          text: '5 minutos',
          value: 313
        },
        total_price: 99.99,
        status: 'OK'
      }
    }
  }
}
</script>

<style scoped></style>
