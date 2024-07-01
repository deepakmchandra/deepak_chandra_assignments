import React from "react";

const localScore = 'LocalScore';
const sessionScore = 'SessionScore';

function initScores() {
  if (!localStorage.getItem(localScore)) localStorage.setItem(localScore, 0);
  if (!sessionStorage.getItem(sessionScore)) sessionStorage.setItem(sessionScore, 0);
}

function getScores() {
  return {
    localScore: parseInt(`${localStorage.getItem(localScore) || 0}`, 10),
    sessionScore: parseInt(`${sessionStorage.getItem(sessionScore) || 0}`, 10)
  }
}

const App = () => {

  const [scores, setScores] = React.useState({
    localScore: -1,
    sessionScore: -1
  });

  React.useEffect(() => {
    const { localScore, sessionScore } = getScores();
    if (localScore < 0 && sessionScore < 0) {
      console.log('Initializing the scores...');
      initScores();
    }
    setScores({ localScore, sessionScore });
  }, []);

  const addScore = () => {
    setScores((prev) => {
      return {
        localScore: prev.localScore + 1,
        sessionScore: prev.sessionScore + 1
      }
    });

    localStorage.setItem(localScore, scores.localScore + 1);
    sessionStorage.setItem(sessionScore, scores.sessionScore + 1);
  }

  return <div style={{
    display: 'flex', width: '100%', height: '100vh',
    justifyContent: 'center', alignItems: 'center', backgroundColor: 'lightslategray'
  }}>
    <div style={{
      display: 'flex',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      flexDirection: 'column',
      borderRadius: 12,
      backgroundColor: "#ffffff80",
      height: '60%',
      width: '60%'
    }}>
      <h1>Scores</h1>
      <h2>Local Score:&nbsp;<b>{scores.localScore}</b></h2>
      <h2>Session Score:&nbsp;<b>{scores.sessionScore}</b></h2>
      <button style={{
        borderRadius: 12,
        padding: 16,
        border: 'none',
        backgroundColor: 'lightpink',
        cursor: 'pointer',
        color: 'darkred',
        fontWeight: 600,
        fontSize: 16
      }} onClick={addScore}>
        Add 1 to score</button>
    </div>
  </div>
};

export default App;