import React,{Component} from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';
import './StudentdataList.css';



export default class StudentdataList extends Component{

    constructor(props){
		super(props);

		this.state = {
			studDetails : []
			
		}
    }
    componentDidMount(){
		this.getstudData();
	}
    
    getstudData(){
		Axios.get("http://localhost:3009/api/student/get")
			 .then((response)=>{
			 	console.log("response = ",response.data);
			 	  if(response.data.student){
			 	  	this.setState({
			 	  		studDetails : response.data.student,
			 	 	});
				  }
				 
			 })
			 .catch((error)=>{
			 	console.log("Error during get Data = ", error);
			 	Swal.fire("Oops...","Something went wrong! <br/>"+error, "error");
			 });		
    }
    deletestud(event){
		event.preventDefault();	
		var studid = event.currentTarget.id.substr(2);
		console.log("studid = ",studid);

		Swal.fire({
		  title: 'Are you sure, you want to Delete this Student?',
		  text: 'You will not be able to recover this record!',
		  icon: 'warning',
		  showCancelButton: true,
		  confirmButtonColor: '#d33',
  		  cancelButtonColor: '#3085d6',		  
		  confirmButtonText: 'Yes, delete it!',
		  cancelButtonText: 'No, keep it'
		}).then((result) => {
		  if (result.value) {
		  	Axios.delete("http://localhost:3009/api/student/delete/"+studid)
		  		.then((data)=>{
		  			console.log("data = ",data);
		  			if(data.data.deletedCount > 0){
						this.getstudData();
					    Swal.fire({
							title:"",
							text :'student  has been deleted successfully',
					      
					  })
		  			}else{
					    Swal.fire(
					      'Sorry, Something is Wrong!',
					      'student Record NOT deleted',
					      
					    )		  				
		  			}
		  		})
		  		.catch((err)=>{
		  			console.log("error while deleting  = ",err);
					    Swal.fire(
					      'Some Error Occured!',
					      ''+err,
					      'error'
					    )							  			
		  		});
		  } else if (result.dismiss === Swal.DismissReason.cancel) {
		    Swal.fire(
		      'Cancelled',
		      'Your student Record is NOT Deleted :)',
		      'error'
		    )
		  }
		})		
	}



    render(){
        return(
            <div className="row">
                <div className=" col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 Studentlist">
                <h1 className="slist">Welcome to Student List</h1>
                
					<table id="table-to-xls" className="table table-stripped table-hovered table-bordered"> 
                        <thead>
                            <tr>
                                <th>Sr no</th>
                                <th>Student Name</th>
                                 <th>Email</th>
                                <th>Message</th>
								<th>Mobile No</th>
                                <th>Action</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.studDetails.length > 0
                                ?
                                    this.state.studDetails.map((stud,index)=>{
                                        return(
                                            <tr key={index}>
                                                <td>{index+1}</td>
                                                <td>{stud.Name}</td>
                                                <td>{stud.mail}</td>
                                                <td>{stud.message}</td>
                                                <td>{stud.mobileno}</td>
                                                
                                                 <td>  
													<a href={""+stud._id}> <i id={"e-"+stud._id} className="fa fa-edit" title="Click to Edit"> </i> </a> &nbsp;&nbsp;
													<i id={"d-"+stud._id} className="fa fa-trash" title="Click to Delete" onClick={this.deletestud.bind(this)}> </i>
												</td> 


                                            </tr>

                                        )

                                    })
                                :
                                <tr> 
										<td colSpan="12"> Sorry... No Data available! </td>
									</tr>
		
                             }
                        </tbody>

                </table>

                </div>
            </div>
            

        )
    }
}
