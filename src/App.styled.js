import styled from 'styled-components';
import mapBackground from '../src/images/map-background.png';

// Create a styled component
const Header = styled.header`
  margin: 0 auto;
  padding: 5px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  #home{
    width:90%;
  
  }
  
`;

// header li styling
const ListItem = styled.li`
  list-style: none;
  font-size: 130%;
  font-weight: light;
  width: fit-content;
  height: max-content;
  padding: 10px 20px 10px 20px;
  margin-inline: 0px;
  
`;

const Icon = styled.i`
  margin-inline: 2px;
`;

const FirstSection = styled.div`
  height: 90vh;
  display:flex;
  align-items:center;
  justify-content:space-evenly;
  flex-direction:row;
  flex-wrap:no-wrap;
  padding: 0px 5% 10px 5%;
  margin: 0 auto;
  position:relative;

  background: linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)),url(${mapBackground});
  background-position: top;
  background-size: contain;
  background-repeat: repeat;
  opacity: 5;
  background-clip:content-box;

  i{
    margin-right:5px;
  }
  section{
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:center;
    gap:5px;
    height:fit-content;
    width:fit-content;
    margin 0 auto;
    padding:0 ;
   
  }

  @media screen and (max-width: 900px) {
    flex-direction:column;
   
  }
`;

const FirstDiv = styled.div`
  width: 65%;
  height:100%;
  display:flex;
  align-items:flex-start;
  justify-content:center;
  flex-direction:column;
  position:relative;
  padding:-50% 0px 0px 0px ;

.location{
  position:absolute;
  top:0;
  left:0;
}
  div:nth-of-type(1){
    width:100%;
    height:60%;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    
 

  }
  div:nth-of-type(1) section{
    display:flex;
    align-items:center;
    flex-direction:column;
    justify-content:center;
    margin:-1% 0px 0px 0px ;
    
  }
div:nth-of-type(1) section h1{
  font-size:300%;
  margin:0%;
  font-weight:bold;

}
div:nth-of-type(1) section h4{
  font-size:120%;
  margin:0%;
  color:gray;
  font-weight:thin;
}

  div:nth-of-type(2){
    width:100%;
    height:40%;
    display:flex;
    flex-direction:row;
    align-items:center;
    gap:0px;
    justify-content:center;
  }
  div:nth-of-type(1) img{
      height:70%;
      width:auto;
      margin:0px;

      padding:0px;
  }
  .section section{
    width:30%;
    height:100%;
    display:flex;
    align-items:center;
    flex-direction:column;
    justify-content:center;

  }
  .section section img{
    width:50%;
    height:auto;
  }
  .section section h2{
    margin:-10px 0px 0px 0px;
  }
  .section section p{
    margin:0px;
  }

  
`;

const SecondDiv = styled.div`
  width: 30%;
  height:60%;
  background: rgba(255, 255, 255, 0.07);
  border-radius: 10px; 
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 
  padding:5%;
  /* Blur effect */
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px); /* For older browsers */
    position:relative;
  display:flex;
  flex-wrap:wrap;
  align-items:center;
  justify-content:space-around;
  gap:10px;

 @media screen and (max-width: 900px) {
  width:90%;
  height:fit-content;
  padding-block:100px;
 }

  section{    
    width:40%;
    height:auto;
    padding:0 auto;
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction:column;
    margin:0 auto;
  }
  section h1{
      margin:10px 0px 0px 0px ;
      font-size:120%;
      fontweight:bold;
    
  }
  section h2{
    margin:0px;
    font-size:105%;
    color:gray;
    font-weight:thin;
}
hr{
  height:0.5px;
  width:30%;
  transform:rotate(90deg);
  position:absolute;
  top:50%;
  left:0;
  bottom:50%;
  right:0;
  border-radius:20px;
  color:gray;
  
}
> i{
  position:absolute;
  left:47%;
  top:10%;
  right:50%;
  font-size:300%;
  color:gray;
}
section i{
  margin-right:5px;
}
 
`;

// Export the styled components
export { Header, ListItem, Icon, FirstSection, FirstDiv, SecondDiv };
