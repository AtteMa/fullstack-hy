import React, { useState } from 'react';
import ReactDOM from 'react-dom';

function pyoristaja(luku, tarkkuus) {
    var factor = Math.pow(10, tarkkuus);
    return Math.round(luku * factor) / factor;
}

function keskiarvo(a,b,c) {
    return pyoristaja((a - c) / (a + b + c), 1)
}

function positiivisia(a, b, c) {
    return pyoristaja((a / (a + b + c)) * 100, 1)
}

const App = (props) => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [allClicks, setAll] = useState([])

    const handleGood = () => {
        setAll(allClicks.concat('G'))
        setGood(good + 1)
    }

    const handleNeutral = () => {
        setAll(allClicks.concat('N'))
        setNeutral(neutral + 1)
    }

    const handleBad = () => {
        setAll(allClicks.concat('B'))
        setBad(bad + 1)
    }
    

    return (
        <div>
            <Otsikko unicafe={unicafe.otsikko[0].nimi}></Otsikko>
            <Button handleClick={handleGood} text="good"></Button>
            <Button handleClick={handleNeutral} text="neutral"></Button>
            <Button handleClick={handleBad} text="bad"></Button>
            <Otsikko unicafe={unicafe.otsikko[1].nimi}></Otsikko>
            <Statistics good={good} neutral={neutral} bad={bad} allClicks={allClicks.length} 
                average={keskiarvo(good, neutral, bad)} positive={positiivisia(good, neutral, bad)} percentage ={'%'}></Statistics>
        </div>
      )
}

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const Otsikko = (props) => {
    return (
        <div>
            <p>{props.unicafe}</p>
        </div>
    )
}

const tdStyle = {
    padding: '0.2',
    width: '100px'
}

const Statistic = (props) => {
    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <td style={tdStyle}>{props.unicafe}</td>
                        <td>{props.counter}{props.percentage}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

const Statistics = (props) => {
    if (props.allClicks === 0) {
        return (
            <div>No feedback given</div>
        )
    }
    return (
        <div>
            <Statistic unicafe={unicafe.statistic[0].nimi} counter={props.good} />
            <Statistic unicafe={unicafe.statistic[1].nimi} counter={props.neutral} />
            <Statistic unicafe={unicafe.statistic[2].nimi} counter={props.bad} />
            <Statistic unicafe={unicafe.statistic[3].nimi} counter={props.allClicks} />
            <Statistic unicafe={unicafe.statistic[4].nimi} counter={keskiarvo(props.good, props.neutral, props.bad)} />
            <Statistic unicafe={unicafe.statistic[5].nimi} counter={positiivisia(props.good, props.neutral, props.bad)} percentage={'%'} />
        </div>
    )
}

const unicafe = {
    otsikko: [
        {nimi: 'Give feedback'},
        {nimi: 'Statistics'}

    ],
    statistic: [
        {nimi: 'good',},
        {nimi: 'neutral',},
        {nimi: 'bad',},
        {nimi: 'all',},
        {nimi: 'average',},
        {nimi: 'positive',}
    ]
}

ReactDOM.render(<App />, document.getElementById('root'));
