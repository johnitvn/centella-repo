import {Card} from "@centella/react-tw-card";
import {ThemeContext} from "@centella/react-tw-core";
import {NavBar} from "../components/Navbar";
import {Page} from "../components/Page";
import {Sidebar} from "../components/Sidebar";
import {theme} from "../theme";

export default function Home() {
  return (
    <ThemeContext.Provider value={theme}>
      <Page>
        <NavBar />

        <div className="container mx-auto mt-16 h-full">
          <Sidebar />

          <main>
            <Card></Card>
          </main>
        </div>
      </Page>
    </ThemeContext.Provider>
  );
}
