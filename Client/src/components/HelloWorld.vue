



<template>
<div class="container">



  <button class="btn btn-primary" @click="showModal();" v-show="addbtn">Add New Employee</button>



  <!-- Form to add Employee             -->
  <div class="card container card-container mb-3 col-6" v-show="addcondition" enctype="multipart/for-data" >
    <div class="card-body col-8 m-auto ">
    <h3>Add Employee</h3>
  <form @submit.prevent="addEmployee" autocomplete="off">
      <div class="form-group mb-2">
        <input type="text" v-model="emp.name" required class="form-control" id="exampleInputName"  placeholder="Enter Name">
      </div>
      <div class="form-group mb-2">
        <input type="email" v-model="emp.email"  required class="form-control" id="exampleInputEmail" placeholder="Enter Email ID">
      </div>
      <div class="form-group mb-2">
        <input type="number" v-model="emp.mobile" required min="10" class="form-control" id="exampleInputMobile"  placeholder="Enter Mobile number">
      </div>
      <div class="form-group mb-2 ">
          <input type="file" @change="onFileChanged" class="form-control">
        <!-- <input type="text"  required class="form-control" placeholder="upload image" id="exampleInputPhoto" > -->
      </div>
      
      <button type="submit" class="btn btn-primary">Add Employee</button>
</form>
</div>
  </div>


  <!-- Edit Employee form -->
<div class="card container card-container mb-3 col-6" v-show="editcondition" >
     <div class="card-body col-8 m-auto ">
    <h3 class="mb-2">Update Employee</h3>
<form @submit.prevent="updateEmployee(employee._id)" autocomplete="off">
      <div class="form-group mb-2">
        <input type="text" v-model="employee.name" required class="form-control" id="exampleInputName"  placeholder="Enter Name">
      </div>
      <div class="form-group mb-2">
        <input type="email" v-model="employee.email" required class="form-control" id="exampleInputEmail" placeholder="Enter Email ID">
      </div>
      <div class="form-group mb-2">
        <input type="number" v-model="employee.mobile" required min="10" class="form-control" id="exampleInputMobile" placeholder="Password" >
      </div>
      <div class="form-group mb-2">
        <img class="rounded sx-auto d-block" v-bind:src="`${employee.photo}`"/>
        <input type="file" id="exampleInputPhoto" >
      </div>
      
      <button type="submit" class="btn btn-primary">Update</button>
</form>
</div>
  </div>


<!-- Show All Data -->

    <table class="table table-striped table-hover">
<thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Mobile</th>
      <th scope="col">Image</th>
      <th scope="col"></th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
    <tr   v-for="(employeelist, i) in employeelists" :key="i.id">
    
      <td>{{employeelist.name}}</td>
      <td>{{employeelist.email}}</td>
      <td>{{employeelist.mobile}}</td>
      <!-- <td><img src="employeelist.photo" /></td> -->
      <td><img class="rounded mx-auto d-block" v-bind:src="`${employeelist.photo}`"/></td>
      <td><button class="btn btn-danger btn-sm" @click="editEmployee(employeelist._id)">Edit</button></td>
      <td><button class="btn btn-danger btn-sm" @click="deleteEmployee(employeelist._id)">Delete</button></td>
    </tr>
   
  </tbody>
</table>
</div>

</template>


