import React, { useState, useEffect } from 'react';
import Tooltip from 'react-tooltip';

export default function FightBox(props) {
    const [fightData, setFightData] = useState([]);
    const [loading, setLoading] = useState(true);
    const eventApi = 'https://api.sportsdata.io/v3/mma/scores/json/Event/';
    const fighterApi = 'https://api.sportsdata.io/v3/mma/scores/json/Fighter/';
    const key = 'key=b16621b4f7134edd980a33f741c8a927';

    useEffect(() => {
        fetch(`${eventApi}/${props.event}?${key}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                let fights = data.Fights;
                if (Array.isArray(fights)) {
                    setFightData(fights);
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

    const getFighterStats = async (fighterId) => {
        let response = await fetch(`${fighterApi}${fighterId}?${key}`);
        const res = await response.json();
        console.log(res);

        ReactTooltip.show(`${res.FirstName} ${res.LastName}
      Nickname: ${res.Nickname}
       Wins: ${res.Wins}
      Losses: ${res.Losses}
      Draws: ${res.Draws}
      No contests: ${res.NoContests}
       TKO: ${res.TechnicalKnockouts}
      Submissions: ${res.Submissions}
      Sig strikes per minute: ${res.CareerStats.SigStrikesLandedPerMinute}
       Sig strike accuracy: ${res.CareerStats.SigStrikeAccuracy}%
       Takedown avg: ${res.CareerStats.TakedownAverage}
       Knockout percentage: ${res.CareerStats.KnockoutPercentage}%`); // Show the tooltip
        // alert(`
        //   ${res.FirstName} ${res.LastName}
        //   Nickname: ${res.Nickname}
        //   Wins: ${res.Wins}
        //   Losses: ${res.Losses}
        //   Draws: ${res.Draws}
        //   No contests: ${res.NoContests}
        //   TKO: ${res.TechnicalKnockouts}
        //   Submissions: ${res.Submissions}
        //   Sig strikes per minute: ${res.CareerStats.SigStrikesLandedPerMinute}
        //   Sig strike accuracy: ${res.CareerStats.SigStrikeAccuracy}%
        //   Takedown avg: ${res.CareerStats.TakedownAverage}
        //   Knockout percentage: ${res.CareerStats.KnockoutPercentage}%
        // `);
    };

    return (
        <div>
            <ul>
                {fightData.map((event) => {
                    if (event.Fighters[0]) {
                        if (event.Active === true) {
                            const fighter1 = event.Fighters[0]?.FirstName + ' ' + event.Fighters[0]?.LastName;
                            const fighter2 = event.Fighters[1]?.FirstName + ' ' + event.Fighters[1]?.LastName;

                            let status;
                            event.Active === 'false' ? (status = 'cancelled') : (status = '');
                            return (
                                <li key={event.FightId}>
                                    <div
                                        id="fight"
                                        style={{ backgroundColor: 'whitesmoke', padding: '1rem' }}
                                    >
                                        <a
                                            data-tip={`Fighter Stats for ${fighter1}`}
                                            data-for={`fighter-tooltip-${event.Fighters[0].FighterId}`}
                                            onClick={() => getFighterStats(event.Fighters[0].FighterId)}
                                        >
                                            {fighter1}
                                        </a>{' '}
                                        vs{' '}
                                        <a
                                            data-tip={`Fighter Stats for ${fighter2}`}
                                            data-for={`fighter-tooltip-${event.Fighters[1].FighterId}`}
                                            onClick={() => getFighterStats(event.Fighters[1].FighterId)}
                                        >
                                            {fighter2}
                                        </a>
                                    </div>
                                </li>
                            );
                        }
                    }
                })}
            </ul>
            <Tooltip effect="solid" place="top" />
        </div>
    );
}