
import React, { useState } from "react";
import {Link,  useNavigate} from 'react-router-dom';
import axios from 'axios';
import "./CreateAdminAccountStyle.css"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";


function CreateAdminAccount() {

    //Function to allow users to navigate between pages using the react-router-dom import:
    const navigate = useNavigate();  
    
    //Object that is used to store the data from this pages that will be used to create a admin account:
    const formData = yup.object().shape( {

        //The values of a admin account thats contents are using yup for input authentication:
        adminUsername: yup.string().required("Your Full Name is Required!"),
        adminFirstName: yup.string().required("Your First Name is Required!"),
        adminLastName: yup.string().required("Your Last Name is Required!"),
        adminPassword: yup.string().min(8, "Your password must be at least 8 characters long").max(20, "Your password may not be longer then 20 characters").required("Your password is required"),
        adminEmail: yup.string().email("Please input a proper email").required("A email is required"),
        adminID: yup.string().required("Your Admin ID is Required!").min(8, "Your admin ID must be at least 8 characters long").max(20, "Your admin ID may not be longer the 20 characters"),

    });
    
    //yup resolver functions:
    const {
        
        //Functions for registering input functions to me assigned and checked by yup resolver:
        register,

        //Function for handling the submit of the input of the desired from:
        handleSubmit,

        //Function for obtaining the information from yupResolver on what errors occurred during input validation:
        formState: { errors },

      } = useForm({ resolver: yupResolver(formData),});

      //Value to store error message from the server detailing if any of the back-end validation failed while attempting to create a new admin account:
      const[serverMsg, setServerMsg] = useState();
  

      //Logs what the contents of the form data was
      console.log('FormData:', formData);

    //Function for what to do for the submission of the form:
    async function onSubmit(data) {

        try {

                //Post request to the server using axios: 
                const response = await axios.post('http://localhost:3005/CreateAdminAccount', data).then(result => {

                    console.log(result);

                    //Waits for the backend to confirm a new admin account was created and if it is not stores a error messages that will be displayed, if it succeeds
                    //navigates back to the AdminHome page. 
                    if(result.data === 'Admin account created'){

                        navigate('/AdminHome', {replace: true});

                    } else {

                        setServerMsg(result.data.message);
                    }
            
                });
                


            
        } catch (error) {
            console.error('Error:', error);
        }

    }//end of handle submit function.


    return(

        <div className="createAdminAccount">


            <div className="createAdminContainer"> 


                <form className="createAdminForm" onSubmit={handleSubmit(onSubmit)}>


                    <div className="adminInputArea">

                    
                        <div className='adminInputSections'>

                            {/*adminUsername type string input for CreateAdminAccount*/}
                            <h1>Create New Account</h1>

                            <label className="createAdminAccountLabels">Username</label>

                            <input
                                className="createAdminInput"
                                type="text"
                                placeholder="Username"
                                {...register("adminUsername")}
                            />

                            <p className="adminEM">{errors.adminUsername?.message}</p>
                            


                         </div>


                         <div className='adminInputSections'>

                            {/*adminFirstName type string input for CreateAdminAccount*/}

                            <label className="createAdminAccountLabels">First Name</label>

                            <input
                                className="createAdminInput"
                                type="text"
                                placeholder="First Name"
                                {...register("adminFirstName")}
                            />

                            <p className="adminEM">{errors.adminFirstName?.message}</p>

                        </div>


                        <div className='adminInputSections'>

                            {/*adminLastName type string input for CreateAdminAccount*/}

                            <label className="createAdminAccountLabels">Last Name</label>

                            <input
                                className="createAdminInput"
                                type="text"
                                placeholder="Last Name"
                                {...register("adminLastName")}
                            />

                            <p className="adminEM">{errors.adminLastName?.message}</p>

                        </div>

                        <div className='adminInputSections'>

                        {/*adminPassword type string input for CreateAdminAccount*/}

                            <label className="createAdminAccountLabels">Password</label>

                            <input
                                className="createAdminInput"
                                type="text"
                                placeholder="Password"
                                {...register("adminPassword")}
                            />

                            <p className="adminEM">{errors.adminPassword?.message}</p>

                        </div>

                        <div className='adminInputSections'>

                            { /*adminEmail type string input for CreateAdminAccount*/}

                            <label className="createAdminAccountLabels">Email</label>

                            <input
                                className="createAdminInput"
                                type="text"
                                placeholder="Email "
                                {...register("adminEmail")}
                            />

                            <p className="adminEM">{errors.adminEmail?.message}</p>

                        </div>

                        <div className='adminInputSections'>

                            { /*adminID type string input for CreateAdminAccount*/}

                            <label className="createAdminAccountLabels">Admin ID</label>

                            <input
                                className="createAdminInput"
                                type="text"
                                placeholder="ID"
                                {...register("adminID")}
                            />

                            <p className="adminEM">{errors.adminID?.message}</p>

                        </div>

                        <div>
                            <p>{serverMsg}</p>
                        </div>
                 
                       

                    </div>

                    <div className="adminButtonArea">

                        <div className="createAccountSubmit">

                            <button onClick={handleSubmit}>Submit</button>

                            <button type="reset">Clear</button>  

                            <Link to="/AdminHome">
                                <button className="return-btn">Return</button>
                             </Link>
                            
                        </div>

                    </div>


  

                </form>

            </div>


        </div>
    )
}

export default CreateAdminAccount;