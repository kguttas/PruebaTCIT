import React from 'react'
import { Link } from 'react-router-dom'

import {
    CContainer,
    CHeader,
} from '@coreui/react'
 
///////////////////////////////

const styles = {
    divHeader: {
        padding: '12px 15px',
        borderBottom: '1px solid rgb(0,0,0,0.3)'
    }
}

const AppHeader = () => {
  
    return (
      <CHeader position="sticky" className="mb-4">
        <CContainer fluid>
          
              <div className="header-brand" to={`/`}>
                  <Link to={`/`} className="btn btn-success" replace>
                      Test TCIT
                  </Link>
              </div>
                
        </CContainer>
      </CHeader>

    )
    
}

export default AppHeader;