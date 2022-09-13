

const Testpage = () => {

    const Caver = require('caver-js');
    const caver = new Caver(new Caver.providers.WebsocketProvider("wss://public-node-api.klaytnapi.com/v1/baobab/ws"));

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
            from: '0xf9CC29539Af906f0A990a183bf419c4A65040A5c',
            to: '0x026Ad497d9B336A231C22B3ac20734106F69D422', // 관리자 공개키 
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
};

export default Testpage;