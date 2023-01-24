import React from 'react';

export default function NewsItem(props){
        //let {title,description,imageUrl, newsUrl, author, date} = this.props;
    return(
        <div className='my-3'>
            <div className='card'>
                <img src={!props.imageUrl?"https://fdn.gsmarena.com/imgroot/news/21/08/xiaomi-smart-home-india-annoucnements/-476x249w4/gsmarena_00.jp":props.imageUrl} className='card-img-top' alt="" />
                <div className='card-body'>
                    <h5 className='card-title'>{props.title}</h5>
                    <p className='card-text'>{props.description}</p>
                    <p className='card-text'><small className='text-muted'>By {!props.author?"unkown":props.author} on {new Date (props.date).toGMTString()}</small></p>
                    <a rel='noreferrer' href={props.newsUrl} target='_blank' className='btn btn-sm btn-dark'>Read More</a>
                </div>
            </div>
        </div>
    )
}