import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { Component } from "react";

function DashBoard() {

    return (

        <div>
            <h1>DashBoard</h1>
            <Container>
                <Row>
                    <Col xs={10} md={6}>
                        <img src="img/sol.jpeg" />

                    </Col>
                    <Col xs={4} md={4}>
                        <div><br></br><h3>현재 claim된 amount보여주기</h3><br></br><br></br><br></br><br></br></div>
                        <div><br></br><h3>보상 token Staking amount 보여주기</h3><br></br><br></br><br></br><br></br></div>
                        <div>
                            asdsad
                        </div>
                    </Col>
                </Row>

            </Container>
        </div>
    );
};

export default DashBoard;