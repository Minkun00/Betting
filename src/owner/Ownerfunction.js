// Ownerfunction.js

export async function SetTeam_(setTeam, teamName, account) {
    console.log('setTeam activate');
    try {
      await setTeam.methods.setTeam(teamName).send({ from: account });
      console.log(teamName + " is in block chain")
    } catch (error) {
      console.log(error);
      window.alert('SetTeam Error!');
    }
  }
  