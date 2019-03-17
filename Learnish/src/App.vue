<template>
  <div id="app">
    <header>
      <div id="header-div">
        <img id="header-image" src="./assets/owlLogo.png" alt="Learnish">
        <span id="header-span">LearnishLearnishLearnishLearnishLearnish</span>
      </div>    
    </header>
    <main>
      <hello-world message="Hey Mat"/>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
  import HelloWorld from './components/HelloWorld';

  export default {
    name: 'app',
    components: {
      HelloWorld,
    },
  };
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#header-image {
  margin: 5px;
  height: 40px;
  filter: invert(80%);
}

#header-span {
  color: cornsilk;

}

main {
  text-align: center;
  margin-top: 40px;
}

header {
  margin: 0;
  height: 56px;
  padding: 0 16px 0 24px;
  background-color: #35495E;
}

header span {
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: .02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
}
</style>
