import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../auth/AuthContext';
import Swal from "sweetalert2";

const PendingAuditList = () => {
    const { user } = useAuth();

  const [audits, setAudits] = useState([]);
  const [error, setError] = useState('');
  const [rights_about_to_give, setrights_about_to_give] = useState('');

  useEffect(() => {
    // Fetch all audits
    const fetchAudits = async () => {
      try {
        console.log("test");
        let param = { user: user._id };
        if(user.role == "admin"){
          param = {user: "admin"};
        }
        const response = await axios.get('http://localhost:3000/pendingAudits',{
          params: param
        });
        setAudits(response.data);
      } catch (err) {
        setError('Failed to fetch audits');
        console.error('Error fetching audits:', err);
      }
    };

    fetchAudits();
  }, []);

  const giveReview = async (e, auditId) => {

    e.preventDefault();

    const rowParent = e.target.closest('tr'); 
    const checkboxes = rowParent.querySelectorAll('input[type="checkbox"]');

    // Create an empty object to store the rights
    let updatedRights = {};
    let audit_id;
    updatedRights["rights"] = {};
    // Loop through each checkbox and check if it's checked
    Array.from(checkboxes).forEach((checkbox) => {
        if (checkbox.checked) {
            const selected = checkbox.dataset.name;
            // Strip the "right-" prefix and extract the object ID
            const strippedName = selected.replace("right-", "");
            const [objectId] = strippedName.split('-'); // Assuming the ID is before the first hyphen
            audit_id = strippedName;
            // Create the object for this checkbox and add it to the updatedRights object
            updatedRights["rights"][objectId] = {
                checked: true
            };
        }
    });
    debugger;
    let aud; 
    if(audit_id == undefined){
      audit_id = e.target.dataset.auditId;
    }
    else{
      aud = audit_id.split("-").pop();
    }

    updatedRights["audit"] = aud;
    console.log(user);

    debugger;
    let review = document.querySelector("textarea[data-audit-id='"+auditId+"']").value;
    let employee = document.querySelector("input[data-audit-id='"+auditId+"'].emp_id").value;
    let application = document.querySelector("input[data-audit-id='"+auditId+"'].app_id").value;
    let rights = JSON.stringify(updatedRights);
    
    var obj = {
      remark: review,
      rights: rights,
      auditID: auditId,
      reviewer: user._id,
      emp: employee, 
      app: application
    }
    const response = await axios.post('http://localhost:3000/submitReview', obj);


      Swal.fire({
        title: "Review Given Successfullly",
        // text: "Do you want to proceed with adding this application?",
        icon: "success",
      }).then((result) => {
        window.location.href="/pastReviews";
      });


  }

  const addRight = async (e) => {
    
    const rowParent = e.target.closest('tr'); 
    const checkboxes = rowParent.querySelectorAll('input[type="checkbox"]');

    // Create an empty object to store the rights
    let updatedRights = {};
    let audit_id;
    updatedRights["rights"] = {};
    // Loop through each checkbox and check if it's checked
    Array.from(checkboxes).forEach((checkbox) => {
        if (checkbox.checked) {
            const selected = checkbox.dataset.name;
            // Strip the "right-" prefix and extract the object ID
            const strippedName = selected.replace("right-", "");
            const [objectId] = strippedName.split('-'); // Assuming the ID is before the first hyphen
            audit_id = strippedName;
            // Create the object for this checkbox and add it to the updatedRights object
            updatedRights["rights"][objectId] = {
                checked: true
            };
        }
    });

    updatedRights["audit"] = audit_id.split("-").pop();
    // Set the new value based on the JSON
    setrights_about_to_give((prevRights) => {
        const updatedRightsObject = { ...prevRights, ...updatedRights };
        return updatedRightsObject;
    });
};

  return (
    <div className="container mt-5">
      <h2>Pending Reviews</h2>

      {error && <p className="text-danger">{error}</p>}

      <table className="table">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Application</th>
            <th>Rights</th>
            {/* <th>Rights</th> */}
            <th>Reviewer Remarks</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
  {audits.length > 0 ? (
    audits.map((audit) => (
      <tr key={audit._id}>
        <td>{audit.emp_id?.name}</td>
        <td>{audit.application_id.appName}</td>
        <td>
          <div style={{ display:"flex", gap:10}}>
            <div>
                <b>Existing Permission</b>
                <div>
                {audit.application_id?.app_rights
                  ? Object.entries(audit.application_id.app_rights).map(([key, value]) => {
                    // debugger;
                    const initialRights = audit.initialRights 
                    ? audit.initialRights.split(",").map(right => right.toLowerCase()) 
                    : [];
                      const isChecked = initialRights.includes(value.toLowerCase());

                      return (
                        <div>
                          {isChecked && (
                            <label>
                              <input
                                type="checkbox"
                                data-name={"right" + "-" + value + "-" + audit._id}
                                onChange={addRight}
                                defaultChecked={isChecked}
                              />
                              {value}
                            </label>
                          )}
                        </div>
                      );
                    })
                  : "No rights"}
                </div>
            </div>
            <div>
                <b>Existing Permission</b>
                <div>
                {audit.application_id?.app_rights
                  ? Object.entries(audit.application_id.app_rights).map(([key, value]) => {
                    // debugger;
                    const initialRights = audit.initialRights 
                    ? audit.initialRights.split(",").map(right => right.toLowerCase()) 
                    : [];
                      const isChecked = initialRights.includes(value.toLowerCase());

                      return (
                        <div>
                          {!isChecked && (
                            <label>
                              <input
                                type="checkbox"
                                data-name={"right" + "-" + value + "-" + audit._id}
                                onChange={addRight}
                                defaultChecked={false}
                              />
                              {value}
                            </label>
                          )}
                        </div>
                      );
                    })
                  : "No rights"}
                </div>
            </div>
          </div>
        
      <div className='d-flex gap-2'>
      {/* <button className='btn btn-sm btn-primary'> Revoke All Rights </button>
            <button className='btn btn-sm btn-primary'> Continue All Rights </button>
            <button className='btn btn-sm btn-primary'> Grant All Rights </button> */}
      </div>
      <input type="text" className='jsonRights' value={JSON.stringify(rights_about_to_give)}
      data-audit-id={audit._id} style={{display:'none'}}></input>
            
        </td>
        {/* <td>{audit.audit_date}</td> */}
        {/* <td>{audit.rights}</td> */}
        <td>
          <textarea placeholder='Comments' className='form-control'
          data-audit-id={audit._id}></textarea>
        </td>
        
        <td>
          <input class="emp_id" value={audit.emp_id?._id} data-audit-id={audit._id} style={{display:'none'}}></input>
          <input class="app_id" value={audit.application_id?._id} data-audit-id={audit._id} style={{display:'none'}}></input>
          <button className='btn btn-success' onClick={ (e) => giveReview(e, audit._id)} data-audit-id={audit._id}>Submit</button></td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="8">No audits found</td>
    </tr>
  )}
</tbody>
      </table>
    </div>
  );
};

export default PendingAuditList;
