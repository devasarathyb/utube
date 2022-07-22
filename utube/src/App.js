import { Grid } from '@material-ui/core';
import utubeapi from './api/utubeapi';
import React from 'react';
import SearchBar from './components/SearchBar';
import VideoDetail from './components/VideoDetail'; 
import VideoList from './components/VideoList';
import VideoItem from './components/VideoItem';
import './App.css';

class App extends React.Component {
  state={
    videos:[],
    selectedVideo:null,

  }
  componentDidMount(){
    this.handleSubmit('tamil comedy videos')
  }
  onVideoSelect=(video)=>{
      this.setState({selectedVideo:video});
  }
  handleSubmit=async(searchTerm)=>{
      const response =await utubeapi.get('search', {
      params: {
        part:'snippet',
        maxResults:10,
        key:'AIzaSyBWiwHQBhBl4XxZHzTGDbc4kaIarA0QrLQ',
        q:searchTerm
      } 
    })
    this.setState({
      videos:response.data.items,
      selectedVideo:response.data.items[0]
    })
    console.log(response.data.items)
  }
  render(){
    const {selectedVideo,videos}=this.state;
  return (
    <div className='App'>
   <h1>Utube Clone</h1>
   <Grid justify="center" container spacing={16}>
      <Grid item xs={12}>
        <Grid container spacing={16}>
          <Grid item xs={12}>
           <SearchBar onFormSubmit={this.handleSubmit}/>
          </Grid>
          <Grid item xs={8}>
           <VideoDetail video={this.state.selectedVideo}/>
          </Grid>
          <Grid item xs={4}>
            <VideoList videos={videos} onVideoSelect={this.onVideoSelect}/>
          </Grid>
        </Grid>
      </Grid>
   </Grid>
   </div>
  );
  }
}

export default App;
