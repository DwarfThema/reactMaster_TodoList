import styled from "styled-components"
import { useLocation, useParams } from "react-router"
import { useState } from "react"

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
    
`
const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Title = styled.h1`
    font-size: 48px;
    font-weight: 600;
    color: ${p => p.theme.pointColor};
`
const Contents = styled.div`
`

const Loading = styled.div`
`

interface RouterState {
    name: string;
}

function Coin() {
    const { coinId } = useParams()

    const location = useLocation()
    const name = location.state as RouterState

    const [loadingNow, loadingNext] = useState(true)

    return <Container>
        <Header>
            <Title>{name}</Title>
        </Header>
        {loadingNow ? <Loading>Loading...</Loading> : <Contents>coin : {coinId}</Contents>}</Container>
}

export default Coin