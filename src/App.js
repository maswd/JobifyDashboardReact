import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Error, Register, Landing, ProtectedRoute } from "./pages";
import { AllJobs, AddJob, Profile, Stats, SharedLayout } from './pages/dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
          // <ProtectedRoute>
            <SharedLayout />
          // </ProtectedRoute>
          
        } >
          <Route index element={<Stats />} />
          <Route path='all-jobs' element={<AllJobs />}></Route>
          <Route path='add-job' element={<AddJob />}></Route>
          <Route path='profile' element={<Profile />}></Route>
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
