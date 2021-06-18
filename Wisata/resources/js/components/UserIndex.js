import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { BsArrowRightShort } from 'react-icons/bs';
import SweetAlert from 'react-bootstrap-sweetalert';
 
class UserIndex extends Component {
     
    constructor () {
        super()
        this.state = {
            users: [],
            msg: null,
            type: null,
            flash:false,
            alert: null,
        }
    }
 
    hideAlert() {
        this.setState({
            alert: null
        });
    }
 
    componentDidMount () {
        axios.get('/api/users').then(response => {
            this.setState({
                users: response.data
            })
        })
    }
 
    confirmDelete(id){
        const getAlert = () => (
            <SweetAlert
                warning
                showCancel
                confirmBtnText="Ya"
                cancelBtnText="Tidak"
                confirmBtnBsStyle="default"
                cancelBtnBsStyle="danger"
                title="Tunggu ..."
                onConfirm={() => this.deleteItem(id)}
                onCancel={() => this.hideAlert()}
                focusCancelBtn
                >
                Anda yakin ingin menghapus user ?
            </SweetAlert>
        );
        this.setState({
            alert: getAlert()
        });
    }
 
    deleteItem(id) {
        axios.delete(`/api/user/delete/${id}`).then(response => {
            var msg = response.data.success;
            if(msg == true){
                this.hideAlert();
                this.goToHome();
            }
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
                Deleted article successfully
            </SweetAlert>
        );
        this.setState({
            alert: getAlert()
        });
    }
 
    onSuccess(){
        this.componentDidMount();
        this.hideAlert();
    }
 
    render () {
        const { users } = this.state
        return (
            
          <div className='container py-4'>
            <div className='row justify-content-center'>
              <div className='col-md-12'>
                <div className='card'>
                  <div className='card-header' style={{textAlign:'center'}}>User</div>
                  <div className='card-body'>
                    
                    <div className="table-responsive">
                        <table className="table table-bordered table-hover">
                            *<thead>
                                <tr>
                                    <th width="50" className="text-center">No</th>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Password</th>
                                    <th width="200" className="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, i) => (
                                <tr key={i}>
                                    <td width="50" className="text-center">{i + 1}</td>
                                        <td>{user.email}</td>
                                        <td>{user.email}</td>
                                        <td >{user.password}</td>
                                        <td width="200" className="text-center">
                                            <div className="btn-group">
                                            <Link
                                                className='btn btn-primary'
                                                to={`/user/${user.id}`}
                                                >Detail
                                            </Link>
                                            <Link
                                                className='btn btn-success'
                                                to={`/user/edit/${user.id}`}
                                                >Edit
                                            </Link>
                                            <button
                                                className='btn btn-danger'
                                                onClick={() => this.confirmDelete(user.id)}
                                                >Delete
                                            </button>
                                            </div>
                                        </td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                        {this.state.alert}
                    </div>
                    
                  </div>
                </div>

              </div>
            </div>
          </div>
        )
    }
}
 
export default UserIndex