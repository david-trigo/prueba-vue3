<template>
  <UsersTable/>
</template>

<script>
import UsersTable from './components/UsersTable.vue'

export default {
  name: 'App',
  components: {
    UsersTable
  }
}
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    margin-top: 60px;
  }
  .container h1{font-size:1.6em;color:#5d5d5d;margin-bottom:2em;}
  .el-dialog__title{font-weight:bold;}
  .el-notification .el-icon-success{color:#67c23a;}
  .el-form-item{margin:0 4em;}
  .el-form-item label{width:6em;}

  .formCategory{margin:2em 4em;}
  .formCategory .el-form-item{margin:0 0 0 2em;}
  .formCategory label{margin-bottom:1.5em;width:8em;}

  .el-overlay>div{
    overflow: auto;
    padding-bottom:2em;
  }
</style>
