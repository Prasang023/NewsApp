import React, { useState, useEffect } from 'react'
import axios from 'axios'

// CSS import
import '../css/Home.css'

// Components inports
import SearchSection from '../components/SearchSection'

const Home = () => {
    const [newslist, setNewslist] = useState([])
    const [error, setError] = useState('')

    const call = async (keyword) => {
        try {
            if(!keyword) return 
            const data = await axios.get(`https://newsapi.org/v2/everything?q=${keyword}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`)
            console.log(data)
            const { data:{articles} } = data
            setNewslist(articles)
        } catch(err) {
            setError(err)
        }
    }

    useEffect(() =>{
        const callDefault = async () => {
            try {
            const data = await axios.get(`https://newsapi.org/v2/everything?q=Random&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`)
            console.log(data)
            const { data:{articles} } = data
            setNewslist(articles)
            } catch(err) {
                setError(err)
            }
        }
        callDefault()
    }, [])

  return (
    <div>
    
    <SearchSection 
        submitHandler={call}
    />
        <div className="news-section">
            {newslist[0]? newslist.map((newsItem, index)=>{
                return(
                    <div key={index} className="newsCard">
                        <div className="newsImageBox">
                        <img src={newsItem.urlToImage} className="newsImage" />
                        </div>
                        <div className="newsContent">
                        <p style={{ color: '#aaa', marginBottom: '0px' }}>{newsItem.publishedAt.substring(0,10)}</p>
                        <h2 style={{ marginTop: '0px', marginBottom: '0px' }}>{newsItem.title}</h2>
                        <p style={{ color: '#aaa', marginTop: '0px' }}>Written By: {newsItem.author}</p>
                        <p>{newsItem.content.substring(0,150)+"..."}</p>
                        <h4><a href={newsItem.url} target="_blank" style={{ textDecoration: 'none' }}>Read More >></a></h4>
                        </div>
                    </div>
                )
            }): 
            <div className="newsContent">
            <h2>Sorry! No articles Found</h2>
            </div>
            }
        </div>
        <div><h4>{error}</h4></div>
    </div>
  )
}

export default Home