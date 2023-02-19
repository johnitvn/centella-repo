import {Button} from "@centella/react-tw-button";
import {Card} from "@centella/react-tw-card";
import {ThemeConsumer, ThemeProvider} from "@centella/react-tw-core";
import {NavBar} from "../components/Navbar";
import {Page} from "../components/Page";
import {Sidebar} from "../components/Sidebar";
import {theme} from "../theme";

export default function Home() {
  return (
    <ThemeProvider value={theme}>
      {/* <ThemeConsumer>
        {(context) => {
          console.log(context);
          return <></>;
        }}
      </ThemeConsumer> */}
      <Page>
        <NavBar />

        <div className="container mx-auto mt-16 h-full">
          <Sidebar />

          <main>
            <Button></Button>
          </main>
        </div>
      </Page>
    </ThemeProvider>
  );
}
