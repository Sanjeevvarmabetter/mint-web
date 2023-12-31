import React from 'react';

const NavBar = ({accounts, setAccounts}) => {
    const isConnected = Boolean(accounts[0]);

    async function connectAccount() {
        if (window.ethereum) {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            setAccounts(accounts);
        }
    }

    return (
        <div>

            <div>Discord</div>
            <div>Github</div>
            <div>Email</div>

            <div>About</div>
            <div>Discord</div>
            <div>team</div>

            {isConnected ?(
                <p>Connected</p>
            ): (
                <button onClick={connectAccount}>Connect</button>
            )}

        </div>
    );

};