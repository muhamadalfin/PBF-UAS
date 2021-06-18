import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { BsArrowRightShort } from 'react-icons/bs';
import { BiPlus } from 'react-icons/bi';
import SweetAlert from 'react-bootstrap-sweetalert';
 
class ArticleIndex extends Component {
     
    constructor () {
        super()
        this.state = {
            articles: [],
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
        axios.get('/api/articles').then(response => {
            this.setState({
                articles: response.data
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
                Anda yakin ingin menghapus artikel ?
            </SweetAlert>
        );
        this.setState({
            alert: getAlert()
        });
    }
 
    deleteItem(id) {
        axios.delete(`/api/article/delete/${id}`).then(response => {
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
        const { articles } = this.state
        //const articleStyle = {
           
        //};
        return ( 
          <div className='container py-4' style={{marginTop:50}}>
            
            <div className='row justify-content-center'>
              <div className='col-md-12'>

                        <div className='card shadow-lg p-3 mb-5 bg-white rounded'>
                            <div className='card-header bg-white' style={{ textAlign: 'center', fontSize: 30 }}>Populer Lokasi Wisata</div>
                            <div className='card-body'>
                                {/*<Link className='btn btn-primary btn-sm mb-3' to='/create'>
                                    <BiPlus />Create new article
                                </Link>*/}
                                <div className="table-responsive">
                                    <table className="table table-bordered table-hover">

                                        <tbody>
                                            {articles.map((article, i) => (
                                                <td key={i}>
                                                    
                                                    <tr>
                                                        <td><img src={article.img} width="250" height="150" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ textAlign: 'center' }}>{article.title}</td>
                                                    </tr>
                                                    
                                                </td>
                                            ))}
                                        </tbody>
                                    </table>
                                    {this.state.alert}
                                </div>
                            </div>
                        </div>

                <div className='card shadow-lg p-3 mb-5 bg-white rounded'>
                  <div className='card-header bg-white' style={{textAlign:'center', fontSize:30}}>Article Wisata Kota Malang</div>
                  <div className='card-body'>
                    <Link className='btn btn-primary btn-sm mb-3' to='/create'>
                        <BiPlus />Create new article
                    </Link>
                    <div className="table-responsive">
                        <table className="table table-bordered table-hover">
                            
                            <tbody>
                                {articles.map((article, i) => (
                                <td key={i}>
                                    
                                    <tr>
                                        <td><img src={article.img}  width="250" height="150" /></td>
                                    </tr>
                                    <tr>
                                        <td style={{ textAlign: 'center' }}>{article.title}</td>
                                    </tr>
                                    <tr height="80px">
                                        <td >{article.text}
                                            <br></br> 
                                            <Link
                                            to={`/article/${article.id}`}
                                            >Read More <BsArrowRightShort />
                                    </Link>
                                        </td>
                                    </tr>
                                    
                                </td>
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
 
export default ArticleIndex