import React from 'react';

class Profile extends React.Component {
  render () {
    return (
      <div>
        <h1>Profile</h1>
        <p>
          Display a list of the stories the user is currently reading and have buttons for the user to press to continue or go back on issues
          <br />
          Display the next issue of the story in smaller, dimmed text
        </p>
      </div>
    );
  }
}

export default Profile
