import styled from "styled-components";

export const DivContainerHeader = styled.div`
  height: 6vh;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  box-shadow: 0 0.5px 0 0 rgba(0, 0, 0, 0.25);
  position: relative;

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;

    p {
      font-size: 16px;
      color: black;
    }
  }
`;

export const ImageBack = styled.img`
  padding: 2%;
  position: absolute;
  left: 0;

`;
