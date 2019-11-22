<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-4 col-md-offset-4">
        <form @submit.prevent="login" novalidate>
          <h2 style="color:white; margin-top: 23%;">Login</h2>
          <div class="input-container">
            <i class="fa fa-envelope icon"></i>
            <input
              class="input-field"
              type="email"
              v-model="email"
               v-validate="'required'"
              placeholder="Email"
              name="email"
            />
          </div>
           <p style="color:red" v-if=" errors.first('email')">{{errors.first('email')}}</p>
           <div class="input-container">
             <select v-model="type" class="form-control">
             <option value="parent">Parent/Student</option>
             <option value="service_provdier">Service Provider</option>
           </select>
          </div>
          <div class="input-container">
            <i class="fa fa-key icon"></i>
            <input
              class="input-field"
              type="password"
              v-model="pass"
               v-validate="'required'"
              placeholder="Password"
              name="pass"
            />
          </div>
         <p style="color:red" v-if=" errors.first('pass')">Password is Required.</p>
          <button type="submit" class="btn">Login</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",

  data() {
    return {
      email: "",
      pass: "",
      type:'student'
    };
  },
  mounted(){
    if(localStorage.getItem("loged_in")){
      this.$router.push({ name: 'dashboard' })
    }
      console.log(JSON.parse(localStorage.getItem("user")));
  },
  methods: {
    login() {
       this.$validator.validateAll().then((result) => {
    var user = JSON.parse(localStorage.getItem("user"));
    if(user){
      if(this.email != user.email){
        alert("Invalid Email");
    }
    else if(this.pass != user.pass)
    {
        alert("Invalid Password");
    }
    else if(this.type != user.type)
    {
        alert("Invalid Account Type");
    }
    else if(this.email == user.email && this.pass == user.pass && this.type== user.type)
    {
      localStorage.setItem("loged_in","true");
      this.$router.push({ name: 'dashboard' })
    }
    else{
        alert("Login Failed");
    }
    }
    else{
      alert("User does not exists");
    }
       });
    }
  }
};
</script>
<style>
body {
  font-family: Arial, Helvetica, sans-serif;
}
* {
  box-sizing: border-box;
}

.input-container {
  display: -ms-flexbox; /* IE10 */
  display: flex;
  width: 100%;
  margin-bottom: 15px;
}

.icon {
  padding: 10px;
  background: dodgerblue;
  color: white;
  min-width: 50px;
  text-align: center;
}

.input-field {
  width: 100%;
  padding: 10px;
  outline: none;
}

.input-field:focus {
  border: 2px solid dodgerblue;
}

/* Set a style for the submit button */
.btn {
  background-color: dodgerblue;
  color: white;
  padding: 15px 20px;
  border: none;
  cursor: pointer;
  width: 100%;
  opacity: 0.9;
}

.btn:hover {
  opacity: 1;
}
</style>