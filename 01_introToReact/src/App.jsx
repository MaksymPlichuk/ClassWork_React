import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>AC/DC</h1>
      <p>AC/DC is a famous Australian hard rock band, founded in Sydney in December 1973 by brothers Malcolm and Angus Young. They are considered one of the most successful rock bands of all time, having sold over 250 million album copies worldwide.</p>
      <p>Angus Young — lead guitar, co-founder. Malcolm Young — rhythm guitar, co-founder (passed away in 2017). Bon Scott — vocals (classic vocapst, passed away in 1980). Brian Johnson — vocals (replaced Bon Scott). Phil Rudd — drums.</p>
      <p>Famous Albums</p>
      <ol>
        <li>T.N.T. (1975)</li>
        <li>Dirty Deeds Done Dirt Cheap (1976)</li>
        <li> <img width={200} height={200} src="https://upload.wikimedia.org/wikipedia/commons/9/92/ACDC_Back_in_Black.png" alt="" /><br />Back in Black (1980) — their most successful album, selling over 42 million copies outside the US</li>
        <li>Highway to Hell (1979)</li>
        <li>For Those About to Rock We Salute You (1981)</li>
        <li>The Razors Edge (1990)</li>
      </ol>
      <h3>Task 1</h3>
      <h4>Rivne</h4>
      <p>Country: Ukraine, Founded: 1283</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <img width={200} src="https://lh3.googleusercontent.com/gps-cs-s/AG0ilSzsBAvlNbMMrYLLr6IFEYOicL0JBLyreh0G9zeeOLISVni1w4g4leV1h8Rosq4bovTHrEO_ESoVhqhuc67FQFx9abfoP1AUWb0yft_73gatJ-O8ee84SY6T8nP3ckkZzCHCdqyCrw=w675-h390-n-k-no" alt="museum" />
        <img width={200} src="https://dovkola.media/wp-content/uploads/2022/10/i129069.jpeg" alt="theather" />
        <img width={200} src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/%D0%A0%D0%BE%D0%B2%D0%BD%D0%BE._%D0%9F%D0%BE%D0%BA%D1%80%D0%BE%D0%B2%D1%81%D0%BA%D0%B8%D0%B9_%D1%81%D0%BE%D0%B1%D0%BE%D1%80..JPG/330px-%D0%A0%D0%BE%D0%B2%D0%BD%D0%BE._%D0%9F%D0%BE%D0%BA%D1%80%D0%BE%D0%B2%D1%81%D0%BA%D0%B8%D0%B9_%D1%81%D0%BE%D0%B1%D0%BE%D1%80..JPG" alt="sobor" />
        <img width={200} src="https://24.rv.ua/wp-content/uploads/2023/08/78989-0986.webp" alt="enrty" />
      </div>

      <h3>Task 2</h3>
      <h4>Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones.</h4>
      <p><img width={200} src="https://shop.dinternal-education.ua/store-uploads/products/product/2023/11/28/9781847941831.jpg" alt="book" /> <br />Author: James Clear.</p>
      <p>Genre: Psychology, self-improvement, non-fiction (productivity and behavior change).</p>
      <p>Number of pages: The standard print edition contains 320 pages. </p>
      <h5>Reviews</h5>
      <ul>
        <li>Mark Manson (author of The Subtle Art of Not Giving a F*ck): “An extremely practical and useful book. James Clear has distilled the most fundamental information about habit formation so that you can achieve more by focusing on less.”</li>
        <li>Financial Times: “This is a step-by-step guide to changing your routine... Inspiring real-life success stories.”</li>
        <li>Adam Grant (author of Originals): “James Clear has spent years studying the science of habits. This engaging, practical book is exactly the guide you need to break bad habits and form good ones.”</li>
      </ul>

      <h3>Task 3</h3>
      <h4>The Da Vinci Code</h4>
      <p> <img width={200} src="https://m.media-amazon.com/images/M/MV5BN2Y1OTlmYjItZTQ4YS00YTYwLTlmNjAtNmE3ZjM0OGM2NjMzXkEyXkFqcGc@._V1_.jpg" alt="movie" /> <br />Director's full name: Ron Howard</p>
      <p>Year of release: 2006 (world and Ukrainian premiere took place in May 2006).</p>
      <p>Film studio: Columbia Pictures, Imagine Entertainment, Skylark Productions.</p>

      <h3>Task 4</h3>
      <h4>Ivan Franko</h4>
      <img width={200} src="data:image/jpeg;base64,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" alt="franko" />
      <p>Ivan Franko (1856–1916) was a prominent Ukrainian writer, poet, scholar, public figure, and political activist. Known as one of the most influential figures in Ukrainian literature, his contributions span a wide range of genres, including poetry, prose, drama, and literary criticism</p>
      <h5>Early Life and Education</h5>
      <p>Ivan Franko was born on August 27, 1856, in the village of Nahuyevychy in Galicia, then part of the Austrian Empire (now in western Ukraine). He came from a peasant family, and his early life was marked by poverty. Despite these hardships, Franko demonstrated exceptional intellectual ability from a young age. He enrolled at the University of Lviv in 1875, where he initially studied law but later shifted to the philosophy and philology departments.</p>
      <h5>The Poet, The Scholar, and The Political Activist</h5>
      <p>As a poet, Franko became known for his mastery of various poetic forms, from sonnets to narrative verse. His poetry, which often dealt with themes of love, patriotism, and social justice, was imbued with a deep sense of Ukrainian national consciousness. One of his most famous poems, Kamenyari (The Crushers), is a symbol of Ukrainian struggle and the poet’s commitment to national freedom.</p>
    </>
  )
}

export default App
