'use client'
import "../../css/signupLanding.css";
import { useState } from 'react'

export default function SignupLanding () {
    return (
        <div className="signup-landing-page">
            <h1>Thank you for signing up with Hangry!</h1>
            <h2>Now please <a href="/login">login</a> to your new account</h2>
        </div>
    )
} 