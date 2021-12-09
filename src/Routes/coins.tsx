import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"


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

const Contents = styled.ul`
`
const CoinInfo = styled.li`  background-color: white;
  color: ${(props) => props.theme.bgColor};
  border-radius: 15px;
  margin-bottom: 10px;
  a {
      display: flex;
    padding: 20px;
    transition: color 0.2s ease-in;
    align-items: center;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.pointColor};
    }
  }
`

const Loading = styled.div`
`

const Img = styled.img`
    height: 25px;
    margin-right: 10px;
`

interface CoinInterface {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
}

function Coins() {
    const [coinInfoNow, coinInfoNext] = useState<CoinInterface[]>([])
    const [loadingNow, loadingNext] = useState(true)

    useEffect(() => {
        (async () => {
            const json = (await (await fetch("https://api.coinpaprika.com/v1/coins")).json())
            coinInfoNext(json.slice(0, 100))
            loadingNext(false)
        })()
    }, [])



    return (
        <Container>
            <Header>
                <Title>코인</Title>
            </Header>
            {loadingNow ? <Loading>Loading...</Loading> : <Contents>
                {coinInfoNow.map(coin => <CoinInfo key={coin.id}>
                    <Link to={`/${coin.id}`} state={{name:coin.name}}  >
                        <Img src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} />
                        {coin.name} &rarr;
                    </Link>
                </CoinInfo>)}
            </Contents>}
        </Container >)
}

export default Coins