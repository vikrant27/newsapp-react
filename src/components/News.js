import React, {useEffect, useState} from 'react';
import  NewsItem  from './NewsItem';
import PropTypes  from 'prop-types';
import Spinner from './Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function News(props){
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
   
    
    const capitalizeFirstLetter =(string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const updateNews = async()=>{

        props.setProgress(10);
        
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        try{
          
            setLoading(true);
            let data = await fetch(url);
            props.setProgress(30);
            let parseData = await data.json();
            props.setProgress(70);
            setArticles(parseData.articles);
            setTotalResults(parseData.totalResults);
            setLoading(false);
            
            props.setProgress(100);
        }catch(e){
            console.log(e)
        }
    }

    useEffect(()=>{
        document.title = `${capitalizeFirstLetter(props.category)} - NewsApp`;
        updateNews();
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchMoreData = async() => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page + 1);
        try{
            //this.setState({loading:true})
            let data = await fetch(url);
            let parseData = await data.json();
            setArticles(articles.concat(parseData.articles));
            setTotalResults(parseData.totalResults);
        }catch(e){
            console.log(e)
        }
        
    }

        console.log('render')
        return(
            <>
                <h1 className='text-center' style={{margin: '35px 0px',marginTop: '90px'}}>News - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
               {loading && <Spinner/>}

                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<h4>Loading...</h4>}
                    //loader={<Spinner/>}
                >
                    <div className='container'>
                        <div className='row'>
                            {/*{!this.state.loading && this.state.articles.map((element)=>*/}
                            {articles.map((element,index)=> {
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
                    <button disabled={this.state.page + 1 >  Math.ceil(this.state.totalResults/props.pageSize)} type='button' className='btn btn-dark' onClick={this.handleNextClick}>Next &rarr;</button>
                    </div>*/}
            </>
        )
    
}

 News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category:'general'
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}