import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import { CardActionArea } from '@mui/material'
import { useState } from 'react'
import './PageCard.scss'

type Props = {
  title: string
  description: string
  imageURL: string
  onClick: () => void
  index: string
}

export default function PageCard(props: Props) {
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }
  const { title, imageURL, onClick, index } = props
  return (
    <Card
      onClick={onClick}
      sx={{ maxWidth: 365 }}
      className={`page-card ${isHovered ? `page-card-hovered-${index}` : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <CardActionArea>
        <CardMedia component="img" className="page-card-img" height="140" image={imageURL} alt="" />
        <CardContent>
          <h2 style={{ textAlign: 'center', margin: '30px 0' }}>{title}</h2>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
