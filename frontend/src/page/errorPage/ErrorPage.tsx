interface ErrorType {
  errorCode: number;
}
export default function ErrorPage({ errorCode }: ErrorType) {
  console.log(errorCode);
  return <div>에러에요!!</div>;
}
