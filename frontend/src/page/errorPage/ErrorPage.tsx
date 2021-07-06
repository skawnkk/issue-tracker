import styled from 'styled-components';
interface ErrorType {
  errorCode?: number;
}
export default function ErrorPage({ errorCode }: ErrorType) {
  return (
    <ErrorPageBlock>
      <h1>This page isn't working🛠</h1>
    </ErrorPageBlock>
  );
}
const ErrorPageBlock = styled.div`
  padding: 0 80px;
`;
