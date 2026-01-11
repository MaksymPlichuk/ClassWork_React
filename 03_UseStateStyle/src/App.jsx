import { useState } from 'react'
import './App.css'
import { MainContent, UserButton, RestaurantInfo } from './components/MainContent'

function App() {
  const [userCount, setUserCount] = useState(0);

  return (
    <>
      <MainContent />
    
      <div>{userCount}</div>

      <div>
        <UserButton ammount="-90" setUserCount={setUserCount} />
        <UserButton ammount="+100" setUserCount={setUserCount} />
        <UserButton ammount="+25" setUserCount={setUserCount} />
      </div>

      <RestaurantInfo FirstName="Puzata Hata" FirsAdress="Khreschatyk St, 15, 4-A, Kyiv, 01001" FirsRating="4.4" FirsKitchenType="Ukranian" FirsImgUrl="https://lh3.googleusercontent.com/gps-cs-s/AG0ilSzEWrIVKWJz20Yh3aVBnvjR1FqhkQGfmafm2yeFeQIKFQSzTQX0Ly4irQQmceiXSJ3DieaasgMs1Y_jfRh4mrXFh-Iam3jFDpi6oF6IJOksxuYxo67bKkKTwpsDjnqrplDX_rA=w325-h218-n-k-no"/>
    </>
  )
}

export default App
