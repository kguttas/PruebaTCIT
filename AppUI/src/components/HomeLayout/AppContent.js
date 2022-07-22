import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'

// routes config
import routes from '../../routes'

const nameComponent = 'Home';

const AppContent = () => {
  return (
    <CContainer lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          {routes.map((route, idx) => {

            const isContaint = route.layout.includes(nameComponent);
            
            return route.element && isContaint  ? (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={<route.element />}
                />
              )
            ) : null
            }) }
          
        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)