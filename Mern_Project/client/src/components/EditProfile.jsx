import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom"
import axios from 'axios';
import Navbar from '../pages/Navbar';
import {userByIdRoute } from "../utils/APIRoutes";
const EditProfile = ({ currentUser }) => {
  const [user, setUser] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState(null);
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');
  useEffect(() => {
    axios
      .get(`${userByIdRoute}/${currentUser._id}`)
      .then((response) => {
        setUser(response.data);
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setEmail(response.data.email);
        setPassword(response.data.password);

      })
      .catch((err) => console.log(err));
  }, [currentUser._id]);
  const nav = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('image', image);
    formData.append('bio', bio);
      
    axios
      .put(`http://127.0.0.1:8000/api/user/${currentUser._id}`, formData)
      .then((response) => {
        console.log("================================", formData);
        console.log(response.data);
        setUser(response.data);
        nav("/home")
      })
      .catch((err) => console.log(err));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="gradient-custom-2">
      <Navbar currentUser={currentUser} />
      {user && (

        <form onSubmit={handleSubmit}>

          <div>
            {/* <div class="d-flex justify-content-center mb-4">
              <img src={user.image}
                class="rounded-circle" alt="example placeholder" style="width: 200px;" />
            </div> */}
            
          </div>

          <div className="row mb-4">
            <div className="col">
              <div className="form-outline">
              <label className="form-label" >First name</label>
                <input type="text" value={firstName}
                  onChange={(e) => setFirstName(e.target.value)} className="form-control" />
                
              </div>
            </div>
            <div className="col">
              <div className="form-outline">
              <label className="form-label" >Last name</label>
                <input type="text" value={lastName}
                  onChange={(e) => setLastName(e.target.value)} className="form-control" />
                
              </div>
            </div>
          </div>


          <div className="form-outline mb-4">
          <label className="form-label" >Email address</label>
            <input type="email" value={email}
              onChange={(e) => setEmail(e.target.value)} className="form-control" />
          </div>

          <div className="form-outline mb-4">
          <label className="form-label" >Bio</label>
            <textarea name="" id="" cols="10" rows="05" onChange={(e) => setBio(e.target.value)} className="form-control" ></textarea>
              
              </div>

          <div className="form-outline mb-4">
          <label className="form-label" >Password</label>
            <input type="password" onChange={(e) => setPassword(e.target.value)} className="form-control" />   
          </div>

          <div className="d-flex mb-5">
              <div className="btn btn-warning btn-rounded">
                <label className="form-label text-white m-1" >Choose file</label>
                <input type="file"  onChange={(e) => handleImageChange(e)}
                  accept="image/*" />
              </div>
            </div>


          <button type="submit" className="btn btn-dark  mb-4">Update</button>



        </form>
      )}

    </div>
  )
}
export default EditProfile
