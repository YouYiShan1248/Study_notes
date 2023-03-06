<template>
  <div>{{ name }}}</div>
  <div @click="sayHello">点击</div>
</template>

<script>

export default {
  name: 'AppDDD',
  setup() {
    let name = 'App'
    let age = '18'

    function sayHello(name, age) {
      alert(`我叫${name}, ${age}`)
    }

    return {
      name,
      age,
      sayHello
    }
  },
  components: {
  }
}
</script>


