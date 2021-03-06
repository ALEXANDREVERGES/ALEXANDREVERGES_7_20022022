import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { useHistory } from 'react-router-dom';
import UseDataLayer from "../AuthProvider";
import '../styles/Avatar.css';
import '../styles/Responsive.css';


function Avatar() {

  const [{ user }, dispatch] = UseDataLayer();
  const avatarImage = user.avatar?user.avatar: "default-avatar.jpg";
  const localstoragetoken = JSON.parse(localStorage.getItem("userlog"));
  let history = useHistory();
  
  
  const avatarSubmit = (event) => {
    event.preventDefault();
    history.push('/');
    document.location.reload();
    var avatar = document.getElementById("image").files[0].name;
    
      const modifyAvatar = {
        method: "PUT",
        headers: { "Content-Type": "application/json", 'Authorization': `Bearer ${localstoragetoken}` },
        body: JSON.stringify({
        avatar: avatar,
        }),
      };

  fetch(`http://localhost:3000/auth/modification/avatar/${user[0].iduser}`, modifyAvatar)
    .then((res) => {
      alert('Vous venez de changer votre avatar !');  
    })
    .catch((error) => console.log(error));
   dispatch({
     type: "SETUSER",
     user:{
      admin: user.admin,
      avatar: avatarImage,
      email: user.email,
      iduser: user.iduser,
      nom: user.nom,
      password: user.password,
      prenom: user.prenom}
   })
  }

  
  return (
    <div>
      <div className='positionForm'>
        <div >
          <form onSubmit={avatarSubmit}>
             <form
            method="POST"
            encType="multipart/form-data"
            action="http://localhost:3000/upload"
          >
            <input
              type="file"
              accept="image/*"
              name="IMG"
              // onChange={(e) => setPhoto(e.target.value)}
              id="image"
            />
            <input type="submit" value="Téléchargez votre image" />
          </form>
             <button type="submit" className="btnAvatar">
              Valider
            </button>   
          </form>        
        </div>
      </div>
    </div>
  );
}

export default Avatar