import { Button } from 'antd'
import { FC } from 'react'

import './index.scss'

const UnDefPage: FC = () => {
  const negative = useNavigate()

  return (
    <Button type="primary" onClick={() => negative('/home')}>
      返回首页
    </Button>
  )
}

export default UnDefPage
