import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import OnBoarding from './pages/OnBoarding'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useCookies } from 'react-cookie'
// import ReportUser from './components/ReportUser'

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['user'])

  const authToken = cookies.AuthToken

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        {authToken && <Route path='/dashboard' element={<Dashboard />} />}
        {authToken && <Route path='/onboarding' element={<OnBoarding />} />}
        {/* {authToken && (
          <Route
            path='/report'
            element={
              <ReportUser
                userId='17e3458f-56a4-4886-b593-11f7aec37872'
                onClose={false}
              />
            }
          />
        )} */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
