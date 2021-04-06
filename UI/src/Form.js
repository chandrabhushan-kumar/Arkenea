import React,{Component}from 'react';
import './Form.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import $ 		from 'jquery';
import jQuery 	from 'jquery';
import validate from "jquery-validation";


export default class Form extends Component{
    constructor(props){
        super(props)
        this.state = {
            Submit  :true,
            Name    :"",
            message :"",
            mail    :"",
            mobileno : "",
            buttonText : "Submit"
        }
    }
    componentDidMount(){
        $.validator.addMethod("reglx",function(value,element,regexpr){
            return regexpr.test(value);
        }, "This field is required");
        // $.validator.addMethod("reglx1", function (value, element, regexpr) {
        //     return regexpr.test(value);
        //   }, "Email should be valid email address.");
      
        $("#validateApplication").validate({
            rules: {
                Name :{
                required:true,
                reglx:/^[A-Za-z\s]+$/

                },
                
                message:{
                    required:true,
                    reglx:/^[A-Za-z\s]+$/
    
                    },

                mail:{
                        required:true,
                         reglx:/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$|^$)/,
                         },
                 mobileno:{
                         required:true,
                         reglx:/^(\+\d{1,3}[- ]?)?\d{10}$/
                     },
                             
                
               
            },
            errorPlacement : function(error, element)
             {
			 	if(element.attr("Name") === "Name"){
					error.insertAfter("#erroralert1")
                }
                if(element.attr("Name") ==="mail"){
					error.insertAfter("#erroralert2")
                }
                if(element.attr("Name") ==="message"){
					error.insertAfter("#erroralert3")
                }
                if(element.attr("Name") ==="mobileno"){
					error.insertAfter("#erroralert4")
                }
              
            },
           
        })

        var stud_id = this.props.match.params.stud_id;
		this.setState({stud_id : stud_id});

		if(stud_id){
            this.setState({buttonText : "Update"});
            
            axios.get("http://localhost:3009/api/student/get/"+stud_id)
				.then(studdata=>{
					var stud = studdata.data.student; 
					console.log("stud = ",stud);

					this.setState({
						Name          : stud.Name,
						mail          : stud.mail,
						mobileno      : stud.mobileno,
						message       : stud.message,
						
					});
				})
				.catch((error)=>{
					console.log("Error while getting studData = ", error);
					Swal.fire("Oops...","Something went wrong <br/>"+error,"error");
				});

		}else{
			this.setState({buttonText : "submit"});
		}
    }


  

    handleChange(event){
        var name = event.currentTarget.name;
        this.setState({[name] : event.currentTarget.value});
      }
      handleSubmit(event){
          event.preventDefault();
          console.log(event)
          var Submit =true;
          if(Submit && this.state.Submit){

          var formValues = {

                            "Name"     :this.state.Name,
                            "mail"     :this.state.mail,
                            "message"  :this.state.message,
                            "mobileno" :this.state.mobileno,
                            "type"		             : this.state.buttonText,
                            "stud_id" 	             : this.state.stud_id  
                         }
                         console.log("formValues = ",formValues);

        if($("#validateApplication").valid()){
        axios.post('http://localhost:3009/api/Student/post', formValues)
        .then((response) => {
            if(this.state.buttonText ==="Submit"){
                Swal.fire("Congrats","Student data submitted successfully");
                this.props.history.push("/studentdatalist");

           }
           else{
           Swal.fire("Congrats!","Student Data updated Successfully");
                this.props.history.push("/studentdatalist");

           } 

            
         })
        
        .catch((error) => {
          console.log("error while saving  Details",error)
      });

    }     

    }
}
    
    render(){
        return(
            <div>
                <div className="formwrap">
                     <form className="col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-12 col-xs-12 formwrap1" id="validateApplication">
                         <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 wrap1">
                             <div className="form-group">
                                <label htmlFor="FirstName" className="fname">Name <span className="asterik">*</span></label>
                                    <div className="input-group" id="erroralert1">
                                         <span className="input-group-addon"> <i className="fa fa-user"> </i> </span>
                                            <input  type="text" className="form-control"placeholder="" name="Name" required="" 
                                                 defaultValue = {this.state.Name}
                                                   onChange    = {this.handleChange.bind(this)}
                                             ></input>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  wrap1">
                                     <div className="form-group">
                                         <label htmlFor="FirstName" className="email">Email Address <span className="asterik">*</span></label>
                                            <div className="input-group" id="erroralert2">
                                                 <span className="input-group-addon"> <i className="fa fa-envelope"> </i> </span>
                                                     <input  type="text" className="form-control"placeholder="" name="mail" 
                                                  defaultValue = {this.state.mail}
                                                  onChange    = {this.handleChange.bind(this)}
                                             ></input>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  wrap1">
                                     <div className="form-group">
                                         <label htmlFor="mobileno" className="email">Mobile Number <span className="asterik">*</span></label>
                                            <div className="input-group" id="erroralert4">
                                                 <span className="input-group-addon"> <i className="fa fa-mobile"> </i> </span>
                                                     <input  type="text" className="form-control"placeholder="" name="mobileno" 
                                                  defaultValue = {this.state.mobileno}
                                                  onChange    = {this.handleChange.bind(this)}
                                             ></input>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  wrap1">
                                     <div className="form-group">
                                         <label htmlFor="FirstName" className="message">Message <span className="asterik">*</span></label>
                                            <div className="input-group" id="erroralert3">
                                                 <span className="input-group-addon"> <i className="fa fa-comment-alt"> </i> </span>
                                                     <textarea  type="text" className="form-control"placeholder="" name="message" row="2" column="10" 
                                                     defaultValue = {this.state.message}
                                                     onChange    = {this.handleChange.bind(this)}
                                             ></textarea>
                                        </div>
                                    </div>
                                </div>
                                <button className="btn btn-primary col-lg-3 subButton pull-right" onClick={this.handleSubmit.bind(this)}>{this.state.buttonText}</button>
										
                            </form>
                        </div>
                    </div>
        )

    }
        
    
}