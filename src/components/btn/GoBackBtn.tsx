import { Link } from 'react-router-dom'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn'

export default function GoBackBtn() {
  return (
    <>
      <Link to="..">
        <KeyboardReturnIcon className="return-icon" />
      </Link>
    </>
  )
}
