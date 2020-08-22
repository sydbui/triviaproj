import Link from 'next/link';
import Head from '../components/head';
import Nav from '../components/nav';
import React, { Component } from 'react';
// import HomePage from './trivia';
import fetch from 'isomorphic-unfetch';
import useSWR from '@zeit/swr';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/core";
import {ThemeProvider, Heading, Flex, ButtonGroup, Box, Button} from "@chakra-ui/core";

const API_URL = 'https://opentdb.com/api.php?'
async function fetcher(path) {
  const res = await fetch(API_URL + path)
  const json = await res.json()
  return json
}

function HomePage(props) {
  const string = 'amount=1' + props.category + '&type=multiple'
  const { data, error } = useSWR(string, fetcher)
  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  return(
    <Tabs isFitted>
      <TabList>
        <Tab>Question</Tab>
        <Tab>Answer</Tab>
      </TabList>
    
      <TabPanels>
        <TabPanel>
          <Heading>{ReactHtmlParser(data.results[0].question)}</Heading>
        </TabPanel>
        <TabPanel>
          <Heading>{ReactHtmlParser(data.results[0].correct_answer)}</Heading>
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}

export default class reactApp extends Component{
  constructor() {
    super()
    this.state = {
      contents: "open",
    //   contents: 
    //   <Flex flexWrap="wrap" justifyContent="center">         
    //     <Heading size="xl">Pick a Category</Heading>
    //     <Box width="100%" height="50px"></Box>
    // <ButtonGroup spacing={10} onClick={() => this.setState({contents:
    // <Flex flexWrap="wrap">
    //   <HomePage category={this.state.category}></HomePage>
    //   <Box width="100%" height="80px"></Box> 
    //   <Button onClick={() => this.setState({contents: <HomePage category={this.state.category}></HomePage>})}>NEXT</Button>
    // </Flex>})}>
    //       <Button onClick={() => this.setState({category:"&category=9"})}> General Knowledge </Button>
    //       <Button onClick={() => this.setState({category:"&category=14"})}>Entertainment</Button>
    //       <Button onClick={() => this.setState({category:"&category=17"})}>Science & Nature</Button>
    //       <Button onClick={() => this.setState({category:"&category=27"})}>Animals</Button>
    //       <Button onClick={() => this.setState({category:""})}>Mix It Up!</Button>
    //     </ButtonGroup>
    //   </Flex> ,
      category: "",
      question:"",
      answer:"",
    }
  }
  componentDidMount() {
    this.setState({
      question: <HomePage category={this.state.category}></HomePage>,
    })
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
        <Flex justifyContent="center" flexWrap="wrap">
          <Heading size="2xl">IT'S TRIVIA TIME</Heading>
          <Box width="100%" height="20px"></Box>
          <Box width = "95%">
          {this.state.question}
          </Box>
          <Box width="100%" height="15%"></Box>
          <Button onClick={() => this.setState({
            question: <HomePage category={this.state.category}></HomePage>
          })}>Next</Button>
        </Flex>
      </ThemeProvider>
    );
  }
}

