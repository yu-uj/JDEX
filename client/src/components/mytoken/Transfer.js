
function Transfer () {
    const Caver = require('caver-js');
    const caver = new Caver(new Caver.providers.WebsocketProvider("wss://public-node-api.klaytnapi.com/v1/baobab/ws"));
    const KIP7ABI = require('../../contract/build/contracts/KIP7.json');


    const to = "0xc041e30D61aa7b1c5FD2Ce4B9b4e6EC0d36141D9"; // 종대님꺼 주소
    const amount = 1000000000000000000n; // 토큰 1개
    const contract = new window.caver.klay.Contract(KIP7ABI, '0xa7AdB3953C03Ee7Cca887cEFE35266a0b5F1e45d'); // abi, contract 주소 
      
    // 토큰을 전송하는 매서드를 실행한다.
    const transfer = contract.methods.transfer(to, amount).send(
      	{
        	from : window.klaytn.selectedAddress, 
            gas: 8000000
        }); 
      console.log(transfer);
    // window.caver.klay
    //     .sendTransaction({
    //         type: 'SMART_CONTRACT_EXECUTION',
    //         from: '0xc041e30D61aa7b1c5FD2Ce4B9b4e6EC0d36141D9',
    //         to: '0x026Ad497d9B336A231C22B3ac20734106F69D422',
    //         contractAddress: '0xE807326D86f631495Bb9c1F8888604879c18E5BB',
    //         value: caver.utils.toPeb('100', 'KLAY'),
    //         gas: 8000000
    //     })
    //     .on('transactionHash', transactionHash => {
    //         console.log('txHash', transactionHash)
    //         this.setState({ txHash: transactionHash })
    //     })
    //     .on('receipt', receipt => {
    //         console.log('receipt', receipt)
    //         this.setState({ receipt: JSON.stringify(receipt) })
    //     })
    //     .on('error', error => {
    //         console.log('error', error)
    //         this.setState({ error: error.message })
    //     })

    window.caver.klay
        .sendTransaction({
            type: 'VALUE_TRANSFER',
            from: '0xf9CC29539Af906f0A990a183bf419c4A65040A5c', // 내 주소
            to: to, // 관리자 공개키 
            value: caver.utils.toPeb('1', 'KLAY'),
            gas: 8000000
        })
        .once('transactionHash', transactionHash => {
        })
        .once('receipt', receipt => {
            const recipientAddress = receipt.from;
        })
        .once('error', error => {
            alert('취소되었습니다.')
        })
    

    return (
        <div>
            asdasdasd
        </div>
    );
}

export default Transfer;