import React from 'react';
import axios from 'axios';

import './App.css';

class App extends React.Component {

    minVerseId = 1; // Minimum valid verse ID (adjust as necessary)
    maxVerseId = 6236; // Maximum valid verse ID (adjust as necessary)

    // Function to get a random verse ID within a valid range
    getRandomVerseId = () => {
        const minVerseId = 1; // Minimum valid verse ID (adjust as necessary)
        const maxVerseId = 6236; // Maximum valid verse ID (adjust as necessary)

        return Math.floor(Math.random() * (maxVerseId - minVerseId + 1)) + minVerseId;
    }

    state = {
        verse: '',
        chapter: '', // Chapter number
        chapterName: '', // Chapter name
        verseNumber: '', // Verse number
        verseId: this.getRandomVerseId(), // Random verse ID on initial load
    };

    componentDidMount() {
        this.fetchVerse();
    }

    fetchVerse = () => {
        const { verseId } = this.state;
        axios.get(`https://api.alquran.cloud/v1/ayah/${verseId}/en.pickthall`)
        .then((response) => {
            const { text, surah, number } = response.data.data; // Adjust based on actual API response

            this.setState({ 
                verse: text,
                chapter: surah.number, // Assuming 'surah' has a 'number' property
                chapterName: surah.englishName, // Assuming 'surah' has a 'englishName' property
                verseNumber: number
            });
        })
        .catch((error) => {
            console.log(error);
        })
    }

    handleNextVerse = () => {
        this.setState(prevState => {
            const nextVerseId = prevState.verseId + 1;
            // Check if the next verse ID is within the valid range
            if (nextVerseId <= this.maxVerseId) {
                return { verseId: nextVerseId };
            }
            return null; // No update if the verse ID is out of range
        }, () => {
            if (this.state.verseId <= this.maxVerseId) {
                this.fetchVerse(); // Fetch the new verse after updating the verseId
            }
        });
    }

    handlePreviousVerse = () => {
        this.setState(prevState => {
            const prevVerseId = prevState.verseId - 1;
            // Check if the previous verse ID is within the valid range
            if (prevVerseId >= this.minVerseId) {
                return { verseId: prevVerseId };
            }
            return null; // No update if the verse ID is out of range
        }, () => {
            if (this.state.verseId >= this.minVerseId) {
                this.fetchVerse(); // Fetch the new verse after updating the verseId
            }
        });
    }

    handleRandomVerse = () => {
        this.setState(prevState => ({
            verseId: this.getRandomVerseId() // Get a new random verse ID
        }), () => {
            this.fetchVerse(); // Fetch the new verse after updating the verseId
        });
    }

    render() {
        const { verse, chapter, chapterName, verseNumber } = this.state;

        return (
            <div className="app">
                <div className="card">
                    <h1 className="heading">{chapterName} ({chapter}:{verseNumber})</h1>
                    <p className="verse">{verse}</p>
                    <div className="button-container">
                        <button className="button" onClick={this.handlePreviousVerse}>
                            <span>Previous</span>
                        </button>
                        <button className="button random-button" onClick={this.handleRandomVerse}>
                            <span>Random</span>
                        </button>
                        <button className="button" onClick={this.handleNextVerse}>
                            <span>Next</span>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;




/*import React from 'react';
import axios from 'axios';

import './App.css';

class App extends React.Component {

    // Function to get a random verse ID within a valid range
    getRandomVerseId = () => {
        const minVerseId = 1; // Minimum valid verse ID (adjust as necessary)
        const maxVerseId = 6236; // Maximum valid verse ID (adjust as necessary)

        return Math.floor(Math.random() * (maxVerseId - minVerseId + 1)) + minVerseId;
    }

    state = {
        verse: '',
        verseId: this.getRandomVerseId(), // Starting verse ID
    };

    componentDidMount() {
        this.fetchVerse();
    }

    fetchVerse = () => {
        const { verseId } = this.state;
        axios.get(`https://api.alquran.cloud/v1/ayah/${verseId}/en.asad`)
        .then((response) => {
            const { text } = response.data.data; // Adjust based on actual API response

            this.setState({ verse: text });
        })
        .catch((error) => {
            console.log(error);
        })
    }

    handleNextVerse = () => {
        this.setState(prevState => ({
            verseId: prevState.verseId + 1 // Move to the next verse
        }), () => {
            this.fetchVerse(); // Fetch the new verse after updating the verseId
        });
    }

    render() {
        const { verse } = this.state;

        return (
            <div className="app">
                <div className="card">
                    <h1 className="heading">{verse}</h1>
                    <button className="button" onClick={this.handleNextVerse}>
                        <span>Next</span>
                    </button>
                </div>
            </div>
        );
    }
}

export default App;*/

/*import React from 'react';
import axios from 'axios';

import './App.css';

class App extends React.Component {
    state = { advice: '' };

    componentDidMount() {
        this.fetchAdvice();
    }

    fetchAdvice = () => {
        axios.get('https://api.adviceslip.com/advice')
        .then((response) => {
            const { advice } = response.data.slip;
            
            this.setState({ advice });
        })
        .catch((error) => {
            console.log(error);
        })
    }

    render() {
        const { advice } = this.state;

        return (
            <div className="app">
                <div className="card">
                    <h1 className="heading">{advice}</h1>
                    <button className="button" onClick={this.fetchAdvice}>
                        <span>Next</span>
                    </button>
                </div>
            </div>
        );
    }
}

export default App;*/