import Head from 'next/head';
import React, { useState, Component } from 'react';
import fetch from 'isomorphic-unfetch';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Collapse } from "@chakra-ui/core";
import {ThemeProvider, Heading, Flex, ButtonGroup, Box, Button, CSSReset,Text} from "@chakra-ui/core";
import {RiPlantLine, RiBaiduLine, RiEmotionLine, RiFlashlightLine} from "react-icons/ri";
import {BiCameraMovie, BiCaretDown} from "react-icons/bi"


export default class reactApp extends Component{
  constructor() {
    super()
    this.state = {
      contents: "open",
      category: "",
      index: 0,
      data: Object,
      show: false
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
    const handleToggle = () => this.setState({show: !(this.state.show)})
    if (this.state.contents == "open") return (
      <div className="container">
        <Head>
          <title>trivia fun!</title>
          <link href="https://fonts.googleapis.com/css2?family=Inconsolata:wght@700&display=swap" rel="stylesheet"></link>
          <link href="https://fonts.googleapis.com/css2?family=Karla:wght@700&display=swap" rel="stylesheet"></link>
        </Head>
  
        <ThemeProvider>
          <CSSReset/>
          <Flex justifyContent="center" flexWrap="wrap" padding="5%">
            <Heading size="2xl" fontFamily="Inconsolata" letterSpacing="3px">It's Trivia Time!</Heading>
            <Box width="100%" height="65px"></Box>       
            <Heading fontFamily="Inconsolata"  size="xl">Pick a Category!</Heading>
            <Box width="100%" height="35px"></Box>
            <Flex flexWrap="wrap" width="60%"flexDirection="column">
              <Button leftIcon={RiFlashlightLine} rightIcon={RiFlashlightLine} color="#B77E28" fontFamily="Karla" fontSize={["14px", "24px", "28px","28px"]} padding="4%" backgroundColor="#FFE1A8" variant="solid" onClick={() => this.setState({category:"&category=9", contents:"cards"})}> General Knowledge </Button>
              <Box width="100%" height="30px"></Box>
              <Button leftIcon={BiCameraMovie} rightIcon={BiCameraMovie} color="#7033D3" fontFamily="Karla" fontSize={["14px", "24px", "28px","28px"]} padding="4%" backgroundColor="#B79FE9" variant="solid" onClick={() => this.setState({category:"&category=14", contents:"cards"})}>Entertainment</Button>
              <Box width="100%" height="30px"></Box>
              <Button leftIcon={RiPlantLine} rightIcon={RiPlantLine} color="#3E8E37" fontFamily="Karla" fontSize={["14px", "24px", "28px","28px"]} padding="4%" backgroundColor="#99DBAB" variant="solid" onClick={() => this.setState({category:"&category=17", contents:"cards"})}>Science & Nature</Button>
              <Box width="100%" height="30px"></Box>
              <Button leftIcon={RiBaiduLine} rightIcon={RiBaiduLine} color="#B03E3E" fontFamily="Karla" fontSize={["14px", "24px", "28px","28px"]} padding="4%" backgroundColor="#EBA6A6" variant="solid" onClick={() => this.setState({category:"&category=27", contents:"cards"})}>Animals</Button>
              <Box width="100%" height="30px"></Box>
              <Button leftIcon={RiEmotionLine} rightIcon={RiEmotionLine} color="#3D6E89" fontFamily="Karla" fontSize={["14px", "24px", "28px","28px"]} padding="4%" backgroundColor="#A5CCE2" variant="solid" onClick={() => this.setState({category:"", contents:"cards"})}>Mix It Up!</Button>
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
          <link href="https://fonts.googleapis.com/css2?family=Inconsolata:wght@700&display=swap" rel="stylesheet"></link>
          <link href="https://fonts.googleapis.com/css2?family=Karla:wght@700&display=swap" rel="stylesheet"></link>
        </Head>
        <ThemeProvider>
          <CSSReset/>
          <Flex justifyContent="center" flexWrap="wrap" paddingTop="5%" paddingBottom="5%" paddingRight="10%" paddingLeft="10%">
            <Heading fontFamily="Inconsolata" letterSpacing="3px" size="2xl" onClick={()=> this.setState({contents: "open"})}>It's Trivia Time!</Heading>
            <Box width="100%" height="100px"></Box>
              <Box width="100%"  marginBottom="5%">
                <Tabs isFitted variant="unstyled" defaultIndex={0}>
                  <TabList >
                    <Tab fontSize="2xl"  _selected={{ color: "#E0783F", bg: "#FFE1B5" }} fontFamily="Karla" >Question</Tab>
                    <Tab fontSize="2xl" _selected={{ color: "#E0783F", bg: "#FFE1B5" }} fontFamily="Karla">Answer</Tab>
                  </TabList>
                  <Box width = "100%" height="20px"></Box>
                  <Flex width="100%" justifyContent="center">
                    <TabPanels>
                      <TabPanel>
                        <Flex width="100%" flexWrap="wrap" justifyContent="center">
                          <Box width = "100%" height={["40px", "40px", "80px","80px"]}></Box>
                          <Heading fontFamily="Inconsolata">{ReactHtmlParser(this.state.data.results[this.state.index].question)}</Heading>
                          <Box width = "100%" height={["20px", "20px", "50px","50px"]}></Box>
    <Button color="#E0783F" fontFamily="Karla" fontSize={["14px", "14px", "2xl","2xl"]} padding="2%" variant="link" onClick={handleToggle} rightIcon={BiCaretDown}>Show Answer Choices</Button>
                          <Box width = "100%" height={["10px", "10px", "25px","25px"]}></Box>
                          <Heading fontFamily="Inconsolata" size="lg">
                            <Collapse isOpen={this.state.show}>{ReactHtmlParser(this.state.data.results[this.state.index].correct_answer)}{ ", "}{ReactHtmlParser(this.state.data.results[this.state.index].incorrect_answers.map(option=> " " + option))}</Collapse>
                          </Heading>
                        </Flex>
                      </TabPanel>
                      <TabPanel>
                        <Box width = "100%" height={["40px", "40px", "80px","80px"]}></Box>
                        <Heading fontFamily="Inconsolata">{ReactHtmlParser(this.state.data.results[this.state.index].correct_answer)}</Heading>
                      </TabPanel>
                    </TabPanels>
                  </Flex>
                </Tabs>
              </Box>
              <Box width = "100%" height="25px"></Box>
              <Flex width= "100%" justifyContent="space-between">
                <Button color="#E0783F" fontFamily="Karla" fontSize={["14px", "14px", "2xl","2xl"]} padding="2%" backgroundColor="#FFE1B5" variant="solid" onClick={()=> this.setState({contents: "open"})}>Pick a New Category!</Button>
                <Flex width="50%" justifyContent="flex-end">
                  <Button color="#E0783F" fontFamily="Karla" fontSize={["14px", "14px", "2xl","2xl"]} padding="2%" backgroundColor="#FFE1B5" variant="solid" onClick={() => this.state.index == 0? "" : this.setState({index: this.state.index - 1})}>Back</Button>
                  <Box width="30px"></Box>
                  <Button color="#E0783F" fontFamily="Karla" fontSize={["14px", "14px", "2xl","2xl"]} padding="2%" backgroundColor="#FFE1B5" variant="solid" onClick={()=> this.setState({index: this.state.index + 1})}>Next</Button>
                </Flex>
              </Flex>
              
            </Flex>
        </ThemeProvider>
      </div>
    );
  }
}

