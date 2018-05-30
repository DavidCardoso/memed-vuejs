<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}

.msg {
  color: #cecece;
  font-size: 0.7em;
  font-weight: bold;
}

.alert-light {
  text-align: justify;
  text-justify: inter-word;
}

.btn .msg {
  font-size: 0.5em;
}

.metric-unit {
  text-transform: uppercase;
}

.medicine-icon {
  width: 25px;
}
</style>
