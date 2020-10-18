import React, { Component } from 'react'

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { signInWithGoogle } from '../../firebase/firebase.utils';

import './sign-in.styles.scss';

export default class SignIn extends Component {
    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = event => {
        event.preventDefault();
        this.setState({ email: '', password:'' });
    }

    handleChange = event => {
        const { value, name } = event.target;
        this.setState({[name]: value }) // dynamic key
    }

    render() {
        return (
            <div className='sign-in'>
                <h1 className="title">I already have an account</h1>
                <span>Sign in with your email and password</span>

                <form onSubmit = { this.handleSubmit }>
                    <FormInput 
                    name="email" 
                    type="email" 
                    value={ this.state.email } 
                    label="email"
                    handleChange={ this.handleChange }
                    required />
                    
                    <FormInput 
                    name="password" 
                    type="password" 
                    value={ this.state.password } 
                    label="password"
                    handleChange={ this.handleChange }
                    required />
                    <div className="buttons">
                        <CustomButton type="submit">Submit Form</CustomButton>
                        <CustomButton onClick = { signInWithGoogle } isGoogleSignIn>Sign in with google</CustomButton>
                        </div>
                </form>
            </div>
        )
    }
}
