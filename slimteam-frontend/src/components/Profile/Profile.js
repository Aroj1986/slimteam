import React from "react";

function Profile() {
  return (
    <div>
      
      <div class="input-group mb-3">
  <label class="input-group-text" for="inputGroupSelect01">Title</label>
  <select class="form-select" id="inputGroupSelect01">
    <option selected></option>
    <option value="Mr">Mr</option>
    <option value="Miss">Miss</option>
    <option value="Mrs">Mrs</option>
  </select>
</div>

        <div class="col-md">
        <label for="floatingInputGrid">First Name</label>
          <div class="form-floating">
            <input
              type="text"
              class="form-control"
              id="floatingInputGrid"
              placeholder="First Name"
            //   value={}
            />
           
          </div>
        </div>

        <div class="col-md">
        <label for="floatingInputGrid">Last Name</label>
          <div class="form-floating">
            <input
              type="text"
              class="form-control"
              id="floatingInputGrid"
              placeholder="Last Name"
            //   value={}
            />
           
          </div>
        </div>

        <div class="col-md">
        <label for="floatingInputGrid">Skills</label>
          <div class="form-floating">
            <input
              type="text"
              class="form-control"
              id="floatingInputGrid"
              placeholder="Skills"
            //   value={}
            />
           
          </div>
        </div>

        
        {/* </div> */}
      </div>
  );
}

export default Profile;
