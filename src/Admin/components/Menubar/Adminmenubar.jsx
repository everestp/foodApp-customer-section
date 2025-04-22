import React from 'react'

const Adminmenubar = ({toggleSideBar}) => {
  return (
    <div>
           <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
                    <div className="container-fluid">
                        <button onClick={toggleSideBar} className="btn btn-primary" id="sidebarToggle">
                            <i className='bi bi-list'></i>
                        </button>
                      
                    </div>
                </nav>
    </div>
  )
}

export default Adminmenubar