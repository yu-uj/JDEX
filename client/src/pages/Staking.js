import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
// import { useSelector } from 'react-redux'
import { Card, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import { Route } from 'react-router-dom';
import { Pool, Single, Pair, Create } from '../components/staking'

function Staking () {

    return (
        <div className="Pool">
			
			<Single as={Link} to="/staking/single" />
			<Pair as={Link} to="/staking/pair" />

			<Create />
        </div>
    );
};

export default Staking;