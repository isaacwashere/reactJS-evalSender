import React, {useState, useEffect} from 'react';
import './App.css';
import questionBank from './questionBank';

function EvalForm() {
  const [questions, setQuestions] = useState([]);
  const [buttonStatus, setButtonStatus] = useState(true);

  const getQuestions = () => {
    questionBank(14).then(question => {
      setQuestions(question);
    });
  };

  useEffect(() => {
    getQuestions();
  }, []);

  return(
    <div className="parentContainer">
      <div className="userFormContainer">
        <div className="name">
          <input type="text" id="name" className="formControl" placeholder="Full Name"/>
        </div>
        <div className="email">
          <input type="text" id="email" className="formControl" placeholder="Email"/>
        </div>
        <div className="repo">
          <input type="text" id="repo" className="formControl" placeholder="Project Repo"/>
        </div>
        <div className="url">
          <input type="text" id="url" className="formControl" placeholder="Project URL"/>
        </div>
        <div className="questionBox">
          {questions.length <= 0 
            ? (<div className="questionItem"><span className="text" style={{color: "white", textAlign: "center"}}>Loading Questions...</span></div>) 
            : (<div>
              {questions.map((question) => {
                  return(
                    <div className="questionItem">
                      <span className="text">{question.body} </span><input type="text" id="entry" className="input"/>
                    </div>
                  )
                })
              }
            </div>
            )}
        </div>
        <div className="btnSubmit">
          <button className={"submitButton " + (buttonStatus ? null : 'open')} disabled={buttonStatus} style={buttonStatus ? {backgroundColor: "#FAB3B9"} : null}>Submit</button>
        </div>
      </div>
    </div>
  );

};

export default EvalForm;
