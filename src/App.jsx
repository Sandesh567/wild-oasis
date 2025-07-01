import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Heading from "./ui/Heading";
const StyledApp = styled.div`
  background-color: orangered;
  padding: 20px;
`;

function App() {
  return (
    <>
      {/* when inspect it will show the same h1 tag in all but our type is different 
    so to fix that styled components provides us "as" prop. as prop will be the element 
    that will be rendered in the element  */}
      <GlobalStyles />
      <StyledApp>
        <Heading as="h1">The Wild Oasis</Heading>
        <Heading as="h2">Check in and out</Heading>

        <Button onClick={() => alert("Check In")}>Check In</Button>
        <Button onClick={() => alert("Check out")}>Check out</Button>
        <Heading as="h3">Form</Heading>

        <Input type="number" placeholder="Number of Guests" />
        <Input type="number" placeholder="Number of Guests" />
      </StyledApp>
    </>
  );
}

export default App;
