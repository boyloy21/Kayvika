export default function Loading() {
    return (
      <div style={styles.container}>
        <div style={styles.spinner}></div>
        <p>Loading...</p>
      </div>
    );
  }
  
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#f0f0f0',
    },
    spinner: {
      width: '60px',
      height: '60px',
      border: '5px solid #ccc',
      borderTop: '5px solid #0070f3',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
    },
  };