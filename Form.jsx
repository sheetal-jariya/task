import React from 'react';
import './Form.css';
import { useEffect } from 'react';
import { useState } from 'react';
import { View } from './View';

//getting the data from localStorage.
const getDatafromLS = () => {
  const Data = localStorage.getItem('data');
  if (Data) {
    // json .parse data ko object  me convert krta hai
    return JSON.parse(Data)
  } else {
    return []
  }
}
const Form = () => {

  //main array state.
  const [data, setdata] = useState(getDatafromLS());



  //input fields states
  const [name, setname] = useState('');
  const [lname, setlname] = useState('');
  const [email, setemail] = useState('');
  const [phone, setphone] = useState('');
  const [btn, setbtn] = useState(true);
  const [Edit, setEdit] = useState(null)

  //form  submit event.
  const handleAddData = (e) => {
    e.preventDefault();
    //creating object
    let newData = {
      name,
      lname,
      email,
      phone
    }

    if (!data) {

    } else if (data && !btn) {
      setdata(
        data.map((elem) => {
          if (elem == Edit) {
            return { ...elem, name, lname, email, phone }
          }
          return elem
        })

      )
      setbtn(true);
      setEdit(null);
      setname("")
      setemail("")
      setphone("")
      setlname("")
    }
    else {
      setdata([...data, newData]);
      setname('');
      setlname('');
      setemail('');
      setphone('');
    }
  }

  const deleteData = (index) => {
    const del = data.filter((value, ind) => {
      return ind !== index;
    });
    setdata(del)

  }
  let updateData = (index) => {
    console.log("update");
    let edit = data.find((ele, ind) => {
      return ind === index
    }
    )
    console.log(edit)
    setbtn(false);
    setemail(edit.email)
    setname(edit.name)
    setlname(edit.lname)
    setphone(edit.phone);
    setEdit(edit)
  }
  // saving data in localStorage
  useEffect(() => {
    console.log(data)
    localStorage.setItem('data', JSON.stringify(data))
  }, [data])
  return (
    <>
      <h1>Add Your Data</h1><hr />
      <div className='main__div'>
        <div className='form-container'>
          <form action="" autoComplete='off' onSubmit={handleAddData} className='form'>
            <label htmlFor="">Name:</label><br />
            <input type="text" required value={name} onChange={(e) => { setname(e.target.value) }} /><br /><br />
            <label htmlFor="">LastName:</label><br />
            <input type="text" required value={lname} onChange={(e) => { setlname(e.target.value) }} /><br /><br />
            <label htmlFor="">Email:</label><br />
            <input type="text" required value={email} onChange={(e) => { setemail(e.target.value) }} /><br /><br />
            <label htmlFor="">Phone:</label><br />
            <input type="text" required value={phone} onChange={(e) => { setphone(e.target.value) }} /><br /><br />
            <button type='submit' className='add-btn'>
              {
                btn ? "add" : "update"
              }</button>
          </form>
        </div>
        <div className='view-container'>

          {data.length > 0 && <>
            <div>
              <table cellPadding={12} cellSpacing={18}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>LastName</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  <View deta={data} del={deleteData} edit={updateData} />
                </tbody>
              </table>
            </div>
          </>}
          <button onClick={() => setdata([])} className='del-btn'>Delete all</button>
        </div>
       
      </div>
    </>
  )
}

export default Form