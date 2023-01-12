import React from 'react'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'

function Modal(props) {
  // const [showModal,setShowModal] = useState(false)
    return (
      <>
  
   
            <div className="overlay"></div>
        <div className="custom-modal card shadow-md">
              {props.children}
          <button onClick={props.closeModal} type="button" className="modal-btn" aria-label="Close"><FontAwesomeIcon icon={faX} /> </button>
          <i className="fa-solid fa-x"></i>
        </div>
    
      </>
  )
}

export default Modal