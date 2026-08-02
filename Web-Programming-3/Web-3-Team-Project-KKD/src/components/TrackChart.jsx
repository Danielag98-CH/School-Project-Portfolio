import { useEffect, useState } from "react";
import { getAllTracks } from '../api/track-data-access';
import { Chart } from "react-google-charts";

const TrackChart = () => {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    getAllTracks().then(setTracks);
  }, []);

  const getTracksPerGenre = (tracks) => {
    const trackObj = {};
    tracks.forEach((t) => {
      if (trackObj[t.genre]) {
        trackObj[t.genre]++;
      } else {
        trackObj[t.genre] = 1;
      }
    });
    return trackObj;
  };

  const convertObjectToArray = (obj) => {
    const ar = [["Genre", "Tracks"]]; 
    for (const key in obj) {
      ar.push([key, obj[key]]);
    }
    return ar;
  };

  const data = convertObjectToArray(getTracksPerGenre(tracks));
  const options = { title: "Tracks per Genre", 
                    titleTextStyle: { fontSize: 24 },
                    chartArea: { width: '80%', height: '75%' }, 
                    backgroundColor: { fill: 'transparent' },
                    pieSliceText: "value-and-percentage", // <--- This shows both number and percent
                    tooltip: { text: "both" } };

  return (
    <Chart
      chartType="PieChart"
      width="400px"
      height="400px"
      data={data}
      options={options}
    />
  );
};

export default TrackChart;