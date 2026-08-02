import styles from './HomePage.module.css';
import MainLayout from './MainLayout';
import PageCard from '../components/PageCard';
import { Container, Row } from 'react-bootstrap';
import { useDocTitle } from '../hooks/DocTitle';
import TrackChart from '../components/TrackChart';

const HomePage = () => {
  useDocTitle("Home");
  
  const pages = [
    { title:"Albums", text:"View and manage the albums.", link:"/albums/", linkTitle:"List of Albums", icon:<i className="bi bi-vinyl-fill"></i> },
    { title:"Artists", text:"View and manage the artists.", link:"/artists/", linkTitle:"List of Artists", icon:<i className="bi bi-person-arms-up"></i>},
    { title:"Genres", text:"View and manage the genres.", link:"/genres/", linkTitle:"List of Genres", icon:<i className="bi bi-file-earmark-music-fill"></i> },
    { title:"Media Types", text:"View and manage the media types.", link:"/mediatypes/", linkTitle:"List of Media Types", icon:<i className="bi bi-cassette-fill"></i> },
    { title:"Tracks", text:"View and manage the tracks.", link:"/tracks/", linkTitle:"List of Tracks", icon:<i className="bi bi-music-note-list"></i> }
  ]

  return (
    <MainLayout>
      <h1 id="homepage-heading" style={{ marginTop: "30px", marginBottom: "20px" }} className="text-center">Welcome to Team KKD Music Library App</h1>
      <Container style={{marginTop: "30px" }}>
        <Row xs={1} md={2} lg={3} className={`g-3 justify-content-center ${styles.homepageCard}`} role="list" aria-label="Navigation Cards">
            {pages.map((page, index)=> (
              <PageCard 
                key={index} 
                icon={page.icon}
                title={page.title} 
                text={page.text} 
                link={page.link}
                linkTitle={page.linkTitle}
              />
            ))}
        </Row>
      </Container>
      <div className='chart-container'
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "1rem",
          marginBottom: "4rem"
        }}
        role="region"
        aria-label="Track chart visualization"
        >
          <div className='chart-container'
            style={{
              width: '400px',
              height: '400px',
              borderRadius: "24px",
              overflow: "hidden",
              boxShadow: "0 2px 8px #0002",
              background: "rgba(255,255,255,0.7)",
              marginBottom: "4rem"
            }}>
              <TrackChart />
          </div>
      </div>
    </MainLayout>
  )
}

export default HomePage;