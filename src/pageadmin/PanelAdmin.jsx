import React from 'react'
import Sidebar from './Sidebar'

const PanelAdmin = () => {
  return (
    <div className="container bg-light mt-3">
      <div className='row justify-content-center mt- mb-5'>
        <Sidebar />
        <div className='col-sm-9'>
          <h1 className='text-center mt-3'>ADMIN</h1>
        </div>
      </div>
    </div>
  )
}

export default PanelAdmin