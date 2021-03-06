import React from 'react';
import axios from 'axios';

import sinon from 'sinon';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import App from './App';

const API_URL = 'https://s3-ap-southeast-2.amazonaws.com/bet-easy-code-challenge/next-to-jump';

configure({ adapter: new Adapter() });

describe('App', () => {

    const mockResult = {
        data: {
            "result": [
                {
                    "EventID": 30431079,
                    "MasterEventID": 1049998,
                    "EventName": "Lucky Creed Qualifying Pace",
                    "EventTypeDesc": "Trots",
                    "MasterEventName": "Races",
                    "AdvertisedStartTime": "2018-09-10T02:08:00Z",
                    "RaceNumber": 3,
                    "EventType": {
                        "EventTypeID": 2,
                        "EventTypeDesc": "Trots",
                        "MasterEventTypeID": 1,
                        "Slug": "harness-racing"
                    },
                    "Venue": {
                        "Venue": "Albion Park",
                        "StateCode": "QLD",
                        "Slug": "albion-park"
                    },
                    "IsMultiAllowed": true,
                    "Slug": "lucky-creed-qualifying-pace",
                    "DateSlug": "20180910",
                    "RacingStreamAllowed": false,
                    "RacingReplayStreamAllowed": false
                },
                {
                    "EventID": 30383194,
                    "MasterEventID": 1048623,
                    "EventName": "J P Print, Petone C4",
                    "EventTypeDesc": "Greyhounds",
                    "MasterEventName": "Races",
                    "AdvertisedStartTime": "2018-09-10T02:13:00Z",
                    "RaceNumber": 6,
                    "EventType": {
                        "EventTypeID": 3,
                        "EventTypeDesc": "Greyhounds",
                        "MasterEventTypeID": 1,
                        "Slug": "greyhound-racing"
                    },
                    "Venue": {
                        "Venue": "Manawatu",
                        "StateCode": null,
                        "Slug": "manawatu"
                    },
                    "IsMultiAllowed": true,
                    "Slug": "j-p-print-petone-c4",
                    "DateSlug": "20180910",
                    "RacingStreamAllowed": false,
                    "RacingReplayStreamAllowed": false
                },
                {
                    "EventID": 30362524,
                    "MasterEventID": 1047893,
                    "EventName": "Carisbrook Motors Pace",
                    "EventTypeDesc": "Trots",
                    "MasterEventName": "Races",
                    "AdvertisedStartTime": "2018-09-10T02:17:00Z",
                    "RaceNumber": 1,
                    "EventType": {
                        "EventTypeID": 2,
                        "EventTypeDesc": "Trots",
                        "MasterEventTypeID": 1,
                        "Slug": "harness-racing"
                    },
                    "Venue": {
                        "Venue": "Maryborough",
                        "StateCode": "VIC",
                        "Slug": "maryborough"
                    },
                    "IsMultiAllowed": true,
                    "Slug": "carisbrook-motors-pace",
                    "DateSlug": "20180910",
                    "RacingStreamAllowed": false,
                    "RacingReplayStreamAllowed": false
                },
                {
                    "EventID": 30404697,
                    "MasterEventID": 1049019,
                    "EventName": "Race 1 - 1400",
                    "EventTypeDesc": "Thoroughbred",
                    "MasterEventName": "Races",
                    "AdvertisedStartTime": "2018-09-10T02:20:00Z",
                    "RaceNumber": 1,
                    "EventType": {
                        "EventTypeID": 1,
                        "EventTypeDesc": "Thoroughbred",
                        "MasterEventTypeID": 1,
                        "Slug": "horse-racing"
                    },
                    "Venue": {
                        "Venue": "Mizusawa",
                        "StateCode": null,
                        "Slug": "mizusawa"
                    },
                    "IsMultiAllowed": true,
                    "Slug": "race-1-1400",
                    "DateSlug": "20180910",
                    "RacingStreamAllowed": false,
                    "RacingReplayStreamAllowed": false
                },
                {
                    "EventID": 30360464,
                    "MasterEventID": 1047850,
                    "EventName": "A1 Signage",
                    "EventTypeDesc": "Greyhounds",
                    "MasterEventName": "Races",
                    "AdvertisedStartTime": "2018-09-10T02:23:00Z",
                    "RaceNumber": 2,
                    "EventType": {
                        "EventTypeID": 3,
                        "EventTypeDesc": "Greyhounds",
                        "MasterEventTypeID": 1,
                        "Slug": "greyhound-racing"
                    },
                    "Venue": {
                        "Venue": "Ballarat",
                        "StateCode": "VIC",
                        "Slug": "ballarat"
                    },
                    "IsMultiAllowed": true,
                    "Slug": "a1-signage",
                    "DateSlug": "20180910",
                    "RacingStreamAllowed": false,
                    "RacingReplayStreamAllowed": false
                }
            ],
            "success": true
        }
    };

    const promise = Promise.resolve(mockResult);

    beforeAll(() => {
        sinon
            .stub(axios, 'get')
            .withArgs(API_URL)
            .returns(promise);
    });

    afterAll(() => {
        axios.get.restore();
    });

    it('stores data in local state', (done) => {
        const wrapper = mount(<App />);
        expect(wrapper.state().results).toEqual([]);

        promise.then((response) => {
            wrapper.update()
            expect(wrapper.state().results).toEqual(response.data.result);
            done();
        })
    });

    it('renders data when it fetched data successfully', (done) => {
        const wrapper = mount(<App />);
        expect(wrapper.find('p').text()).toEqual('Loading...');

        promise.then(() => {
          wrapper.update();
          expect(wrapper.find('.bodyRow')).toHaveLength(5);
          done();
        });
    });
});
