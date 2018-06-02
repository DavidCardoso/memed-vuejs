'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  GAPI_KEY: '"AIzaSyAm8v-bsDtp5aHgT-0LxdD08c1vWDwJ1QE"'
})
