import React, { Component } from 'react'
import Newsitem from './Newsitem'

export class News extends Component {

  constructor() {
    super();
    console.log('this is a constructor from News component')
    this.state = {
      Articles: [],
    }
  }
  async componentDidMount() {
    // console.log(cdm);
    let url = "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=07367ed9ef2648798e45ebddd939d287"
    let data = await fetch(url)
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({ Articles: parsedData.articles })

  }
  handleNext = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=07367ed9ef2648798e45ebddd939d287&page=${this.state.page + 1}`
    let data = await fetch(url)
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      page: this.state.page + 1,
      Articles: parsedData.articles
    })
  }
  handlePrevious = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=07367ed9ef2648798e45ebddd939d287&page=${this.state.page - 1}`
    let data = await fetch(url)
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      page: this.state.page - 1,
      Articles: parsedData.articles
    })
  }

  render() {
    return (
      <div className='container '>
        <h2>News monkey-Top headlines</h2>
        <div className="row mx-auto " >
          {this.state.Articles.map((element) => {
            return <div className="col-md-4" key={element.url}>
              <Newsitem title={element.title} description={element.description} imageurl={element.urlToImage} newsurl={element.url} />
            </div>
          })}

        </div>
        <div className='btn d-flex justify-content-between'>
          <button disabled={this.state.page <= 1} type="button" class="btn btn-dark" onClick={this.handlePrevious}>Previous</button>
          <button type="button" class="btn btn-dark" onClick={this.handleNext}>Next</button>
        </div>
      </div>

          
    )
  }
}

export default News
