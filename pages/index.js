import Head from 'next/head';
import React, { useState, Component } from 'react';
import fetch from 'isomorphic-unfetch';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { Tabs, TabList, TabPanels, Tab, TabPanel, theme } from "@chakra-ui/core";
import {ThemeProvider, Heading, Flex, ButtonGroup, Box, Button, CSSReset,Text} from "@chakra-ui/core";
import {RiPlantLine, RiBaiduLine, RiEmotionLine, RiFlashlightLine} from "react-icons/ri";
import {BiCameraMovie} from "react-icons/bi"


export default class reactApp extends Component{
  constructor() {
    super()
    this.state = {
      contents: "open",
      category: "",
      index: 0,
      data: Object,
    }
  }

  componentDidMount() {
    fetch('https://opentdb.com/api.php?amount=50&type=multiple')
    .then((response) => response.json())
    .then(booksList => {
        this.setState({ data: booksList});
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if ((prevState.category !== this.state.category) || this.state.index == 48) {
      fetch('https://opentdb.com/api.php?amount=50'+ this.state.category + '&type=multiple')
      .then((response) => response.json())
      .then(booksList => {
          this.setState({ data: booksList, index: 0});
      });
    }
  }

  render() {
  
    if (this.state.contents == "open") return (
      <div className="container">
        <Head>
          <title>trivia fun!</title>
          <link href="https://fonts.googleapis.com/css2?family=Zilla+Slab:wght@500;600&display=swap" rel="stylesheet"></link>
          <link href="https://fonts.googleapis.com/css2?family=Bitter&display=swap" rel="stylesheet"></link>
        </Head>
  
        <ThemeProvider>
          <CSSReset/>
          <Flex justifyContent="center" flexWrap="wrap" padding="5%">
            <Heading size="2xl" fontFamily="Bitter" letterSpacing="3px">IT'S TRIVIA TIME</Heading>
            <Box width="100%" height="65px"></Box>       
            <Heading fontFamily="Zilla Slab"  size="xl">Pick a Category!</Heading>
            <Box width="100%" height="35px"></Box>
            <Flex flexWrap="wrap" width="60%"flexDirection="column">
              <Button leftIcon={RiFlashlightLine} rightIcon={RiFlashlightLine} color="white" fontFamily="Zilla Slab" fontSize={["14px", "24px", "28px","28px"]} padding="4%" backgroundColor="#D1A857" variant="solid" onClick={() => this.setState({category:"&category=9", contents:"cards"})}> General Knowledge </Button>
              <Box width="100%" height="30px"></Box>
              <Button leftIcon={BiCameraMovie} rightIcon={BiCameraMovie} color="white" fontFamily="Zilla Slab" fontSize={["14px", "24px", "28px","28px"]} padding="4%" backgroundColor="#9075C8" variant="solid" onClick={() => this.setState({category:"&category=14", contents:"cards"})}>Entertainment</Button>
              <Box width="100%" height="30px"></Box>
              <Button leftIcon={RiPlantLine} rightIcon={RiPlantLine} color="white" fontFamily="Zilla Slab" fontSize={["14px", "24px", "28px","28px"]} padding="4%" backgroundColor="#75C88C" variant="solid" onClick={() => this.setState({category:"&category=17", contents:"cards"})}>Science & Nature</Button>
              <Box width="100%" height="30px"></Box>
              <Button leftIcon={RiBaiduLine} rightIcon={RiBaiduLine} color="white" fontFamily="Zilla Slab" fontSize={["14px", "24px", "28px","28px"]} padding="4%" backgroundColor="#C87575" variant="solid" onClick={() => this.setState({category:"&category=27", contents:"cards"})}>Animals</Button>
              <Box width="100%" height="30px"></Box>
              <Button leftIcon={RiEmotionLine} rightIcon={RiEmotionLine} color="white" fontFamily="Zilla Slab" fontSize={["14px", "24px", "28px","28px"]} padding="4%" backgroundColor="#75AAC8" variant="solid" onClick={() => this.setState({category:"", contents:"cards"})}>Mix It Up!</Button>
              </Flex>
            <Box width="100%" height="55px"></Box>
            <Text>Trivia questions taken from Open Trivia Database.</Text>
            </Flex> 
          
        </ThemeProvider>
      </div>
    )
    if (this.state.contents == "cards") return (
      <div className="container">
        <Head>
          <title>trivia fun!</title>
          <link href="https://fonts.googleapis.com/css2?family=Zilla+Slab:wght@500;600&display=swap" rel="stylesheet"></link>
          <link href="https://fonts.googleapis.com/css2?family=Bitter&display=swap" rel="stylesheet"></link>
        </Head>
        <ThemeProvider>
          <CSSReset/>
          <Flex justifyContent="center" flexWrap="wrap" paddingTop="5%" paddingBottom="5%" paddingRight="10%" paddingLeft="10%">
            <Heading fontFamily="Bitter" letterSpacing="3px" size="2xl" onClick={()=> this.setState({contents: "open"})}>IT'S TRIVIA TIME</Heading>
            <Box width="100%" height="100px"></Box>
              <Box width="100%" height="350px">
                <Tabs isFitted variant="unstyled" defaultIndex={0}>
                  <TabList >
                    <Tab fontSize="2xl"  _selected={{ color: "#E0783F", bg: "#FFE1B5" }} fontFamily="Zilla Slab" fontWeight="regular">Question</Tab>
                    <Tab fontSize="2xl" _selected={{ color: "#E0783F", bg: "#FFE1B5" }} fontFamily="Zilla Slab" fontWeight="regular">Answer</Tab>
                  </TabList>
                  <Box width = "100%" height="20px"></Box>
                  <Flex width="100%" justifyContent="center">
                    <TabPanels>
                      <TabPanel>
                        <Box width = "100%" height="80px"></Box>
                        <Heading fontFamily="Zilla Slab" fontWeight="regular">{ReactHtmlParser(this.state.data.results[this.state.index].question)}</Heading>
                      </TabPanel>
                      <TabPanel>
                        <Box width = "100%" height="80px"></Box>
                        <Heading fontFamily="Zilla Slab" fontWeight="regular">{ReactHtmlParser(this.state.data.results[this.state.index].correct_answer)}</Heading>
                      </TabPanel>
                    </TabPanels>
                  </Flex>
                </Tabs>
              </Box>
              <Box width = "100%" height="25px"></Box>
              <Flex width= "100%" justifyContent="space-between">
                <Button color="#E0783F" fontFamily="Zilla Slab" fontSize="2xl" padding="2%" backgroundColor="#FFE1B5" variant="solid" onClick={()=> this.setState({contents: "open"})}>Pick a New Category!</Button>
                <Button color="#E0783F" fontFamily="Zilla Slab" fontSize="2xl" padding="2%" backgroundColor="#FFE1B5" variant="solid" onClick={()=> this.setState({index: this.state.index + 1})}>Next</Button>
              </Flex>
            </Flex>
        </ThemeProvider>
      </div>
    );
  }
}

