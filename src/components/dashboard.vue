<template>

<div class="container-fluid">
<div class="row">
 <div class="col-md-offset-4 col-md-4">
     <h4 class="myclass">UserName: {{username}}</h4>
 <h4 class="myclass">Email: {{email}}</h4>

   
    <input type="text" style="margin-top:20px; margin-bottom:20px;" v-model="search" placeholder="Search title.."/>
    <button @click="sortList('price',sortsequence)"> Sort by Price</button>
    <button @click="sortList('review',sortsequence)"> Sort by Review</button>
    <button @click="sortList('topic',sortsequence)"> Sort by Topic</button>
    <label>Sorting order </label>
    <select v-model="sortsequence">
      <option selected value="asc">sort in acessending order</option>
      <option value="desc">sort in decending order</option>
    </select>    
    
    <table class="table" style="color:white">
    <thead>
      <tr>
        <th>Topic</th>
        <th>Price</th>
        <th>Review</th>
        <th>avg Rating</th>
        <th>Total Ratings</th>
        <th>Location</th>
        <th>time</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="post in filteredList">
        <td> {{ post.title }}</td>
        <td> {{ post.price }}</td>
        <td> {{ post.review }}</td>
        <td> {{ post.rating }}</td>
        <td> {{ post.total_ratings }}</td>
        <td> {{ post.location }} </td>
        <td> {{ post.time}} </td>
      </tr>
      
    </tbody>
  </table>
  <div class="form-group"  v-if="type=='parent'">
      <label style="color:white">Topic:</label>
      <select class="form-control" name="user_review" v-model="user_topic">
      <option v-for="post in filteredList" :value="post.title" >{{post.title}}</option>
      </select>
    </div>
    <div class="form-group" v-if="type=='parent'">
      <label style="color:white">Review:</label>
      <select class="form-control" name="user_review" v-model="user_review">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
      </select>
    </div>
      <button style="margin-top:10px;" class="form-control" @click="save_review()"> Saved</button>
     </div>
        <div class="col-md-4" v-if="type=='service_provdier'">
        <form @submit.prevent="add_activity" novalidate>
          <h2 style="color:white; margin-top: 23%;">Add</h2>
          <div class="input-container">
            <i class="fa fa-user icon"></i>
            <input
              class="input-field"
              type="text"
              v-model="add_topic"
              v-validate="'required'"
              placeholder="Class/Activity"
              name="add_topic"
            />
          </div>
           <p style="color:red" v-if=" errors.first('add_topic')">Topic is Required.</p>
          <div class="input-container">
            <i class="fa fa-envelope icon"></i>
            <input
              class="input-field"
              type="text"
              v-model="add_price"
               v-validate="'required'"
              placeholder="Price"
              name="add_price"
            />
          </div>
           <p style="color:red" v-if=" errors.first('add_price')">Price is Required</p>
          <div class="input-container">
            <i class="fa fa-key icon"></i>
            <input
              class="input-field"
              type="text"
              v-model="add_review"
               v-validate="'required'"
              placeholder="Review"
              name="add_review"
            />
            
          </div>
          
          <p style="color:red" v-if=" errors.first('add_location')">Location is Required</p>
          <div class="input-field">
             <i class="fa fa-user icon"></i>
            <input
              class="input-field"
              type="text"
              v-model="add_location"
              v-validate="'required'"
              placeholder="Location"
              name="add_location"
            />
          </div>
          <p style="color:red" v-if=" errors.first('add_time')">Time is Required</p>
          <div class="input-field">
             <i class="fa fa-user icon"></i>
            <input
              class="input-field"
              type="text"
              v-model="add_time"
              v-validate="'required'"
              placeholder="Time"
              name="add_Time"
            />
          </div>
         
         <p style="color:red" v-if=" errors.first('add_review')">Review is Required.</p>
          <button type="submit" class="btn">Add</button>
        </form>
        <button class="btn" @click="Remove_activity()">remove</button>
        <button class="btn" @click="Update_activity()">Update</button>
      </div>

</div>
</div>

</template>

