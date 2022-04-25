// @ts-ignore
import styles from './Login.module.css';
import React, { useLayoutEffect } from 'react';

import { useNavigate } from 'react-router-dom';

const APIlink = "http://localhost:25564/api/v1/";

function Login() {
    const [tab, setTab] = React.useState('login');

    const navigate = useNavigate();

    useLayoutEffect(() => {
        const authKey = getCookie("authKey");
        if(authKey) {
            fetch(APIlink + "auth/verify", {
                method: 'POST',
                body: JSON.stringify({
                    authKey: authKey
                })
            }).then(response => response.json()).then(data => {
                if(data.success) {
                    navigate("/");
                }
            }).catch(err => {
                console.log(err);
            });
        }
    }, [])

    return (
        <main>
            <div className={styles.container}>
                <div className={styles.tabs}>
                    <div className={styles.tab + " " + (tab === 'login' ? styles.selectedTab : "")} onClick={() => {setTab('login')}}>Login</div>
                    <div className={styles.tab + " " + (tab === 'register' ? styles.selectedTab : "")} onClick={() => {setTab('register')}}>Register</div>
                </div>
                <div className={styles.content}>
                    {tab === 'login' ? <LoginForm /> : <RegisterForm />}
                </div>
            </div>
        </main>
    )
}

function LoginForm() {
    let isLoading: null | number = null;
    let loadingStep = 0;
    const loadingSequence = [ "⢀⠀", "⡀⠀", "⠄⠀", "⢂⠀", "⡂⠀", "⠅⠀", "⢃⠀", "⡃⠀", "⠍⠀", "⢋⠀", "⡋⠀", "⠍⠁", "⢋⠁", "⡋⠁", "⠍⠉", "⠋⠉", "⠋⠉", "⠉⠙", "⠉⠙", "⠉⠩", "⠈⢙", "⠈⡙", "⢈⠩", "⡀⢙", "⠄⡙", "⢂⠩", "⡂⢘", "⠅⡘", "⢃⠨", "⡃⢐", "⠍⡐", "⢋⠠", "⡋⢀", "⠍⡁", "⢋⠁", "⡋⠁", "⠍⠉", "⠋⠉", "⠋⠉", "⠉⠙", "⠉⠙", "⠉⠩", "⠈⢙", "⠈⡙", "⠈⠩", "⠀⢙", "⠀⡙", "⠀⠩", "⠀⢘", "⠀⡘", "⠀⠨", "⠀⢐", "⠀⡐", "⠀⠠", "⠀⢀", "⠀⡀"];
    const loading = React.useRef(null);
    const error = React.useRef(null);

    const submitForm = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        if(!formData.get("username")) {
            error.current.innerHTML = "Username or email is required";
            return;
        }

        if(!formData.get("password")) {
            error.current.innerHTML = "Password is required";
            return;
        }

        error.current.innerHTML = "";

        // Send AJAX request to API
        try {
            // @ts-ignore
            isLoading = setInterval(() => {
                loading.current.innerHTML = loadingSequence[loadingStep % loadingSequence.length];
                loadingStep++;
            }, 80);

            const response = await fetch(APIlink + "auth/login", {
                method: 'POST',
                body: formData
            })
            const json = await response.json();

            if(!json.success) {
                console.error("Error: " + json.response);
                clearInterval(isLoading);
                
                loading.current.innerHTML = "Error";
                error.current.innerHTML = json.response;
            }

            console.log(json);
            clearInterval(isLoading);

            loading.current.innerHTML = "Login";
        } catch(error) {
            console.error(error);
            clearInterval(isLoading);
            
            loading.current.innerHTML = "Error";
        }
    }

    return (
        <form className={styles.form} onSubmit={submitForm} action="#">
            <span className={styles.formError} ref={error}></span>
            <span className={styles.inputTitle}>Username or email</span>
            <input className={styles.input} type="text" placeholder="Username or email" name="username" autoComplete="current-username" />
            <span className={styles.inputTitle}>Password</span>
            <input className={styles.input} type="password" placeholder="Password" name="password" autoComplete="current-password" />
            <button className={styles.inputButton} formAction="submit" ref={loading}>Login</button>
        </form>
    )
}