<script>
import axios from 'axios';
// import {ref} from 'vue'
export default {
	data() {
    return {
      employeelists: [],   
      submitted: false,
      successful: false,
      message: '',
      
      emp:{
        name:'',
        email:'',
        mobile:'',
        photo:'',
        
      },
      employee:[],
      editcondition:false,
      addcondition:false,
      addbtn:true,
      index:0,
      selectedFile:null,
     
      
    };
  },
  component:{
        template: "#modal-template"
      },
  mounted(){
  
  this.getEmployeeList();

  
  },
methods:{

   onFileChanged (event) {
    this.selectedFile = event.target.files[0]
  
  },
  
  
  getEmployeeList() {
    return axios
      .get("http://localhost:7000/api/goals")
      .then(response => {
        this.employeelists = response.data; 
      });
  },

  showModal()
  {
    this.addbtn = false
    this.addcondition = true
    this.editcondition = false
  },


  

  addEmployee() {
    
         let formData = new FormData();
        
        formData.append('testImage', this.selectedFile)
        formData.append('mobile', this.emp.mobile)
        formData.append('name', this.emp.name)
        formData.append('email', this.emp.email)
      this.message = '';
      this.submitted = true;
      


      return axios
      .post("http://localhost:7000/api/goals/image",formData)

      .then(response => {
        this.employeelists = response.data;
        
      if(response.data.err == 2)
        {
                  this.$swal(
                  'Oops!',
                  'Email Id Already Exist.',
                  'error'
                )
            this.addcondition = true,
            this.addbtn = false
            this.getEmployeeList()
        }     
        else if(response.status == 200)
        {
            this.addcondition = false,
            this.addbtn = true
            this.emp.name = "",
            this.emp.mobile = "",
            this.emp.email = "",
            this.emp.photo = "",
            this.getEmployeeList()
            this.$swal(
                  'Added Successfully!',
                  'Employee Added Successfully.',
                  'success'
                )
        } 
          
      },error => {
              this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
            });    
    },

    editEmployee(Empid)
    {
        this.editcondition = true;
         this.addcondition = false
         this.addbtn = false
        return axios
      .get(`http://localhost:7000/api/goals/ById/${Empid}`)
      .then(response => {
        
        this.employee = response.data;
     
      });
    },


    updateEmployee(Empid)
  {   
        let formData = new FormData();
        formData.append('testImage', this.selectedFile)
      formData.append('mobile', this.employee.mobile)
      formData.append('name', this.employee.name)
      formData.append('email', this.employee.email)  
      
    return axios
      .put(`http://localhost:7000/api/goals/${Empid}`,formData)
      .then(response => {        
        this.employeelists = response.data;
        if(response.status == 200)
        {
            this.editcondition = false,
            this.addbtn = true
            this.getEmployeeList()
            this.$swal(
                  'Updated Successfully!',
                  'Employee Updated Successfully.',
                  'success'
                )
        }        
      },error => {
              this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
            });
    },

deleteEmployee(EmpId)
{     
  this.editcondition = false
this.addbtn=true
    return axios
      .delete(`http://localhost:7000/api/goals/${EmpId}`)
      .then(response => {
        if(response.status == 200)
        {
            this.getEmployeeList();
            this.$swal(
                  'Deleted!',
                  'Your file has been deleted.',
                  'success'
                )
        }
        else
        {
          this.$swal(
                  'Error!',
                  'Some thing went wrong!',
                  'success'
                )
        }
		
      });
    },
}

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;



  
}
*{
	margin:0;
	padding:0;
}

body{
	font:15px/1.3 'Open Sans', sans-serif;
	color: #5e5b64;
	text-align:center;
}

a, a:visited {
	outline:none;
	color:#389dc1;
}

a:hover{
	text-decoration:none;
}

section, footer, header, aside, nav{
	display: block;
}

/*-------------------------
	The menu
--------------------------*/

nav{
	display:inline-block;
	margin:60px auto 45px;
	background-color:#5597b4;
	box-shadow:0 1px 1px #ccc;
	border-radius:2px;
}

nav a{
	display:inline-block;
	padding: 18px 30px;
	color:#fff !important;
	font-weight:bold;
	font-size:16px;
	text-decoration:none !important;
	line-height:1;
	text-transform: uppercase;
	background-color:transparent;

	-webkit-transition:background-color 0.25s;
	-moz-transition:background-color 0.25s;
	transition:background-color 0.25s;
}

nav a:first-child{
	border-radius:2px 0 0 2px;
}

nav a:last-child{
	border-radius:0 2px 2px 0;
}

nav.home .home,
nav.projects .projects,
nav.services .services,
nav.contact .contact{
	background-color:#e35885;
}

p{
	font-size:22px;
	font-weight:bold;
	color:#7d9098;
}

p b{
	color:#ffffff;
	display:inline-block;
	padding:5px 10px;
	background-color:#c4d7e0;
	border-radius:2px;
	text-transform:uppercase;
	font-size:18px;
}

</style>

