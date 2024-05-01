import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

const Create=()=>{

    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [age,setAge]=useState(0);

    const [error,setError]=useState("");


    const navigate=useNavigate();

    console.log(name,email,age);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const addUser = { name, email, age };
    
        try {
            const response = await fetch("http://localhost:5000", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(addUser),
            });
            const result=await response.json();

            if(!response.ok){
                console.log(result.error);
                setError(result.error);
            }
    
            // Reset form fields and navigate on successful submission
           if(response.ok){
             setName("");
            setEmail("");
            setAge(0);
            setError("");
            navigate("/all");}
        } catch (error) {
            console.error("Error occurred while fetching:", error.message);
            setError(error.message);
        }
    };
    
    
    return (
        <div className='container my-2'>
            {error && <div class="alert alert-danger">{error}</div>}
            <h2 className='tect-center'>enter data</h2>
            
            <form onSubmit={handleSubmit}>
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
 
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
            
            </div>
   
)}
export default Create;