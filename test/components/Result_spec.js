import React from 'react'
import ReactDOM from 'react-dom'
import {
    renderIntoDocument,
    scryRenderedDOMComponentsWithClass,
    Simulate
} from 'react-addons-test-utils'
import {expect} from 'chai'
import {List, Map} from 'immutable'
import {Result} from '../../src/components/Result'

describe('Result', () => {
    it('renders entries with vote counts or zero', () => {
        const pair = List.of('Trainspotting', '28 Days Later')
        const tally = Map({'Trainspotting': 5})
        const component = renderIntoDocument(
            <Result pair={pair} tally={tally}/>
        )
        const entries = scryRenderedDOMComponentsWithClass(component, 'entry')
        const [train, days] = entries.map(e => e.textContent)

        expect(entries.length).to.equal(2)
        expect(train).to.contain('Trainspotting')
        expect(train).to.contain('5')
        expect(days).to.contain('28 Days Later')
        expect(days).to.contain('0')
    })

    it('invokes the next callback when next button id clicked', () => {
        let nextInvoked = false
        const next = () => nextInvoked = true

        const pair = List.of('Trainspotting', '28 Days Later')
        const component = renderIntoDocument(
            <Result pair={pair}
                    tally={Map()}
                    next={next}/>
        )
        Simulate.click(ReactDOM.findDOMNode(component.refs.next))

        expect(nextInvoked).to.equal(true)
    })

    it('renders the winner when there is one', () => {
        const component = renderIntoDocument(
            <Result winner="Trainspotting"
                     pair={["Trainspotting", "28 Days Later"]}
                     tally={Map()} />
        );
        const winner = ReactDOM.findDOMNode(component.refs.winner);
        expect(winner).to.be.ok;
        expect(winner.textContent).to.contain('Trainspotting');
    });

})
