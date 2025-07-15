import { ethers } from "ethers"
import { WALLET_TYPES } from "../../reducer/wallet/walletTypes"
import loadMetaMask from "../../utility/onpageload/metamask"

export default function Navbar({ walletState, walletDispatch }) {


    const handleNetwork = async (event) => {

        await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: event.target.value }]
        })

        if (event.target.value == "0x24a") {
            walletDispatch({ type: WALLET_TYPES.SET_SYMBOL, payload: "Capy" })
        }
        else {
            walletDispatch({ type: WALLET_TYPES.SET_SYMBOL, payload: "Eth" })
        }
        await loadMetaMask(walletState, walletDispatch);
    }


    return (
        <div>
            <div className="grid grid-cols-[23%_77%] text-slate-50">
                <div className='bg-slate-800 font-bold text-2xl px-2 py-3 text-red-400'>dEx</div>
                <div className='bg-slate-900'>
                    <div className="flex flex-row-reverse gap-5 items-center py-3 p-3" >
                        <div className="inline-block px-6 py-2 border-2 border-red-600 text-white-600 font-medium text-xs leading-tight uppercase rounded hover:bg-white hover:bg-opacity-20 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">{`👛  ${walletState.walletAddress.slice(0, 5)}.....${walletState.walletAddress.slice(38, 42)}`}</div>
                        <div className="inline-block px-6 py-2 border-2 border-red-600 text-white-600 font-medium text-xs leading-tight uppercase rounded hover:bg-white hover:bg-opacity-20 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">{Number(walletState.balance).toFixed(2) + walletState.symbol}</div>
                        <div className="absolute left-[23%] text-slate-50 px-2">
                            @<select onChange={handleNetwork} className="border-none outline-none bg-slate-900 form-select py-1.5 text-base font-norma text-slate-300 " name="networks" id="networks">
                                <option className="border-none outline-none" value="0" disabled>select</option>
                                <option className="border-none outline-none" value="0x24a">CapyTestnet</option>
                                <option className="border-none outline-none" value="0" disabled>select</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
