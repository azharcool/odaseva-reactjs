import styled, { css } from 'styled-components';

export const RootJunction = styled.div`
cursor: pointer;
${p => p.check === true ?
    css`
      position: absolute;
      left:236.5px;
      width: 16px;
      height: 16px;
      display: flex;
      margin-top: 15px;
      margin-bottom: 15px;
      border-radius: 360px;
       border-width: 2px;
       border-style: solid;
       border-color: ${p.blueJunction === true ? '#346DFF' : '#e1e4ec'};
       background-color: #F5F8FF;


      :before {
        content: "";
        display: block;
        width: 10.5px;
        left: -99%;
        height: 2px;
        background-color:  ${p.blueJunction === true ? '#346DFF' : '#e1e4ec'};
        position: absolute;
        top: 50%;
        } 
` :
    css`
    position: absolute;
    left:233.5px;
    border-radius: 360px;
    display: flex;
    margin-top: 15px;
    margin-bottom: 15px;
    justify-content: center;
    align-items: center;
    background-color: #346DFF ;
    width:22px;
    height: 22px;
    display: flex;
   
  :before {
      content: "";
      display: block;
      width:7px;
      height: 2px;
      background-color: #e1e4ec;
      position: absolute;
      left: -7px;
      top: 50%;
      }

    &:hover {
       background-color:  #0031AE
       }
  `
  }
 
`;

export const Junction = styled.div`
cursor: pointer;
${p => p.check === true ?
    css`
     position: absolute;
    left:${p => p.left} ;
    border-radius: 360px;
     border-width: 2px;
    border-style: solid;
      border-color: ${p.blueJunction === true ? '#346DFF' : '#e1e4ec'};

    display: flex;
    margin-top: 10px;
    justify-content: center;
    align-items: center;

    background-color: #F5F8FF;
    width:  16px;
    height: 16px;

  :before {
      content: "";
      display: block;
      width: 25px;
      height:2px;
      background-color:  ${p.blueJunction === true ? '#346DFF' : '#e1e4ec'};
      position: absolute;
      left: -25px;
      top: 50%;
      }
` :
    css`
    position: absolute;
     left:${p => p.left};
    border-radius: 360px;
    display: flex;
    margin-top: 10px;
    justify-content: center;
    align-items: center;
    background-color:${p => p.queryMode === 'Parent' ? '#17B1A4' : '#346DFF'} ;
    width:22px;
    height: 22px;
    display: flex;

  :before {
      content: "";
      display: block;
      width:20px;
      height: 2px;
      background-color: #e1e4ec;
      position: absolute;
      left: -20px;
      top: 50%;
      }

   &:hover {
       background-color: ${p => p.queryMode === 'Parent' ? '#03887D' : '#0031AE'};
    }
  `
  }
  
`;

