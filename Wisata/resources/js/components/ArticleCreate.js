import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { BiPlus } from 'react-icons/bi';
import { BsArrowLeftShort } from 'react-icons/bs';
import SweetAlert from 'react-bootstrap-sweetalert';
 
class ArticleCreate extends Component {
     
    constructor (props) {
        super(props)
        this.state = {
            img: '',
            title: '',
            text: '',
            content: '',
            alert: null,
            errors: []
        }
        this.handleFieldChange = this.handleFieldChange.bind(this)
        this.handleCreateNewArticle = this.handleCreateNewArticle.bind(this)
        this.hasErrorFor = this.hasErrorFor.bind(this)
        this.renderErrorFor = this.renderErrorFor.bind(this)
    }
 
    handleFieldChange (event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
 
    goToHome(){
        const getAlert = () => (
            <SweetAlert
                success
                title="Success!"
                onConfirm={() => this.onSuccess() }
                onCancel={this.hideAlert()}
                timeout={2000}
                confirmBtnText="Oke Siap"
                >
                Created article successfully
            </SweetAlert>
        );
        this.setState({
            alert: getAlert()
        });
    }
 
    onSuccess() {
        this.props.history.push('/');
    }
 
    hideAlert() {
        this.setState({
            alert: null
        });
    }
 
    handleCreateNewArticle (event) {
        event.preventDefault()
        const article = {
          img: this.state.img,
          title: this.state.title,
          text: this.state.text,
          content: this.state.content
        }
        axios.post('/api/article/store', article).then(response => { 
            var msg = response.data.success;
            if(msg == true){
                return this.goToHome();
            }
        })
    }
 
    hasErrorFor (field) {
        return !!this.state.errors[field]
    }
 
    renderErrorFor (field) {
        if (this.hasErrorFor(field)) {
            return (
            <span className='invalid-feedback'>
                <strong>{this.state.errors[field][0]}</strong>
            </span>
            )
        }
    }
 
    render () {
        return (
          <div className='container py-4' style={{ marginTop: 50 }}>
            <div className='row justify-content-center'>
              <div className='col-md-6'>
                <div className='card'>
                  <div className='card-header bg-white' style={{ textAlign: 'center', fontSize: 30 }}>Create New Artikel</div>
                  <div className='card-body'>
                    <form onSubmit={this.handleCreateNewArticle}>
                    <div className='form-group'>
                        <label htmlFor='img'>Gambar</label>
                        <input
                          id='img'
                          type='text'
                          className={`form-control ${this.hasErrorFor('img') ? 'is-invalid' : ''}`}
                          name='img'
                          value={this.state.img}
                          onChange={this.handleFieldChange}
                        />
                        {this.renderErrorFor('img')}
                      </div>
                      <div className='form-group'>
                        <label htmlFor='title'>Title</label>
                        <input
                          id='title'
                          type='text'
                          className={`form-control ${this.hasErrorFor('title') ? 'is-invalid' : ''}`}
                          name='title'
                          value={this.state.title}
                          onChange={this.handleFieldChange}
                        />
                        {this.renderErrorFor('title')}
                      </div>
                      <div className='form-group'>
                        <label htmlFor='text'>Deskripsi Singkat</label>
                        <input
                          id='text'
                          type='text'
                          className={`form-control ${this.hasErrorFor('text') ? 'is-invalid' : ''}`}
                          name='text'
                          rows='10'
                          value={this.state.text}
                          onChange={this.handleFieldChange}
                        />
                        {this.renderErrorFor('text')}
                      </div>
                      <div className='form-group'>
                        <label htmlFor='content'>Project content</label>
                        <textarea
                          id='content'
                          className={`form-control ${this.hasErrorFor('content') ? 'is-invalid' : ''}`}
                          name='content'
                          rows='10'
                          value={this.state.content}
                          onChange={this.handleFieldChange}
                        />
                        {this.renderErrorFor('content')}
                      </div>
                      <Link
                        className='btn btn-secondary'
                        to={`/`}
                      ><BsArrowLeftShort /> Back
                      </Link>
                      <button className='btn btn-primary'>Create <BiPlus /></button>
                      {this.state.alert}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
    }
}
export default ArticleCreate