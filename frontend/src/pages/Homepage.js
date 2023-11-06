import React from "react";
import {
  Container,
  Box,
  Text,
  Tabs,
  TabPanels,
  TabPanel,
  Tab,
  TabList,
} from "@chakra-ui/react";
import LogIn from "../components/authentication/LogIn";
import SignUp from "../components/authentication/SignUp";
import { useState } from "react";

const Homepage = () => {
  const [activeTab, setActiveTab] = useState(0);

  const changeTab = (index) => {
    setActiveTab(index);
  };

  return (
    <Container maxW={"xl"} centerContent>
      <Box
        display={"flex"}
        justifyContent={"center"}
        p={3}
        bg={"white"}
        w={"100%"}
        m={activeTab === 1 ? "100px 0 15px 0" : "150px 0 15px 0"}
        borderRadius={"lg"}
        borderWidth={"1px"}
      >
        <Text fontSize={"4xl"} fontFamily={"Work sans"}>
          Chat-App
        </Text>
      </Box>
      <Box bg={"white"} w={"100%"} p={4} borderRadius={"lg"} border={"1px"}>
        <Tabs variant="soft-rounded">
          <TabList mb={"1em"}>
            <Tab w={"50%"} onClick={() => changeTab(0)}>
              LogIn
            </Tab>
            <Tab w={"50%"} onClick={() => changeTab(1)}>
              SignUp
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <LogIn />
            </TabPanel>
            <TabPanel>
              <SignUp />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Homepage;
