import {render, screen, fireEvent} from "@testing-library/react";
import {Tab, TabContext} from "./Tab";

describe("Tab component", () => {
  describe("TabContainer", () => {
    it("renders without error", () => {
      const {container} = render(
        <Tab.Container defaultTabId="tab1" className="test-classname">
          <Tab.Triggers>
            <Tab.Trigger tabId="tab1">Tab 1</Tab.Trigger>
            <Tab.Trigger tabId="tab2">Tab 2</Tab.Trigger>
          </Tab.Triggers>
          <Tab.Panels>
            <Tab.Panel tabId="tab1">Content 1</Tab.Panel>
            <Tab.Panel tabId="tab2">Content 2</Tab.Panel>
          </Tab.Panels>
        </Tab.Container>
      );
      expect(container).toBeInTheDocument();
    });

    it("renders children with props and className", () => {
      const {container} = render(
        <Tab.Container defaultTabId="tab1" className="test-classname">
          <Tab.Triggers className="test-classname-1">
            <Tab.Trigger className="test-classname-2" tabId="tab1">
              Tab 1
            </Tab.Trigger>
            <Tab.Trigger className="test-classname-2" tabId="tab2">
              Tab 2
            </Tab.Trigger>
          </Tab.Triggers>
          <Tab.Panels className="test-classname-3">
            <Tab.Panel className="test-classname-4" tabId="tab1">
              Content 1
            </Tab.Panel>
            <Tab.Panel className="test-classname-4" tabId="tab2">
              Content 2
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Container>
      );

      expect(container.querySelector(".test-classname")).toBeInTheDocument();
      expect(container.querySelector(".test-classname-1")).toBeInTheDocument();
      expect(container.querySelector(".test-classname-2")).toBeInTheDocument();
      expect(container.querySelector(".test-classname-3")).toBeInTheDocument();
      expect(container.querySelector(".test-classname-4")).toBeInTheDocument();
    });
  });

  describe("TabTriggers", () => {
    it("should render children", () => {
      const children = [
        <Tab.Trigger key="tab1" tabId="tab1">
          Tab 1
        </Tab.Trigger>,
        <Tab.Trigger key="tab2" tabId="tab2">
          Tab 2
        </Tab.Trigger>,
        <Tab.Trigger key="tab3" tabId="tab3">
          Tab 3
        </Tab.Trigger>,
      ];
      const {getAllByText} = render(<Tab.Triggers>{children}</Tab.Triggers>);
      expect(getAllByText(/tab [1-3]/i)).toHaveLength(3);
    });

    it("should pass className prop to the rendered element", () => {
      const className = "test-class";
      const children = [
        <Tab.Trigger key="tab1" tabId="tab1">
          Tab 1
        </Tab.Trigger>,
        <Tab.Trigger key="tab2" tabId="tab2">
          Tab 2
        </Tab.Trigger>,
        <Tab.Trigger key="tab3" tabId="tab3">
          Tab 3
        </Tab.Trigger>,
      ];
      const {container} = render(<Tab.Triggers className={className}>{children}</Tab.Triggers>);
      expect(container.firstChild).toHaveClass(className);
    });
  });

  describe("TabTrigger", () => {
    it("renders without error", () => {
      const {container} = render(
        <Tab.Container defaultTabId="tab1">
          <Tab.Triggers>
            <Tab.Trigger tabId="tab1">Tab 1</Tab.Trigger>
          </Tab.Triggers>
          <Tab.Panels>
            <Tab.Panel tabId="tab1">Content 1</Tab.Panel>
          </Tab.Panels>
        </Tab.Container>
      );
      expect(container).toBeInTheDocument();
    });

    it("adds 'active' class when tab is active", () => {
      const {getByText} = render(
        <Tab.Container defaultTabId="1">
          <Tab.Triggers>
            <Tab.Trigger tabId="1">Tab 1</Tab.Trigger>
          </Tab.Triggers>
          <Tab.Panels>
            <Tab.Panel tabId="1">Panel 1</Tab.Panel>
          </Tab.Panels>
        </Tab.Container>
      );
      const trigger = getByText("Tab 1");
      const panel = getByText("Panel 1");
      expect(trigger).toHaveClass("active");
      expect(panel).toHaveClass("active");
    });

    it("calls setActiveTab when clicked", () => {
      const setActiveTab = jest.fn();
      const {getByText} = render(
        <TabContext.Provider value={{activeTab: "2", setActiveTab}}>
          <Tab.Triggers>
            <Tab.Trigger tabId="1">Tab 1</Tab.Trigger>
          </Tab.Triggers>
        </TabContext.Provider>
      );
      const trigger = getByText("Tab 1");
      fireEvent.click(trigger);
      expect(setActiveTab).toHaveBeenCalledWith("1");
    });

    it("merges className props with 'active' class when tab is active", () => {
      const {getByText} = render(
        <Tab.Container defaultTabId="1">
          <Tab.Triggers>
            <Tab.Trigger className="custom-class" tabId="1">
              Tab 1
            </Tab.Trigger>
          </Tab.Triggers>
          <Tab.Panels>
            <Tab.Panel tabId="1">Panel 1</Tab.Panel>
          </Tab.Panels>
        </Tab.Container>
      );
      const trigger = getByText("Tab 1");
      expect(trigger).toHaveClass("custom-class");
      expect(trigger).toHaveClass("active");
    });
  });

  describe("TabPanels", () => {
    it("should render TabPanels with className", () => {
      render(
        <Tab.Panels className="panel-custom-class">
          <Tab.Panel tabId="1">Panel 1</Tab.Panel>
          <Tab.Panel tabId="2">Panel 2</Tab.Panel>
        </Tab.Panels>
      );

      const tabPanelsElement = screen.getByRole("tabpanels");
      expect(tabPanelsElement).toBeInTheDocument();
      expect(tabPanelsElement).toHaveClass("panel-custom-class");
    });

    it("should render child components TabPanel with class active when selected", () => {
      const {getByRole, getByText} = render(
        <Tab.Container defaultTabId="1">
          <Tab.Triggers>
            <Tab.Trigger tabId="1">Tab 1</Tab.Trigger>
            <Tab.Trigger tabId="2">Tab 2</Tab.Trigger>
          </Tab.Triggers>
          <Tab.Panels>
            <Tab.Panel tabId="1">Panel 1</Tab.Panel>
            <Tab.Panel tabId="2">Panel 2</Tab.Panel>
          </Tab.Panels>
        </Tab.Container>
      );

      const tabPanelsElement = getByRole("tabpanels");
      const firstTabTriggerElement = getByText("Panel 1");
      const secondTabTriggerElement = getByText("Tab 2");
      const firstTabPanelElement = getByText("Panel 1");
      const secondTabPanelElement = getByText("Panel 2");

      expect(tabPanelsElement).toBeInTheDocument();
      expect(firstTabTriggerElement).toBeInTheDocument();
      expect(secondTabTriggerElement).toBeInTheDocument();
      expect(firstTabPanelElement).toBeInTheDocument();
      expect(secondTabPanelElement).toBeInTheDocument();

      expect(firstTabTriggerElement).toHaveClass("active");
      expect(secondTabTriggerElement).not.toHaveClass("active");
      expect(firstTabPanelElement).toHaveClass("active");
      expect(secondTabPanelElement).not.toHaveClass("active");

      fireEvent.click(secondTabTriggerElement);
      expect(firstTabTriggerElement).not.toHaveClass("active");
      expect(secondTabTriggerElement).toHaveClass("active");
      expect(firstTabPanelElement).not.toHaveClass("active");
      expect(secondTabPanelElement).toHaveClass("active");
    });
  });

  describe("TabPanel", () => {
    it("should render TabPanel with className", () => {
      render(
        <Tab.Panels>
          <Tab.Panel className="panel-custom-class" tabId="1">
            Panel 1
          </Tab.Panel>
          <Tab.Panel tabId="2">Panel 2</Tab.Panel>
        </Tab.Panels>
      );

      const firstTabPanelElement = screen.getByText("Panel 1");
      const secondTabPanelElement = screen.getByText("Panel 2");
      expect(firstTabPanelElement).toBeInTheDocument();
      expect(firstTabPanelElement).toHaveClass("panel-custom-class");
      expect(secondTabPanelElement).toBeInTheDocument();
    });
  });
});
