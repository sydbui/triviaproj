import Link from 'next/link';
import Head from '../components/head';
import Nav from '../components/nav';
import React, { useState, Component } from 'react';
import fetch from 'isomorphic-unfetch';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/core";
import {ThemeProvider, Heading, Flex, ButtonGroup, Box, Button} from "@chakra-ui/core";

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
    fetch('https://opentdb.com/api.php?amount=50')
    .then((response) => response.json())
    .then(booksList => {
        this.setState({ data: booksList});
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if ((prevState.category !== this.state.category) || this.state.index == 48) {
      fetch('https://opentdb.com/api.php?amount=50'+ this.state.category)
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
          <title>trivia fun</title>
        </Head>
  
        <ThemeProvider>
          <Flex justifyContent="center" flexWrap="wrap">
            <Heading size="2xl">IT'S TRIVIA TIME</Heading>
            <Box width="100%" height="20px"></Box>       
            <Heading size="xl">Pick a Category</Heading>
            <Box width="100%" height="50px"></Box>
            <ButtonGroup spacing={10} onClick={()=> this.setState({contents:"cards"})}>
              <Button onClick={() => this.setState({category:"&category=9"})}> General Knowledge </Button>
              <Button onClick={() => this.setState({category:"&category=14"})}>Entertainment</Button>
              <Button onClick={() => this.setState({category:"&category=17"})}>Science & Nature</Button>
              <Button onClick={() => this.setState({category:"&category=27"})}>Animals</Button>
              <Button onClick={() => this.setState({category:""})}>Mix It Up!</Button>
            </ButtonGroup>
            </Flex> 
        </ThemeProvider>
      </div>
    )
    if (this.state.contents == "cards") return (
      <ThemeProvider>
        <Flex justifyContent="center" flexWrap="wrap" padding="5%">
          <Heading size="2xl" onClick={()=> this.setState({contents: "open"})}>IT'S TRIVIA TIME</Heading>
          <Box width="100%" height="20px"></Box>
          <Box width ="100%" height="350px" >
            <Tabs isFitted>
              <TabList>
                <Tab>Question</Tab>
                <Tab>Answer</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Heading>{ReactHtmlParser(this.state.data.results[this.state.index].question)}</Heading>
                </TabPanel>
                <TabPanel>
                  <Heading>{ReactHtmlParser(this.state.data.results[this.state.index].correct_answer)}</Heading>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
          <Box width = "100%" height="25px"></Box>
          <Flex width= "100%" justifyContent="space-between">
            <Button onClick={()=> this.setState({contents: "open"})}>Pick a New Category!</Button>
            <Button onClick={()=> this.setState({index: this.state.index + 1})}>Next</Button>
          </Flex>
        </Flex>
      </ThemeProvider>
    );
  }
}

