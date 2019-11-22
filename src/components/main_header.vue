<template>

<nav class="navbar navbar-inverse">
      <div class="container-fluid">
        <ul class="nav navbar-nav navbar-right">
          <li>
            <router-link :to="{name:'register'}">
              <span class="glyphicon glyphicon-user"></span> Sign Up
            </router-link>
          </li>
          <li>
            <router-link :to="{name:'login'}">
              <span class="glyphicon glyphicon-log-in"></span> Login
            </router-link>
          </li>
        </ul>
      </div>
    </nav>

</template>

<script>

export default{
 name:'main_header'

}
</script>