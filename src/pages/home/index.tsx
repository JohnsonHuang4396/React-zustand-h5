import { FC } from 'react'

const Home: FC = () => {
  const arr = new Array(1000).fill(11)

  return (
    <>
      {arr.map(item => (
        <div key={item}>{item}</div>
      ))}
    </>
  )
}

export default Home
