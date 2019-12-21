import React from 'react';
import './App.css';

function EvalForm() {
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
          <div className="questionItem">
            <span className="text"> Using best practices for OOP: </span><input type="text" id="entry" className="input"/>
          </div>
          <div className="questionItem">
            <span className="text"> Modular development: </span><input type="text" id="entry" className="input"/>
          </div>
          <div className="questionItem">
            <span className="text">This is one thing: </span><input type="text" id="entry" className="input"/>
          </div>
        </div>
        <div className="btnSubmit">
          <button className="submitButton">Submit</button>
        </div>
        </div>
      </div>
  );
};

export default EvalForm;
