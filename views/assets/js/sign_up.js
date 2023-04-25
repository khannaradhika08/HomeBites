let x=1,y=1,z=1;

function validatephone(phone) 
{
  
  var regPh=/^[1-9]\d{9}$/;
  if(regPh.test(phone)==false)
  {
    document.getElementById("status0").innerHTML    = "<span class='warning'>Enter a valid 10 digit phone number.</span>";
    x=0;
  }
  else
  {
    document.getElementById("status0").innerHTML    = "<span class='warning'>Phone number: Valid</span>";
    x=1;
  }
}
// validates text only
function Validate(txt) {
    txt.value = txt.value.replace(/[^a-zA-Z-'\n\r.]+/g, '');
}

// validate email
function email_validate(email)
{
var regMail = /^([_a-zA-Z0-9-]+)(\.[_a-zA-Z0-9-]+)*@([a-zA-Z0-9-]+\.)+([a-zA-Z]{2,3})$/;

    if(regMail.test(email) == false)
    {
    document.getElementById("status").innerHTML    = "<span class='warning'>Email address is not valid yet.</span>";
    y=0;
    }
    else
    {
    document.getElementById("status").innerHTML    = "<span class='warning'>Email ID: Valid </span>";
    y=1;
    }
    
}

// validate address
function add_validate(address)
{
var regAdd = /^(?=.*\d)[a-zA-Z\s\d\/]+$/;
  
    if(regAdd.test(address) == false)
    {
    document.getElementById("statusAdd").innerHTML	= "<span class='warning'>Address is not valid yet.</span>";
    z=0;
    }
    else
    {
    document.getElementById("statusAdd").innerHTML	= "<span class='valid'>Address: valid</span>";	
    z=1;
    }
}

//username
function user_validate(username)
{
  var regUsername=/^[a-z0-9_\.]{3,}$/;
    if (regUsername.test(username)==false)
    {
        alert("Username should have minimum 3 characters and no special characters (except \"_\",\".\")");
        return false;
    }
}

