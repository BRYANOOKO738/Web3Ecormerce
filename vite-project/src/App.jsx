import { useState , useEffect} from 'react'
import {ethers} from 'ethers'
import './App.css'
import Navbar from './Components/Navbar';
import Section from './Components/Section';
import Product from './Components/Product';

function App() {
const [provider, setprovider] = useState(null);
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [electronics, setelectronics] = useState(null);
  const [clothing, setclothing] = useState(null);
  const [toys, settoys] = useState(null);
  const [item, setitem] = useState({});
  const [toggle, settoggle] = useState(false);
 const togglePop = (item) =>{
  setitem(item);
  toggle ? settoggle(false) : settoggle(true);
  console.log("togglePop..")
 }
  const conttractAddress = "0x83a0b7f5d6fc9a4cd3dd46808026f592d72c59bf";
  const abi =[{"type":"constructor","inputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"buy","inputs":[{"name":"_id","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"payable"},{"type":"function","name":"items","inputs":[{"name":"","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"id","type":"uint256","internalType":"uint256"},{"name":"name","type":"string","internalType":"string"},{"name":"category","type":"string","internalType":"string"},{"name":"image","type":"string","internalType":"string"},{"name":"cost","type":"uint256","internalType":"uint256"},{"name":"ratting","type":"uint256","internalType":"uint256"},{"name":"stock","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"list","inputs":[{"name":"_id","type":"uint256","internalType":"uint256"},{"name":"_name","type":"string","internalType":"string"},{"name":"_category","type":"string","internalType":"string"},{"name":"_image","type":"string","internalType":"string"},{"name":"_cost","type":"uint256","internalType":"uint256"},{"name":"_ratting","type":"uint256","internalType":"uint256"},{"name":"_stock","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"name","inputs":[],"outputs":[{"name":"","type":"string","internalType":"string"}],"stateMutability":"view"},{"type":"function","name":"orderCount","inputs":[{"name":"","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"orders","inputs":[{"name":"","type":"address","internalType":"address"},{"name":"","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"time","type":"uint256","internalType":"uint256"},{"name":"item","type":"tuple","internalType":"struct Store.Item","components":[{"name":"id","type":"uint256","internalType":"uint256"},{"name":"name","type":"string","internalType":"string"},{"name":"category","type":"string","internalType":"string"},{"name":"image","type":"string","internalType":"string"},{"name":"cost","type":"uint256","internalType":"uint256"},{"name":"ratting","type":"uint256","internalType":"uint256"},{"name":"stock","type":"uint256","internalType":"uint256"}]}],"stateMutability":"view"},{"type":"function","name":"owner","inputs":[],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"withdraw","inputs":[],"outputs":[],"stateMutability":"nonpayable"},{"type":"event","name":"Buy","inputs":[{"name":"buyer","type":"address","indexed":false,"internalType":"address"},{"name":"orderId","type":"uint256","indexed":false,"internalType":"uint256"},{"name":"ItemId","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"List","inputs":[{"name":"name","type":"string","indexed":false,"internalType":"string"},{"name":"cost","type":"uint256","indexed":false,"internalType":"uint256"},{"name":"quantity","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false}];
  const load = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    setprovider(provider);
    const network = await provider.getNetwork();
    // console.log(network);

    const Contract = new ethers.Contract(conttractAddress, abi,provider);
    setContract(Contract);

    const items = []

    for (var i = 0; i < 9; i++) {
      const item = await contract.items(i + 1)
      items.push(item)
    }
    console.log(items);
    const electronics = items.filter((item) => item.category === "electronics");
    const clothing = items.filter((item) => item.category === "clothing");
    const toys = items.filter((item) => item.category === "toys");
    setelectronics(electronics);
    setclothing(clothing);
    settoys(toys);
    console.log(electronics);
    console.log(clothing);

  };


  useEffect(() => {
    load();
  }, [])
  

  return (
    <>
      <div className='' >
        <Navbar account={account} setAccount={setAccount}/>
        <h3 className='text-center'>OokoStores Best Sellers</h3>
        {electronics && clothing && toys && (
          <>
          <Section title={"Clothing and Jewelry"} items={clothing} togglePop={togglePop}/>
          <Section title={"Electronics"} items={electronics} togglePop={togglePop}/>
          <Section title={"Toys"} items={toys} togglePop={togglePop}/>
          </>
        )}
        {toggle && (<Product item={item} provider={provider} contract={contract} account={account} togglePop={togglePop}/>)}        
      </div>
    </>
  )
}

export default App
