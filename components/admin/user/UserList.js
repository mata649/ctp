import React from 'react'

export const UserList = ({children}) => {
  return (
    <table className="table table-hover">
    <thead>
      <tr>
        <th scope="col">Nombre</th>
        <th scope="col">Email</th>
        <th scope="col">Rol</th>
        <th scope="col">Acciones</th>
      </tr>
    </thead>
    <tbody>
    {children}
    </tbody>
  </table>
  
  )
}