function RegisterForm() {
    let isLoading: null | number = null;
    let loadingStep = 0;
    const loadingSequence = [ "⢀⠀", "⡀⠀", "⠄⠀", "⢂⠀", "⡂⠀", "⠅⠀", "⢃⠀", "⡃⠀", "⠍⠀", "⢋⠀", "⡋⠀", "⠍⠁", "⢋⠁", "⡋⠁", "⠍⠉", "⠋⠉", "⠋⠉", "⠉⠙", "⠉⠙", "⠉⠩", "⠈⢙", "⠈⡙", "⢈⠩", "⡀⢙", "⠄⡙", "⢂⠩", "⡂⢘", "⠅⡘", "⢃⠨", "⡃⢐", "⠍⡐", "⢋⠠", "⡋⢀", "⠍⡁", "⢋⠁", "⡋⠁", "⠍⠉", "⠋⠉", "⠋⠉", "⠉⠙", "⠉⠙", "⠉⠩", "⠈⢙", "⠈⡙", "⠈⠩", "⠀⢙", "⠀⡙", "⠀⠩", "⠀⢘", "⠀⡘", "⠀⠨", "⠀⢐", "⠀⡐", "⠀⠠", "⠀⢀", "⠀⡀"];
    const loading = React.useRef(null);
    const error = React.useRef(null);

    const submitForm = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        if(formData.get("password") !== formData.get("passwordConfirm")) {
            error.current.innerHTML = "Passwords don't match";
            return;
        }

        if(!formData.get("email")) {
            error.current.innerHTML = "Email is required";
            return;
        }

        if(!formData.get("username")) {
            error.current.innerHTML = "Username is required";
            return;
        }

        if(!formData.get("password")) {
            error.current.innerHTML = "Password is required";
            return;
        }

        if(!formData.get("passwordConfirm")) {
            error.current.innerHTML = "Password confirm is required";
            return;
        }

        if(!formData.get("birthDate")) {
            error.current.innerHTML = "Birth date is required";
            return;
        }

        const minimumAgeYears = 13;
        const minimumAge = new Date(Date.now() - (minimumAgeYears * 365 * 24 * 60 * 60 * 1000));

        const birthDate = new Date(formData.get("birthDate").toString()).getTime();

        if(birthDate > minimumAge.getTime()) {
            error.current.innerHTML = `You must be at least ${minimumAgeYears} years old`;
            return;
        }

        error.current.innerHTML = "";

        try {
            // @ts-ignore
            isLoading = setInterval(() => {
                loading.current.innerHTML = loadingSequence[loadingStep % loadingSequence.length];
                loadingStep++;
            }, 80);

            const response = await fetch(APIlink + "auth/register", {
                method: 'POST',
                body: JSON.stringify({ 
                    username: formData.get("username"),
                    email: formData.get("email"),
                    password: formData.get("password"),
                    lastName: formData.get("lastName"),
                    firstName: formData.get("firstName"),
                    birthDate: formData.get("birthDate") 
                })
            })
            const json = await response.json();

            if(!json.success) {
                console.error("Error: " + json.response);
                clearInterval(isLoading);
                
                loading.current.innerHTML = "Error";
                error.current.innerHTML = json.response;
            }

            setCookie("authKey", json.data.authKey, 7);

            console.log(json);
            clearInterval(isLoading);

            loading.current.innerHTML = "Register";
        } catch(error) {
            console.error(error);
            clearInterval(isLoading);
            
            loading.current.innerHTML = "Error";
        }
    }

    return (
        <form className={styles.form} onSubmit={submitForm} action="#">
            <span className={styles.formError} ref={error}></span>
            <span className={styles.inputTitle}>Email</span>
            <span className={styles.inputRequired}>*</span>
            <input className={styles.input} type="email" placeholder="Email" name="email" autoComplete="current-email" />
            <span className={styles.inputTitle}>Username</span>
            <span className={styles.inputRequired}>*</span>
            <input className={styles.input} type="text" placeholder="Username" name="username" autoComplete="current-username" />
            <span className={styles.inputTitle}>Full name</span>
            <span className={styles.inputNotRequired}>Not required</span>
            <input className={styles.input} type="text" placeholder="First name" name="firstName" autoComplete="current-firstname" />
            <input className={styles.input} type="text" placeholder="Last name" name="lastName" autoComplete="current-lastname" />
            <span className={styles.inputTitle}>Date of birth</span>
            <span className={styles.inputRequired}>*</span>
            <input className={styles.input} type="date" name="birthDate" autoComplete="current-date-of-birth" />
            <span className={styles.inputTitle}>Password</span>
            <span className={styles.inputRequired}>*</span>
            <input className={styles.input} type="password" placeholder="Password" name="password" autoComplete="current-password" />
            <span className={styles.inputTitle}>Confirm password</span>
            <span className={styles.inputRequired}>*</span>
            <input className={styles.input} type="password" placeholder="Password" name="passwordConfirm" autoComplete="current-password" />
            <button className={styles.inputButton} type="submit" ref={loading}>Register</button>
        </form>
    )
}

export default Login;

function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}