import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button, Modal, Form, InputGroup, Tab, Tabs } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Create from "./create";
import KlayPair from './klaypair';
import Kip7Pair from './kip7pair';
import '../../assets/css/Staking.css';

function Pair() {
    const [key, setKey] = useState('all');

    return (
        <div className='Pool'>
            <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3"
            >
                <Tab eventKey="all" title="ALL">
                    <h1>ALL Pair Pool List</h1>
                    <KlayPair />
                    <Kip7Pair />
                </Tab>
                <Tab eventKey="klay" title="KLAY PAIR">
                    <h1>KLAY Pair Pool List</h1>
                    <KlayPair />
                </Tab>
                <Tab eventKey="kip7" title="KIP7 PAIR">
                    <h1>KIP7 Pair Pool List</h1>
                    <Kip7Pair />
                </Tab>
            </Tabs>
            <Create />
        </div>
        
    );
}
  
export default Pair;