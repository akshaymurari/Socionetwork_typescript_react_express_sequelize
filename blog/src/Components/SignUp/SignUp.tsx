import React from "react";
import TextField from "@material-ui/core/TextField";
import "./SignUp.scss";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import { GoogleLogin } from "react-google-login";
import axios from "axios";
import { Baseurl } from "../../App";
import { useHistory } from "react-router-dom";


const SignUp = () => {
  const [signinorup, setsigninorup] = React.useState(false);
  const [vis, setvis] = React.useState(false);
  const H = useHistory();
  const signup: React.CSSProperties = {
    width: "max-content",
    margin: "auto",
    marginTop: "3rem",
  };
  let values: {
    title: string;
    link: string;
  } = {
    title: "SignUp",
    link: "already have an account?",
  };
  if (signinorup) {
    values.link = "don't have an account?";
    values.title = "Signin";
  }
  const [details, setdetails] = React.useState({
    username: "",
    gmail: "",
    password: "",
    conformpassword: "",
  });
  React.useEffect(() => {
    setdetails({
      username: "",
      gmail: "",
      password: "",
      conformpassword: "",
    });
  }, [signinorup]);
  const gotosigin = (): void => {
    setsigninorup(!(signinorup as boolean));
  };
  // type googleobj = {
  //   profileObj:string
  // }
  const onSuccess = async (val: any) => {
    console.log(val.profileObj);
    console.log(val.tokenId);
    try {
      const data = await axios({
        method: "post",
        url: `${Baseurl}/googlelogin`,
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        data: { ...val.profileObj, token: val.tokenId },
      });
      console.log(data.data);
      localStorage.setItem("token", data.data.token);
      H.push("/main");
    } catch {
      console.log("login failed");
    }
  };
  const onFailure = (val: object) => {
    console.log(val);
  };
  const signin = async () => {
    try {
      const data = await axios({
        method: "post",
        url: `${Baseurl}/signin`,
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        data: { ...details },
      });
      console.log(data.data);
      localStorage.setItem("token", data.data.token);
      H.push("/main");
    } catch {
      console.log("error");
    }
  };
  const register = async () => {
    console.log(details);
    try {
      const data = await axios({
        method: "post",
        url: `${Baseurl}/signup`,
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        data: { ...details, email: details.gmail },
      });
      console.log(data.data);
      localStorage.setItem("token", data.data.token);
      setvis(true);
    } catch {
      console.log("error");
    }
  };
  const handlechange =
    (val: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setdetails({ ...details, [val]: e.target.value });
    };
  return (
    <>
      {vis && !signinorup ? (
        <Alert
          onClose={(): void => {
            setvis(false);
          }}
        >
          verfication code as been sent to your gmail
        </Alert>
      ) : (
        <></>
      )}
      <div className="container pt-3 my-5 Sign">
        <h3 className="text-center text-uppercase">{values.title}</h3>
        <div style={signup}>
          <div className="my-3" style={{ width: "100%" }}>
            <TextField
              id="outlined-basic"
              style={{ display: "block" }}
              label="username"
              variant="outlined"
              value={details.username}
              onChange={handlechange("username")}
            />
          </div>
          <br></br>
          {!(signinorup as boolean) ? (
            <>
              <TextField
                id="outlined-basic"
                style={{ display: "block" }}
                label="gmail"
                variant="outlined"
                onChange={handlechange("gmail")}
                value={details.gmail}
              />
              <br></br>
              <br></br>
            </>
          ) : (
            <></>
          )}
          <TextField
            id="outlined-basic"
            type="password"
            style={{ display: "block" }}
            label="password"
            variant="outlined"
            onChange={handlechange("password")}
            value={details.password}
          />
          <br></br>
          <br></br>
          <TextField
            id="outlined-basic"
            type="password"
            style={{ display: "block" }}
            label="conformpass"
            variant="outlined"
            value={details.conformpassword}
            onChange={handlechange("conformpassword")}
          />
          <br></br>
          <br></br>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <Button
              className="my-0 p-2"
              color="primary"
              variant="outlined"
              onClick={!(signinorup as boolean) ? register : signin}
              style={{ width: "100%" }}
            >
              {values.title}
            </Button>
            {(signinorup as boolean) ? (
              <div className="">
                <br></br>
                <br></br>
                <GoogleLogin
                  clientId="358347217171-fnjg4ah257rm72n74ll3ekhs56hjethe.apps.googleusercontent.com"
                  buttonText="Login"
                  onSuccess={onSuccess}
                  onFailure={onFailure}
                  cookiePolicy={"single_host_origin"}
                />
              </div>
            ) : (
              <></>
            )}
          </div>
          <Button
            className="mt-4 p-2"
            onClick={gotosigin}
            color="primary"
            variant="outlined"
            style={{ width: "100%" }}
          >
            {values.link}
          </Button>
        </div>
      </div>
    </>
  );
};

export default SignUp;
