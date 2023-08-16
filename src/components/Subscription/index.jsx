import React from 'react'
import SubscriptionCard from './SubscriptionCard';
import { styled } from 'styled-components';
import Navbar from '../Navbar';

const MainDiv = styled.div`
    display: flex;
    justify-content: center;
    gap: 50px;
    margin-top: 30px;
`;

function Subscription() {
    
  return (
    <>
    <Navbar/>
    <MainDiv>
        <SubscriptionCard count={3} />
        <SubscriptionCard count={5} />
        <SubscriptionCard count={10} />
    </MainDiv>
    </>
  )
}

export default Subscription;