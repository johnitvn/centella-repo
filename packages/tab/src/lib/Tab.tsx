import {WithClassNameProps, classMerge} from "@centella/react-tw-core";
import {useState, createContext, useContext, ReactNode, ReactElement, JSXElementConstructor} from "react";

type TabContextType = {
  activeTab: string;
  setActiveTab: (tabId: string) => void;
};

type TabContainerProps = WithClassNameProps & {
  children: [
    ReactElement<typeof TabTriggers, JSXElementConstructor<TabTriggersProps>>,
    ReactElement<typeof TabPanels, JSXElementConstructor<TabPanelProps>>
  ];
  defaultTabId: string;
};

type TabTriggersProps = WithClassNameProps & {
  children:
    | ReactElement<typeof TabTrigger, JSXElementConstructor<TabTriggerProps>>
    | ReactElement<typeof TabTrigger, JSXElementConstructor<TabTriggerProps>>[];
};

type TabTriggerProps = WithClassNameProps & {
  children: ReactNode | ReactNode[];
  tabId: string;
};

type TabPanelsProps = WithClassNameProps & {
  children:
    | ReactElement<typeof TabPanel, JSXElementConstructor<TabPanelProps>>
    | ReactElement<typeof TabPanel, JSXElementConstructor<TabPanelProps>>[];
};

type TabPanelProps = WithClassNameProps & {
  children: ReactNode | ReactNode[];
  tabId: string;
};

export const TabContext = createContext<TabContextType>({
  activeTab: "",
  setActiveTab: () => {},
});

const TabContainer = ({children, defaultTabId, className}: TabContainerProps) => {
  const [activeTab, setActiveTab] = useState(defaultTabId || "");
  return (
    <TabContext.Provider value={{activeTab, setActiveTab}}>
      <div role="tab" className={classMerge(className)}>
        {children}
      </div>
    </TabContext.Provider>
  );
};

const TabTriggers = ({children, className}: TabTriggersProps) => (
  <div role="tablist" className={classMerge("flex", className)}>
    {children}
  </div>
);

const TabTrigger = ({children, className, tabId}: TabTriggerProps) => {
  const {activeTab, setActiveTab} = useContext(TabContext);
  const handleClick = () => {
    setActiveTab(tabId);
  };
  return (
    <div role="tab" className={classMerge(className, activeTab === tabId ? "active" : "")} onClick={handleClick}>
      {children}
    </div>
  );
};

const TabPanels = ({children, className}: TabPanelsProps) => (
  <div role="tabpanels" className={classMerge(className)}>
    {children}
  </div>
);

const TabPanel = ({children, className, tabId}: TabPanelProps) => {
  const {activeTab} = useContext(TabContext);
  return (
    <div
      role="tabpanel"
      className={classMerge(className, activeTab === tabId ? "active" : "hidden")}
      data-tab-id={tabId}
    >
      {children}
    </div>
  );
};

export const Tab = {
  useTab: () => useContext(TabContext),
  Container: TabContainer,
  Triggers: TabTriggers,
  Trigger: TabTrigger,
  Panels: TabPanels,
  Panel: TabPanel,
};
