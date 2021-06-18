import React from 'react'
import { Link } from 'react-router-dom'
import { BsPersonPlus } from 'react-icons/bs';
import { GiDarkSquad } from 'react-icons/gi';
import { BiLogIn } from 'react-icons/bi';
 
const Header = () => (
    <nav className='navbar navbar-dark bg-dark fixed-top'>
        <div className='container'>
            <Link className='navbar-brand' to='/'><GiDarkSquad />Liburan Keluarga</Link>
            <Link className='btn btn-primary btn-sm mb-3' to='/registrasi' style={{marginLeft:'700px', marginTop:'10px'}}>
                Registrasi <BsPersonPlus /></Link>
            <Link className='btn btn-primary btn-sm mb-3' to='/login' style={{ marginLeft: '0px' , marginTop:'10px'}}>Login <BiLogIn /> </Link>

        </div>
    </nav>
)
 
export default Header