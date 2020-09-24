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
            mail    :""
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
                reglx:/^[A-Za-z]+$/

                },
                
                message:{
                    required:true,
                    reglx:/^[A-Za-z]+$/
    
                    },

                mail:{
                        required:true,
                         reglx:/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$|^$)/,
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
              
            },
           
           
           
           
            
            
        })
    }
  

    handleChange(event){
        var name = event.currentTarget.name;
        this.setState({[name] : event.currentTarget.value});
      }
      handleSubmit(event){
          event.preventDefault();
          console.log(event)
          var submit =true;

          var formValues = {

                            "Name"     :this.state.Name,
                            "mail"     :this.state.mail,
                            "message"  :this.state.message,  
                         }
                         console.log("formValues = ",formValues);

        if($("#validateApplication").valid()){
        axios.post('http://localhost:3009/api/Student/post', formValues)
        .then((response) => {
            Swal.fire("Thank you","Thanks for your interest. We will revert you in 24 hours..!");
            
           
      })
      .catch((error) => {
          console.log("error while saving  Details",error)
      });

          

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
                                <button className="btn btn-primary col-lg-3 subButton pull-right" onClick={this.handleSubmit.bind(this)}>Submit</button>
										
                            </form>
                        </div>
                    </div>
        )

    }
        
    
}