import styled from "@emotion/styled";

export const InputField = styled.input`
  outline: none;
  border: none;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 20px;
  -webkit-box-shadow: 0px 0px 8px 1px rgba(0, 19, 251, 0.2);
  -moz-box-shadow: 0px 0px 8px 1px rgba(0, 19, 251, 0.2);
  box-shadow: 0px 0px 8px 1px rgba(0, 19, 251, 0.2);
  width: 50%;
  font-size: 17px;
  font-family: 'Roboto', sans-serif;
  transition: box-shadow .3s ease-in-out;
  &::placeholder {
    text-align: center;
    font-size: 17px;
    font-family: 'Roboto', sans-serif;
  }
  &:focus {
    -webkit-box-shadow: 0px 0px 8px 10px rgba(0, 112, 48, 0.2);
    -moz-box-shadow: 0px 0px 8px 10px rgba(0, 112, 48, 0.2);
    box-shadow: 0px 0px 8px 10px rgba(0, 112, 48, 0.2);
  }
`