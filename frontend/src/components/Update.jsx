import React, {useState,useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Update =()=>{
    
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [age,setAge]=useState(0);

    const [error,setError]=useState("");
    const {id}=useParams();
    const navigate =useNavigate();


    const getSingleUSer = async ()=>{
       

        const response= await fetch (`http://localhost:5000/${id}`);

        const result=await response.json();


    if(!response.ok){
        console.log(result.error);
        setError(result.error);

    }
    if(response.ok){
        setError("");
        console.log("updated user",result);
        setName(result.name);
        setEmail(result.email);
        setAge(result.age);

        

    }
    };

    const handleUpdate=async(e)=>{
        e.preventDefault();
        
        const updateUser = { name, email, age };
    
        try {
            const response = await fetch(`http://localhost:5000/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updateUser),
            });
            const result=await response.json();

            if(!response.ok){
                console.log(result.error);
                setError(result.error);
            }
    
            // Reset form fields and navigate on successful submission
           if(response.ok){
            setError("")
            navigate("/all");
        }
        } catch (error) {
            console.error("Error occurred while fetching:", error.message);
            setError(error.message);
        }
    }

    useEffect(()=>{
        getSingleUSer();
    },[]);

    return (
        <div className='container my-2'>
            {error && <div class="alert alert-danger">{error}</div>}
            <h2 className='tect-center'>Edit data</h2>
            
            <form onSubmit={handleUpdate} >
            <div className="mb-3">
    <label  className="form-label">Name</label>
    <input type="text" className="form-control" value={name} onChange={(e)=>setName(e.target.value)} />
  </div>
  <div className="mb-3">
    <label className="form-label">Email address</label>
    <input type="email" className="form-control"value={email} onChange={(e)=>setEmail(e.target.value)} />
  </div>
  <div className="mb-3">
    <label  className="form-label">age</label>
    <input type="number" className="form-control" value={age} onChange={(e)=>setAge(e.target.value)}/>
  </div>
 
  <button type="submit" className="btn btn-primary">Update</button>
</form>
            
            </div>
   
    )
}
export default Update;