import React, {useState, useEffect} from 'react';
import './App.css';
import questionBank from './questionBank';
import axios from 'axios';

function EvalForm() {
  const [inputValue, setInputValue] = useState([])
  const [userData, setUserData] = useState({});
  const [finalArray, setFinalArray] = useState([])
  const [questions, setQuestions] = useState([]);
  const [name, setName] = useState("");
  const [url, setURL] = useState("");
  const [email, setEmail] = useState("");
  const [repo, setRepo] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [buttonText, setButtonText] = useState("Submit");
  const [status, setStatus] = useState("");
  const [responseData, setCompletedResponseData] = useState([])

  async function sendUserData() {
    try {
      const res = await axios.post(`http://localhost:3000/users`, {
       name: name,
       email: email,
       projectRepo: repo,
       projectURL: url
     });
     let userId = res.data.data.id;
     let completed = inputValue.map(item => ({...item, user_id: userId}))
     setButtonText("Sending...")
     setDisabled(true);
     sendResponses(completed);
    } catch (error){
      console.log(error)
    }
  }

  async function sendResponses(completed) {
    try {
      const res = await axios.post(`http://localhost:3000/responses`, {
        responses: completed
      })
      setCompletedResponseData(res.data)
      setFinalArray([
        { name: name,
          user_id: completed.user_id,
          email: email,
          projectRepo: repo,
          projectURL: url,
        },
        {
          responseList: completed
        }
      ])
    } catch (error) {
      console.log(error);
    }
  }

  const getQuestions = () => {
    questionBank(14).then(question => {
      setQuestions(question);
    });
  };

  const handleValueChange = (givenQuestionId, e) => {
    e.preventDefault();
    if (inputValue.some(singleQuestion => singleQuestion.question_id === givenQuestionId)) {
      inputValue.splice(inputValue.findIndex(item => item.question_id === givenQuestionId));
    }
    inputValue.push({
      body: e.target.value,
      question_id: givenQuestionId,
    });
  } 
  
  const handleNameChange = (e) => {
    e.preventDefault();
    let gName = e.target.value.split(' ').join('');
    setName(gName);
  }

  const handleEmailChange = (e) => {
    e.preventDefault();
    e.target.value = e.target.value.split(' ').join('');
    setEmail(e.target.value);
  }

  const handleRepoChange = (e) => {
    e.preventDefault();
    e.target.value = e.target.value.split(' ').join('');
    setRepo(e.target.value);
  }

  const handleURLChange = (e) => {
    e.preventDefault();
    e.target.value = e.target.value.split(' ').join('');
    setURL(e.target.value);
  }

  const handleFinalSubmit = () => {
    if (name === "" || email ==="" || repo ==="" || url ==="" || inputValue.length !== 15) {
      return null;
    }
    else {
      console.log("MAKING REQUESTS")
      sendUserData(); 
      sendResponses();
    }
  }

  useEffect(() => {
    getQuestions();
  }, []);

  return(
    <div className="parentContainer">
      <div className="userFormContainer">
        <div className="name">
          <input type="text" id="name" className="formControl" placeholder="Full Name" value={name} onChange={handleNameChange} required={true}/>
        </div>
        <div className="email">
          <input type="email" id="email" className="formControl" placeholder="Email" value={email} onChange={handleEmailChange} required={true}/>
        </div>
        <div className="repo">
          <input type="text" id="repo" className="formControl" placeholder="Project Repo" value={repo} onChange={handleRepoChange} required={true}/>
        </div>
        <div className="url">
          <input type="text" id="url" className="formControl" placeholder="Project URL" value={url} onChange={handleURLChange} required={true}/>
        </div>
        <div className="questionBox">
          {!questions 
            ? (<div className="questionItem"><span className="text" style={{color: "white", textAlign: "center"}}>Loading Questions...</span></div>) 
            : (<div>
              {questions.map((question) => {
                  return(
                    <div className="questionItem" key={question.id}>
                      <span className="text">{question.body} </span><input type="number" id="entry" className="input" min="0" max="50" value={inputValue.body} onChange={(e) => handleValueChange(question.id, e)}/>
                    </div>
                  )
                })
              }
            </div>
            )}
        </div>
        <div className="btnSubmit">
          <button className={disabled ? "submitButton " + "open" : "submitButton " + "close"} disabled={disabled} onClick={handleFinalSubmit}>{buttonText}</button>
        </div>
        {status && 
          <div>
            {status}
          </div>
        }
      </div>
    </div>
  );

};

export default EvalForm;
