import React, { useState, useEffect } from 'react';
import FightBox from './FightBox';

const UFCSchedule = (props) => {
    const [scheduleData, setScheduleData] = useState([]);
    const [loading, setLoading] = useState(true);
    const eventApi = 'https://api.sportsdata.io/v3/mma/scores/json/Event/';
    const key = 'key=b16621b4f7134edd980a33f741c8a927';

    useEffect(() => {
        const apiUrl = 'https://api.sportsdata.io/v3/mma/scores/json/Schedule';
        const league = 'UFC';
        const season = '2023';

        fetch(`${apiUrl}/${league}/${season}?${key}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                if (Array.isArray(data)) {
                    setScheduleData(data);
                } else {
                    console.error('API response does not contain an array of events:', data);
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    const eventHandler = (id) => {
        if (document.getElementById(id).style.display === 'none') {
            document.getElementById(id).style.display = '';
        } else {
            document.getElementById(id).style.display = 'none';
        }
    }

    return (
        <div className="container">
            <h2>Events</h2>
            <ul>
                {scheduleData.map((event) => {
                    const newHref = eventApi + event.EventId + "?" + key;
                    return (
                        <>
                            <a onClick={() => eventHandler(event.EventId)}><li key={event.EventId}>
                                <h3>{event.Name}</h3>
                            </li></a>
                            <div id={event.EventId} className="fight" style={{ backgroundColor: 'whitesmoke', padding: '1rem', display: 'none' }}>
                                <FightBox event={event.EventId} />
                            </div>
                        </>
                    )
                })}
            </ul>
        </div>
    );
};

export default UFCSchedule;
