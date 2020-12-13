import { Button } from 'react-bootstrap'
import s from 'styled-components'

export const Wrapper = s.div`
  width: 60%;
  padding: 3rem;
  margin: auto;
  margin-top: 3rem;
  border-radius: 15px;
  border: 2px solid blue;
`

export const StyledButton = s(Button)`
  width: 100%;
  margin-top:1rem;
`