import { useMutation } from '@apollo/client';
import { Button, Col, Input, Row, Spin } from 'antd';
import {
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import React, { useRef } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import '../../common/firebase/index';
import { toastDefault } from '../../common/toast';
import { register } from '../../features/auths/authSlice';
import { signIn } from "../../graphql-client/mutations";
import { getUserQuery } from "../../graphql-client/query";
const provider1 = new FacebookAuthProvider();
const provider2 = new GoogleAuthProvider();

// facebook
provider1.setCustomParameters({
  display: "popup",
});

// google
provider2.setCustomParameters({
  login_hint: "user@example.com",
});

// email

function Register() {
  const navigate = useNavigate();
  const auth = getAuth();
  const dispatch = useDispatch()
  const refInputEmail = useRef<any>("");
  const refInputPassword = useRef<any>("");
  const refInputUserName = useRef<any>("");
  const [add, Mutation] = useMutation<any>(signIn);
  if (Mutation.loading) {
      return <Spin size="large" />
  }
  if (Mutation.data?.createUser) {
      const user = Mutation.data?.createUser;
      dispatch(register(user))
      toastDefault('Đăng kí thành công')
      navigate('/')
  }

  //   facebook
  const handleFbLogin = () => {
    signInWithPopup(auth, provider1)
      .then((result) => {
        const user = result.user;
        const credential: any = FacebookAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        if (user) {
          const { displayName, email, photoURL, uid } = user;
          const newUser = {
            name: displayName, email, avatar: photoURL, password: uid
          };
          localStorage.setItem("user", JSON.stringify(newUser));
          localStorage.setItem("token", JSON.stringify(token));
          add(
            {
                variables: newUser,
            },
          )
        }
      })
      .catch((error) => {
        console.log(error)
      });
  };

  //   google
  const handleGgLogin = () => {
    signInWithPopup(auth, provider2)
      .then((result) => {
        const credential:any = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        const { displayName, email, photoURL, uid } = user;
        if (displayName && email) {
          const newUser = {
            name: displayName, email, avatar: photoURL, password: uid
          };
          localStorage.setItem("user", JSON.stringify(newUser));
          localStorage.setItem("token", JSON.stringify(token));
          add(
            {
                variables: newUser,
                refetchQueries: [{ query:  getUserQuery}]
            },
          )
        }else{
          navigate("/login")
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //   email

  const handleEmailLogin = () => {
    const email = refInputEmail.current.valueOf();
    const password = refInputPassword.current.valueOf();
    const name = refInputUserName.current.valueOf();
    const newUser = {email, password, avatar: null, name: name}
    add(
      {
          variables: newUser,
          refetchQueries: [{ query:  getUserQuery}]
      },
    )
  };

  return (
    <div>
      <Row justify="center" style={{ height: 800 }}>
        <Col span={8}>
          <h2 style={{ margin: 40, textAlign: "center" }}>Đăng ký</h2>
          <Input
            placeholder="Nhập Username"
            onChange={(e) => {
                refInputUserName.current = e.target.value;
            }}
            required={true}
            style={{ marginBottom: 20 }}
            ref={refInputUserName}
          />
          <Input
            placeholder="Nhập Email"
            onChange={(e) => {
              refInputEmail.current = e.target.value;
            }}
            required={true}
            style={{ marginBottom: 20 }}
            ref={refInputEmail}
          />
          <Input.Password
            ref={refInputPassword}
            placeholder="Nhập Password"
            onChange={(e) => {
              refInputPassword.current = e.target.value;
            }}
            required={true}
            type="password"
            style={{ marginBottom: 20 }}
          />
          <Button
            style={{ width: "100%", marginBottom: 10 }}
            onClick={handleEmailLogin}
          >
            Đăng ký
          </Button>
          <Button
            style={{ width: "100%", marginBottom: 10 }}
            onClick={handleGgLogin}
          >
            Đăng ký bằng Google
          </Button>
          <Button
            style={{ width: "100%", marginBottom: 10 }}
            onClick={handleFbLogin}
          >
            Đăng ký bằng Facebook
          </Button>
        </Col>
      </Row>
    </div>
  );
}

Register.propTypes = {};

export default Register;
