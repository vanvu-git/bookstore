import { mobile } from "../responsive";
import styled from "styled-components";

const Row = styled.div`
  display: flex;
  align-items: flex-start;  
  justify-content: flex-start;
`;

const LeftCol = styled.div`
  flex: 25%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: sticky;
  top: 10px;
`;
const RightCol = styled.div`
  flex: 75%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  background: linear-gradient(50deg, #f3c680, hsla(179,54%,76%,1));
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 80%;
  height: 90vh;
  margin: 0 auto;
  background-color: white ;
  display: flex;
  padding: 10px;
  border-radius: 25px;
  box-shadow: 0 0 0 gray, 
  0 0 0 transparent, 8px 8px 15px gray; 
`;

const AvatarContainer = styled.div`
  width:80%;
  height: 30%;
  align-items: center;
  background: white;
  justify-content: center;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid gray;
  border-radius: 25px;
  box-shadow: 0 0 0 gray, 
  0 0 0 transparent, 8px 8px 15px gray; 
  padding: 20px 10px;
  
 
`;
const OptionContainer = styled.div`
  margin: 5vh 0vh;
  width:80%;
  height: 60%;
  align-items: center;
  background: white;
  justify-content: center;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid gray;
  border-radius: 25px;
  box-shadow: 0 0 0 gray, 
  0 0 0 transparent, 8px 8px 15px gray; 
  padding: 50px 10px;
 
 
`;


const Avatar = styled.img`
  border-radius: 50%;
  width: 6em;
  height: 6em;
`;
const Name = styled.span`
    padding-top: 20%;
    font-size: 18px;
`;

const Option = styled.div`
  width: 100%;
  padding: 10px 0px;
  border-bottom: 1px solid gray;
  &:hover {
    background: #D3D3D3;
  }
  &:active {
    background: #007bff;
  }
`;
const ContentContainer = styled.div`
    width: 90%;
    height: 90vh;
    margin: 5vh 0vh 0vh 0vh;
    
    background-color: white ;
    display: flex;
    padding: 10px;
    border-radius: 25px;
    box-shadow: 0 0 0 gray, 
    0 0 0 transparent, 8px 8px 15px gray; 

`;



export default function ProfilePage() {
  return (
   <Container>
      <LeftCol>
        <AvatarContainer>
          <Avatar src="https://www.meme-arsenal.com/memes/dfecd78991b07d583a1230fbe57c398f.jpg"></Avatar>
          <Name>Trần Đại Phát</Name>
        </AvatarContainer>
        <OptionContainer>
          <Option>Thông tin cá nhân</Option>
          <Option>Đổi mật khẩu</Option>
          <Option>Lịch sử đặt hàng</Option>
          <Option>Logut</Option>
        </OptionContainer>
      </LeftCol>
      <RightCol>
        <ContentContainer></ContentContainer>
      </RightCol>
    </Container>
  );
}