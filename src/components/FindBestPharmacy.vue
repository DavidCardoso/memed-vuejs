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
  data: function () {
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
    alertMsg: function () {
      return this.msgs[1]
    },
    buttonMsg: function () {
      return this.msgs[2]
    },
    pharmacy: function () {
      return this.pharmacies[0]
    }
  },
  // get pharmacies
  created: function () {
    this.getPharmacies()
    console.log('created')
  },
  methods: {
    // history.back()
    backToPrescription: function () {
      this.$router.go(-1)
    },
    // get user device | memed geolocation
    getUserLocation: function () {
      return ['-23.5648304,-46.6436604']
    },
    // matrix API destinations
    getDestinations: function () {
      const destinations = this.pharmacies.reduce(function (result, pharmacy) {
        result.push(pharmacy.attributes.lat + ',' + pharmacy.attributes.lon)
        return result
      }, [])
      return destinations
    },
    // get pharmacies basic data
    getPharmacies: function () {
      const vm = this
      axios.get(pharmaciesEndpoint)
        .then(function (response) {
          vm.pharmacies = response.data.data
          vm.getPharmaciesMedicaments()
          vm.getPharmaciesMatrix()
        })
        .catch(function (error) {
          console.log(`Error trying to fetch pharmacies: ${error}`)
        })
      console.log('pharmacies')
    },
    // get pharmacies medicaments data (name, price)
    getPharmaciesMedicaments: function () {
      const vm = this
      this.pharmacies.forEach((pharmacy) => {
        // request all medicaments of each pharmacy
        axios.get(`${pharmaciesEndpoint}/${pharmacy.id}`)
          .then(function (response) {
            // keep only the prescripted medicaments
            pharmacy.medicamentos = response.data.data.attributes.medicamentos.filter(function (med) {
              vm.medicaments.find(x => x.name === med.nome)
            })
            // calculate the total price based on the matched medicaments
            pharmacy.totalPrice = pharmacy.medicamentos.reduce(function (total, med) {
              return total + med.preco
            }, 0)
          })
          .catch(error => {
            console.log(`Error trying to fetch pharmacies (id ${pharmacy.id}): ${error}`)
          })
      })
      console.log('medicaments')
    },
    // get pharmacies matrix data (distance, duration)
    getPharmaciesMatrix: function () {
      const vm = this
      // prepare request options
      const options = {
        key: process.env.GAPI_KEY,
        mode: 'driving',
        origins: this.getUserLocation(),
        destinations: this.getDestinations()
      }
      // request all distance/duration from origins to destinations
      gapi.distance(options, function (error, response) {
        if (error) {
          return console.log(error)
        }
        // as known that matrix api returns at the same order of the destinations
        // it is possible to iterate each pharmacies and set its matrix data
        response.forEach(function (item, index) {
          vm.pharmacies[index].matrix = item
        })
      })
      console.log('matrix')
    },
    // find the best pharmacy based on distance and total price of the prescripted medicaments
    getBestPharmacy: function () {
      // processamento ...
      // return this.pharmacies[0]
      return {
        type: 'farmacias',
        id: 1,
        attributes: {
          nome: 'Testing',
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
        matrix: {
          distance: '9,9 km'
        },
        totalPrice: 99.99,
        status: 'OK'
      }
    }
  }
}
</script>

<style scoped></style>
