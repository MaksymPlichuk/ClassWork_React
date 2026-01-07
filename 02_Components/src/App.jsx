import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import News from './components/News'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <News url="https://uinp.gov.ua/storage/app/public/uploads/2025-10-24/17/rTM1761316423gi7.jpeg" text="1921 – початок Другого зимового походу
1921, 25 жовтня розпочався «Листопадовий Рейд» – Другий зимовий похід армії УНР проти більшовиків." textURL="https://uinp.gov.ua/istorychnyy-kalendar/zhovten/25/1921-pochatok-drugogo-zymovogo-pohodu"/>
      <News url="https://finclub.net/media/k2/items/cache/ea1957eb6778bc0def84b5a7dc8ce59e_XL.jpg" text="Revolut закриває рахунки усіх клієнтів з України" textURL="https://finclub.net/news/revolut-zakryvaie-rakhunky-usikh-kliientiv-z-ukrainy.html"/>
      <News url="https://finclub.net/media/k2/items/cache/4ba0cb184ed385e4d7d75080bb0b46e0_XL.jpg" text="Що відбулось з Україною за два роки війни. Фінансовий вимір" textURL="https://finclub.net/infographica/shcho-vidbulos-z-ukrainoiu-za-dva-roky-viiny-finansovyi-vymir.html"/>
      <News url="https://finclub.net/media/k2/items/cache/7752ce5e89429fd50817de779cacd040_XL.jpg" text="Україна відкрила 19 нових ринків для експорту аграрної продукції за рік" textURL="https://finclub.net/news/ukraina-vidkryla-19-novykh-rynkiv-dlia-eksportu-ahrarnoi-produktsii-za-rik.html "/>
      <News url="https://pictures.ua.tribuna.com/image/d525af1b-ff4c-4e83-ad62-12d44b86380a?width=1260&quality=70" text="S1mple: «З завтрашнього дня починаю набирати форму до наступного сезону»" textURL="https://ua.tribuna.com/uk/cybersport/1000000304804-s1mple-z-zavtrashnoho-dnya-pochynayu-nabyraty-formu-do-n/"/>
    </>
  )
}

export default App
