import { Button } from 'antd'

const Home = () => {
  const navigate = useNavigate()

  return (
    <>
      <Button type="primary" onClick={() => navigate('/home-detail')}>
        navigate to 404
      </Button>
      <Button danger onClick={() => navigate('/inspection-detail')}>
        navigate to inspection-detail
      </Button>
    </>
  )
}

export default Home
