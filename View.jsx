import React from 'react'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { BiEdit } from 'react-icons/bi'
export const View = ({ deta, del, edit }) => {
  return deta.map((data, index) => (
    <tr key={index}>
      <td>{data.name}</td>
      <td>{data.lname}</td>
      <td>{data.email}</td>
      <td>{data.phone}</td>
      <td onClick={() => edit(index)}><BiEdit /></td>
      <td onClick={() => del(index)}><RiDeleteBin6Line /></td>
    </tr>
  ))
}
