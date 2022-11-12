import styled from "@emotion/styled";

const LoginContainer = styled.div`
  width: 100vw;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const LogoDiv = styled.div`
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LogoImg = styled.img`
  height: 100%;
`;

export { LoginContainer, LogoDiv, LogoImg };
