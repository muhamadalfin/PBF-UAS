import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { BsArrowLeftShort } from 'react-icons/bs';
import { BiLogIn } from 'react-icons/bi';
import SweetAlert from 'react-bootstrap-sweetalert';
 
class UserLogin extends Component {
     
    constructor (props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            alert: null,
            errors: []
        }
        this.handleFieldChange = this.handleFieldChange.bind(this)
        this.handleLoginUser = this.handleLoginUser.bind(this)
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
                Login user successfully
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
 
    handleLoginUser (event) {
        event.preventDefault()
        const user = {
          email: this.state.email,
          password: this.state.password
        }
        axios.post('/api/user/login', user).then(response => { 
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
                  <div className='card-header bg-white' style={{ textAlign: 'center', fontSize: 30 }}>Login</div>
                  <div className='card-body'>
                    <form onSubmit={this.handleCreateNewUser}>
                      <div className='form-group'>
                        <label htmlFor='email'>Email</label>
                        <input
                          id='email'
                          type='email'
                          className={`form-control ${this.hasErrorFor('email') ? 'is-invalid' : ''}`}
                          name='email'
                          value={this.state.email}
                          onChange={this.handleFieldChange}
                        />
                        {this.renderErrorFor('email')}
                      </div>
                      <div className='form-group'>
                        <label htmlFor='password'>Password</label>
                        <input
                          id='password'
                          type='password'
                          className={`form-control ${this.hasErrorFor('password') ? 'is-invalid' : ''}`}
                          name='password'
                          value={this.state.password}
                          onChange={this.handleFieldChange}
                        />
                        {this.renderErrorFor('password')}
                      </div>
                      <Link
                        className='btn btn-secondary'
                        to={`/`}
                      > <BsArrowLeftShort /> Back
                      </Link>
                      <button className='btn btn-primary'>Login <BiLogIn /></button>
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
export default UserLogin