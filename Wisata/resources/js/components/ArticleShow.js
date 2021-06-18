import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { BsArrowLeftShort } from 'react-icons/bs';
 
    class ArticleShow extends Component {
      constructor (props) {
        super(props)
        this.state = {
          article: {}
        }
      }
 
      componentDidMount () {
 
        const articleId = this.props.match.params.id
 
        axios.get(`/api/article/${articleId}`).then(response => {
          this.setState({
            article: response.data
          })
        })
      }
 
      render () {
        const { article } = this.state
 
        return (
          <div className='container py-4' style={{ marginTop: 50 }}>
            <div className='row justify-content-center'>
              <div className='col-md-8'>
                <div className='card'>
                  <div className='card-header bg-white' style={{ textAlign: 'center', fontSize: 30 }}>{article.title}</div>
                  <div className='card-body'>
                    <p><img src={article.img} width="685" height="450"></img></p>
                    <p>{article.content}</p>
                    <Link
                        className='btn btn-primary'
                        to={`/`}
                    ><BsArrowLeftShort />Back
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }
    }
 
export default ArticleShow