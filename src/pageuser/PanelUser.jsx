import React from 'react'
import Sidebar from '../pageadmin/Sidebar'

const PanelUser = () => {
  return (
    <div className="container bg-light mt-3">
      <div className='row justify-content-center mt- mb-5'>
        <Sidebar />
        <div className='col-sm-10 pt-3'>
          <div className='card'>
            <div className='card-body pt-2'>
                <h2 className='text-center mt-3'>USUARIO</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PanelUser