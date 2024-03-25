// @mui
import { styled } from "@mui/material/styles";
// components
import Page from "../components/Page";
// ----------------------------------------------------------------------
const RootStyle = styled("div")(() => ({
  height: "100%",
}));
// ----------------------------------------------------------------------

export default function HomePage() {
  return (
    <Page title="Trang chủ">
      <RootStyle>
        <h1>Home</h1>
      </RootStyle>
    </Page>
  );
}
