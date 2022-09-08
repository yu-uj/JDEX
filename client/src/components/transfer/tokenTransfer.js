// import { useState } from "react";
// import { Card, Row, Col, Button, Modal, Form, InputGroup } from 'react-bootstrap';

// function tokenTransfer() {

//     const [show, setShow] = useState(false);

//     const handleShow = () => setShow(true);
// 	const handleClose = () => setShow(false);
      
//     return (
//         <div>
//             <h1>Token Transfer</h1>
//             <Row xs={1} md={1} className="g-4">
//             {Array.from({ length: 5 }).map((_, idx) => (
//                 <Col>
//                 <Card
//                     bg={'Secondary'}
//                     key={'Secondary'}
//                     text={'dark'}
//                     border={'Secondary'}
//                     style={{ width: '50rem' }}
//                     className="mb-2" 
//                 >
//                     <Card.Body>
//                     <Card.Title>Token1 / Token2 Name</Card.Title>
//                     <Card.Text>
//                         <p>총 예치규모</p>
//                         <p>내 보유량</p>
//                     </Card.Text>
//                     </Card.Body>
//                     <Card.Footer>
//                         <>
//                             <Button variant="primary" onClick={depositShow} >Deposit</Button>
//                             {/* <Button variant="primary" onClick={withdrawShow}>Withdraw</Button> */}
//                             <Modal
//                                 size="lg"
//                                 show={depo}
//                                 onHide={depositClose}
//                                 backdrop="static"
//                                 keyboard={false}
//                                 aria-labelledby="example-modal-sizes-title-sm"
//                             >
//                                 <Modal.Header closeButton>
//                                 {/* 선택한 카드의 풀 이름과 맵핑 */}
//                                 <Modal.Title>[토큰1,2이름] Deposit</Modal.Title>
//                                 </Modal.Header>
//                                 <Modal.Body>
//                                     <div>  
//                                         <h5>내 예치 자산</h5>
//                                         <strong>0{/*[예치한토큰갯수]*/}</strong>
//                                         <span>{/*[토큰심볼]*/}</span>
//                                         <br/>
//                                         <br/>                         
//                                         <h5>내 지분</h5>
//                                         <strong>[보유지분율]</strong>
//                                         <span>%</span>
//                                         <br/>
//                                         <br/> 
//                                     </div>
                                    
//                                     <Form>
//                                         {/* Withdraw Input  */}
//                                         {/* 토큰 이름, 심볼, 매핑 필요  */}
//                                         <Form.Label>Token1 Name</Form.Label> 
//                                         <InputGroup className="mb-3">
//                                             <Form.Control 
//                                                 type="text"
//                                                 placeholder="출금할 토큰1 수량"
//                                                 autoFocus
//                                                 aria-label="Default"
//                                                 aria-describedby="inputGroup-sizing-default"
//                                             />
//                                             <InputGroup.Text id="inputGroup-sizing-default">KLAY[토큰1심볼]</InputGroup.Text>
//                                         </InputGroup>

//                                         <Form.Label>Token2 Name</Form.Label> 
//                                         <InputGroup className="mb-3">
//                                             <Form.Control 
//                                                 type="text"
//                                                 placeholder="출금할 토큰2 수량"
//                                                 autoFocus
//                                                 aria-label="Default"
//                                                 aria-describedby="inputGroup-sizing-default"
//                                             />
//                                             <InputGroup.Text id="inputGroup-sizing-default">KLAY[토큰2심볼]</InputGroup.Text>
//                                         </InputGroup>
//                                     </Form>
//                                 </Modal.Body>
//                                 <Modal.Footer>
//                                 <Button variant="secondary" onClick={withdrawClose}>
//                                     취소
//                                 </Button>
//                                 <Button type="submit" variant="primary">확인</Button>
//                                 </Modal.Footer>
//                             </Modal>      
//                         </>
//                     </Card.Footer>
//                 </Card>
//                 </Col>
//             ))}
//             </Row>

//             <Create />

//         </div>
//     );
// }
  
// export default tokenTransfer;