import React, { Component } from 'react';
import { NewsItem } from './NewsItem';
import PropTypes  from 'prop-types';
//import Spinner from './Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';

export default class News extends Component{
    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category:'general'
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    capitalizeFirstLetter =(string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props){
        super(props);
        this.state ={
            articles:[],
            //loading:false,
            loading: true,
            page:1,
            totalResults:0
        }

        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsApp`;
    }


    async updateNews(){

        this.props.setProgress(10);
        
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        try{
            this.setState({loading:true})
            let data = await fetch(url);
            this.props.setProgress(30);
            let parseData = await data.json();
            this.props.setProgress(70);
            this.setState({articles:parseData.articles,
                totalResults: parseData.totalResults,
                loading:false
            })
            this.props.setProgress(100);
        }catch(e){
            console.log(e)
        }
    }

    async componentDidMount(){
        console.log('cdm');
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=dd673c8ad07c4a058180423355f85f73&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        // try{
        //     this.setState({loading:true})
        //     let data = await fetch(url);
        //     let parseData = await data.json();
        //     this.setState({articles:parseData.articles,
        //         totalResults: parseData.totalResults,
        //         loading:false
        //     })
        // }catch(e){
        //     console.log(e)
        // }
        this.updateNews();
    }

    // handlePreviousClick = async () => {

    //     // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=dd673c8ad07c4a058180423355f85f73&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    //     // try{
    //     //     this.setState({loading: true});
    //     //     let data = await fetch(url);
    //     //     let parseData = await data.json();
    //     //     this.setState({
    //     //         page: this.state.page - 1,
    //     //         articles: parseData.articles,
    //     //         loading:false
    //     //     })
    //     // }catch(e){
    //     //     console.log(e)
    //     // }

    //     this.setState({
    //         page: this.state.page - 1
    //         //articles: parseData.articles,
    //     })
    //     this.updateNews();
    // }

    // handleNextClick = async () =>{

    //     // if(this.state.page + 1 >  Math.ceil(this.state.totalResults/this.props.pageSize)){

    //     // }else{
    //     //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=dd673c8ad07c4a058180423355f85f73&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    //     //     try{
    //     //         this.setState({loading: true});
    //     //         let data = await fetch(url);
    //     //         let parseData = await data.json();
    //     //         this.setState({
    //     //             page: this.state.page + 1,
    //     //             articles: parseData.articles,
    //     //             loading:false
    //     //         })
    //     //     }catch(e){
    //     //         console.log(e)
    //     //     }
    //     // }   
        
    //     this.setState({
    //         page: this.state.page - 1
    //         //articles: parseData.articles, 
    //     })

    //     this.updateNews();
    // }

    fetchMoreData = async() => {
        this.setState({page: this.state.page + 1});
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        try{
            //this.setState({loading:true})
            let data = await fetch(url);
            let parseData = await data.json();
            this.setState({articles:this.state.articles.concat(parseData.articles),
                totalResults: parseData.totalResults,
                //loading:false
            })
        }catch(e){
            console.log(e)
        }
        
    }

    render(){
        console.log('render')
        return(
            <>
                <h1 className='text-center' style={{margin: '35px 0px'}}>News - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
               {/* {this.state.loading && <Spinner/>}*/}

                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<h4>Loading...</h4>}
                    //loader={<Spinner/>}
                >
                    <div className='container'>
                        <div className='row'>
                            {/*{!this.state.loading && this.state.articles.map((element)=>*/}
                            {this.state.articles.map((element,index)=> {
                                return <div className="col-md-4" key={index}>
                                    <NewsItem title={element.title?element.title.slice(0,45):''} description={element.description?element.description.slice(0,88):''} 
                                    imageUrl = {element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt}/>
                                </div>
                            })}
                        </div>
                    </div>
                    
                </InfiniteScroll>
               { /*<div className='container d-flex justify-content-between'>
                    <button disabled={this.state.page<=1} type='button' className='btn btn-dark' onClick={this.handlePreviousClick}> &larr; Previous</button>
                    <button disabled={this.state.page + 1 >  Math.ceil(this.state.totalResults/this.props.pageSize)} type='button' className='btn btn-dark' onClick={this.handleNextClick}>Next &rarr;</button>
                    </div>*/}
            </>
        )
    }
}