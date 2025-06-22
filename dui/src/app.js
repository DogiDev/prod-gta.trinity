import React from 'react';
import Countdown from 'react-countdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowAltCircleUp,
  faArrowAltCircleDown,
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
  faPlusSquare,
  faMinusSquare,
  faCaretSquareRight,
  faCaretSquareLeft,
  faCaretSquareUp,
  faCaretSquareDown,
  faTimesCircle,
  faPlusCircle,
  faPauseCircle,
  faMinusCircle,
  faChevronCircleUp,
  faChevronCircleDown,
  faChevronCircleRight,
  faChevronCircleLeft,
  faShareAltSquare,
} from '@fortawesome/free-solid-svg-icons'

import './app.scss';

const iconMap = {
  "plus-square": faPlusSquare,
  "minus-square": faMinusSquare,
  "caret-square-right": faCaretSquareRight,
  "caret-square-left": faCaretSquareLeft,
  "caret-square-up": faCaretSquareUp,
  "caret-square-down": faCaretSquareDown,
  "times-circle": faTimesCircle,
  "plus-circle": faPlusCircle,
  "pause-circle": faPauseCircle,
  "minus-circle": faMinusCircle,
  "chevron-circle-up": faChevronCircleUp,
  "chevron-circle-right": faChevronCircleRight,
  "chevron-circle-left": faChevronCircleLeft,
  "chevron-circle-down": faChevronCircleDown,
  "share-alt-square": faShareAltSquare,
}

class App extends React.Component {
  state = {
    ready: false,
  }
  componentDidMount() {
    try {
      const urlSearchParams = new URLSearchParams(window.location.search);
      const params = Object.fromEntries(urlSearchParams.entries());
      if (!params.type) {
        return;
      }
      this.setState({ ready: true, ...params });
    } catch (err) {}
  }
  render() {
    if (!this.state.ready) {
      return (
        <div id="loading-placeholder" />
      );
    }
    return (
      <div id="app-container">
        {this.state.type === "video" && (
          <video
            id="video-element"
            autoPlay
            muted
            loop
          >
            <source
              src={this.state.src}
              type={`video/${this.state.encoding}`}
            />
          </video>
        )}
        {this.state.type === "text" && (
          <p
            className={`text-wrapper ${!!this.state.uppercase ?? 'text-uppercase'}`}
            style={{ fontSize: this.state.fontSize ?? '1em' }}
          >
            {this.state.text}
          </p>
        )}
        {this.state.type === "countdown" && (
          <Countdown
            date={Date.now() + Number(this.state.seconds)}
            renderer={({ minutes, seconds }) => (
              <p
                className={`text-wrapper ${!!this.state.uppercase ?? 'text-uppercase'}`}
                style={{ fontSize: this.state.fontSize ?? '1em' }}
              >
                {minutes < 10 ? '0' : ''}{minutes}:{seconds < 10 ? '0' : ''}{seconds}
              </p>
            )}
          />
        )}
        {this.state.type === "yacht-clue" && (
          <div id="yacht-clue">
            <div className="arrows first-arrows">
              <div>
                <FontAwesomeIcon icon={faArrowAltCircleUp} size="3x" />
                <p>{this.state.arrowUp || 0}</p>
              </div>
              <div>
                <FontAwesomeIcon icon={faArrowAltCircleRight} size="3x" />
                <p>{this.state.arrowRight || 0}</p>
              </div>
            </div>
            <div className="arrows">
              <div>
                <FontAwesomeIcon icon={faArrowAltCircleDown} size="3x" />
                <p>{this.state.arrowDown || 0}</p>
              </div>
              <div>
                <FontAwesomeIcon icon={faArrowAltCircleLeft} size="3x" />
                <p>{this.state.arrowLeft || 0}</p>
              </div>
            </div>
            <div className="clue-icon">
              <FontAwesomeIcon icon={iconMap[this.state.clueIcon]} size="4x" />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;
