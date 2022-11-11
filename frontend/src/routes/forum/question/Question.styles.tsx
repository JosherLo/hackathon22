import styled from "@emotion/styled"

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const MainContainer = styled.div`
  width: 100vw;
  margin: 60px 0 0 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  font-size: 2em;
`

export {
    Container,
    MainContainer,
    Title
}