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
      <ul>
        <li>Angus Young — lead guitar, co-founder.</li>
        <li>Malcolm Young — rhythm guitar, co-founder (passed away in 2017).</li>
        <li>Bon Scott — vocals (classic vocalist, passed away in 1980).</li>
        <li>Brian Johnson — vocals (replaced Bon Scott).</li>
        <li>Johny Sins — bass guitar.</li>
        <li>Phil Rudd — drums.</li>
      </ul>
      <p>Famous Albums</p>
      <ul>
        <li>T.N.T. (1975)</li>
        <li>Dirty Deeds Done Dirt Cheap (1976)</li>
        <li> <img width={200} height={200} src="https://upload.wikimedia.org/wikipedia/commons/9/92/ACDC_Back_in_Black.png" alt="" /><br/>Highway to Hell (1979)</li>
        <li>Back in Black (1980) — their most successful album, selling over 42 million copies outside the US</li>
        <li>For Those About to Rock We Salute You (1981)</li>
        <li>The Razors Edge (1990)</li>
      </ul>
    </>
  )
}

export default App
