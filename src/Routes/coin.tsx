import styled from "styled-components"
import { Route, Routes, useLocation, useMatch, useParams } from "react-router"
import { useEffect, useState } from "react"
import Chart from "./Chart";
import Price from "./Price";
import { Link } from "react-router-dom";


const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;

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

const Loading = styled.div`
`

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{activated:boolean}>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${p=>p.activated?p.theme.pointColor:p.theme.textColor};
  a{
    display: block;
  }
`;

  
  interface ILocation {
    state:{
    name:string;
    };
    }

    
    interface IInfoDate{
      id:string;
      name:string;
      symbol:string;
      rank:number;
      is_new:boolean;
      is_active:boolean;
      type:string;
      contract:string;
      platform:string;
      description:string;
      message:string;
      open_source:boolean;
      started_at:string;
      development_status:string;
      hardware_wallet:boolean;
      proof_type:string;
      org_structure:string;
      hash_algorithm:string;
      first_data_at:string;
      last_data_at:string;
    }

    interface IPriceData {
      id: string;
      name: string;
      symbol: string;
      rank: number;
      circulating_supply: number;
      total_supply: number;
      max_supply: number;
      beta_value: number;
      first_data_at: string;
      last_updated: string;
      quotes: {
        USD: {
          ath_date: string;
          ath_price: number;
          market_cap: number;
          market_cap_change_24h: number;
          percent_change_1h: number;
          percent_change_1y: number;
          percent_change_6h: number;
          percent_change_7d: number;
          percent_change_12h: number;
          percent_change_15m: number;
          percent_change_24h: number;
          percent_change_30d: number;
          percent_change_30m: number;
          percent_from_price_ath: number;
          price: number;
          volume_24h: number;
          volume_24h_change_24h: number;
        };
      };
    }

function Coin() {
    const { coinId } = useParams()
    const [loadingNow, loadingNext] = useState(true)

    const [priceNow, priceNext] = useState<IPriceData>()
    const [infoNow, infoNext] =useState<IInfoDate>()

    const {state} = useLocation() as ILocation;

    const chartMatch = useMatch("/:coinId/chart");
    const priceMatch = useMatch("/:coinId/price");
    

    useEffect(()=>{
      (async()=>{
        const infoData = await (await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json();
        const priceDate = await(await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)).json();
        infoNext(infoData);        
        priceNext(priceDate);
        loadingNext(false)
      })()

    },[coinId])

    return <Container>
        <Header>
        <Title>
          {state?.name ? state.name : loadingNow ? "Loading..." : infoNow?.name}
        </Title>
        </Header>      {loadingNow ? (
        <Loading>Loading...</Loading>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoNow?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${infoNow?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Open Source:</span>
              <span>{infoNow?.open_source ? "Yes" : "No"}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoNow?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{priceNow?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{priceNow?.max_supply}</span>
            </OverviewItem>
          </Overview>

          <Tabs>
            <Tab activated={chartMatch !== null} >
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab activated={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
          </Tabs>

          <Routes>
            <Route path="chart" element={<Chart/>}/>
            <Route path="price" element={<Price/>}/>
          </Routes>
        </>
      )}
      </Container>
}

export default Coin