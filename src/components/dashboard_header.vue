<template>

<nav class="navbar navbar-inverse">
      <div class="container-fluid">
        <ul class="nav navbar-nav navbar-right">
          <li>
            <a style="color:white">{{username}}</a>
          </li>
          <li>
            <a href="javascript:void(0)" @click="logout()" style="color:white">
              <span class="glyphicon glyphicon-log-in"></span> Logout
              </a>
          </li>
        </ul>
      </div>
    </nav>

</template>

<script>

export default{
 name:'dashboard_header',
 data(){
   return{
         username:''
   }
 },
 mounted(){
   if(!localStorage.getItem("loged_in")){
      window.location.href = '/';
    }
   var user = JSON.parse(localStorage.getItem("user"));
    if(user){
      this.username = user.user_name;
    }
 },
 methods:{

   logout(){
     localStorage.removeItem('user');
     localStorage.removeItem("loged_in");
     localStorage.removeItem("review");
     window.location.href = '/';
   }

 }

}
</script>