<script>
class Post {
  constructor(title, price, review, rating, total_ratings ,location,time) {
    this.title = title;
    this.price = price;
    this.review = review;
    this.rating = rating;
    this.total_ratings = total_ratings;
    this.location = location;
    this.time = time;
  }
}
export default{
 name:'dasboard',
 data(){
   return{
         username:'',
         email:'',
         user_review:'1',
         user_topic:'',
         add_review:'',
         add_price:'',
         add_topic:'',
         add_location:'',
         add_time:'',
         search:'',
         sortsequence:'',
         type:'',
        postList : [
      new Post(
        'Math', 
        '£15', 
        'Good',
        '4.8',
        '6',
        'Room:c125',
        '9:00am'

      ),,
      
        ]
   }
 },
    computed: {
    filteredList() {
       return this.postList.filter(post => {
        return post.title.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },
 mounted(){
   var user = JSON.parse(localStorage.getItem("user"));
    if(user){

      this.username = user.user_name;
      this.email = user.email;
      this.type =  user.type;
    }
 },
 methods:{
 
  save_review(){
var self = this;
var topic = self.user_topic.replace(/\s/g,'');
console.log(self.user_topic);
var u_review = localStorage.getItem("review_"+self.email+'_'+topic);
if(!u_review){
localStorage.setItem("review_"+self.email+'_'+topic, self.user_review);
var topicObj = new Object;
self.filteredList.forEach(function(t) {
if(t.title == self.user_topic){
topicObj = t;
}
});
// adding average
var newAvg = ((topicObj.rating * topicObj.total_ratings) + self.user_review)/topicObj.total_ratings+1;
self.filteredList.forEach(function(t) {
if(t.title == self.user_topic){
t.rating = newAvg;
t.total_ratings = t.total_ratings+1;
}
});
alert("Review Saved");
}
else{
alert("Cannot update your review");
}
},
   add_activity(){
     this.$validator.validateAll().then((result) => {
         if(result){
          var new_record= {
            'title':this.add_topic,
            'price':this.add_price,
             'review':this.add_review ,
             'rating':'',
             'avgrating':'',
             'location':this.add_location,
             'time':this.add_time,
          };

          this.postList.push(new_record);
           
     alert("Added");
         }
     });
   },
   Remove_activity(){ 
     let name = this.add_topic
     let price = this.add_price
    
     let count=0
       
       
         this.postList.forEach((value)=>{
           
          
           count++;


         
           for(const x in value)
           {
             console.log("XXX",value[x])
             console.log("uuu",x)
             console.log(name)

            
               if(value[x]==name)
               {
                  console.log("fuck",this.postList)
               this.postList.splice(count-1,1)
               }
               
             
           }
           
           
        
    
      
     })

       
      

     
     
   },
   Update_activity(){
     let count=0;

     var obj = {
        title:this.add_topic,
        price:this.add_price,
        review:this.add_review ,
        rating:'',
        total_ratings:'',
        location:this.add_location,
        time:this.add_time,
     }
     let name = this.add_topic;
      this.postList.forEach((value)=>{
        count++;
      
        for(const x in value)
        {
          console.log(value)
          let newObj = {

             rating:value.rating,
             total_ratings:value.total_ratings

            
          } 
          
          if(value[x]===name)
          { 
            
             Object.assign(obj,newObj)
             
             
            this.postList.splice(count-1,1,obj)

          }
          
        }
      })
     
   },
    
   sortList(by,sortsequence){
     console.log(sortsequence);
     if(by === 'price'){
       if(sortsequence =='asc'){
       return this.postList.sort(function(a, b) {
        console.log('ruung asc')
      return a.price - b.price;
      });}
      if(sortsequence =='desc'){
       return this.postList.sort(function(a, b) {
        
        console.log('running desc')
        return b.price - a.price;
      });}
     }
     else if(by === 'review'){
       return this.postList.sort(function(a, b) {
         if(sortsequence =='asc'){
           if (a.review < b.review){
                 return -1;}
          if (a.review > b.review){
                 return 1;
           }}
           if(sortsequence =='desc'){
             if (b.review < a.review){
                 return -1;}
                 if (b.review > a.review){
                 return 1;
           }}
         
          return 0;
      });
     }
     else if(by === 'topic'){
        if (sortsequence == 'asc'){
       return this.postList.sort(function(a, b) {
           if (a.title < b.title){
                 return -1;}
          if (a.title > b.title){
                 return 1;
           }
          return 0;
      });
     }
     if (sortsequence == 'desc'){
       return this.postList.sort(function(a, b) {
           if (b.title < a.title){
                 return -1;}
          if (b.title > a.title){
                 return 1;
           }
          return 0;
      });
     }
     }
   },

  compare( a, b ) {
    if ( a.last_nom < b.last_nom ){
      return -1;
    }
    if ( a.last_nom > b.last_nom ){
      return 1;
    }
    return 0;
}

 }
}
</script>
<style>
.myclass{
    color:white;
}
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
  display: flex;
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
  margin-bottom:5px;
}

.btn:hover {
  opacity: 1;
}
</style>