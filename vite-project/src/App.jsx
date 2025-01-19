import { useState , useEffect} from 'react'
import {ethers} from 'ethers'
import './App.css'
import Navbar from './Components/Navbar';
import Section from './Components/Section';
import Product from './Components/Product';

function App() {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [electronics, setElectronics] = useState([]);
  const [clothing, setClothing] = useState([]);
  const [toys, setToys] = useState([]);
  const [item, setItem] = useState({});
  const [toggle, setToggle] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state
 const togglePop = (item) =>{
  setItem(item);
  toggle ? setToggle(false) : setToggle(true);
  console.log("togglePop..")
 }
  const conttractAddress ="0x83a0b7f5d6fc9a4cd3dd46808026f592d72c59bf";
  const abi =[{"type":"constructor","inputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"buy","inputs":[{"name":"_id","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"payable"},{"type":"function","name":"items","inputs":[{"name":"","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"id","type":"uint256","internalType":"uint256"},{"name":"name","type":"string","internalType":"string"},{"name":"category","type":"string","internalType":"string"},{"name":"image","type":"string","internalType":"string"},{"name":"cost","type":"uint256","internalType":"uint256"},{"name":"ratting","type":"uint256","internalType":"uint256"},{"name":"stock","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"list","inputs":[{"name":"_id","type":"uint256","internalType":"uint256"},{"name":"_name","type":"string","internalType":"string"},{"name":"_category","type":"string","internalType":"string"},{"name":"_image","type":"string","internalType":"string"},{"name":"_cost","type":"uint256","internalType":"uint256"},{"name":"_ratting","type":"uint256","internalType":"uint256"},{"name":"_stock","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"name","inputs":[],"outputs":[{"name":"","type":"string","internalType":"string"}],"stateMutability":"view"},{"type":"function","name":"orderCount","inputs":[{"name":"","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"orders","inputs":[{"name":"","type":"address","internalType":"address"},{"name":"","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"time","type":"uint256","internalType":"uint256"},{"name":"item","type":"tuple","internalType":"struct Store.Item","components":[{"name":"id","type":"uint256","internalType":"uint256"},{"name":"name","type":"string","internalType":"string"},{"name":"category","type":"string","internalType":"string"},{"name":"image","type":"string","internalType":"string"},{"name":"cost","type":"uint256","internalType":"uint256"},{"name":"ratting","type":"uint256","internalType":"uint256"},{"name":"stock","type":"uint256","internalType":"uint256"}]}],"stateMutability":"view"},{"type":"function","name":"owner","inputs":[],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"withdraw","inputs":[],"outputs":[],"stateMutability":"nonpayable"},{"type":"event","name":"Buy","inputs":[{"name":"buyer","type":"address","indexed":false,"internalType":"address"},{"name":"orderId","type":"uint256","indexed":false,"internalType":"uint256"},{"name":"ItemId","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"List","inputs":[{"name":"name","type":"string","indexed":false,"internalType":"string"},{"name":"cost","type":"uint256","indexed":false,"internalType":"uint256"},{"name":"quantity","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false}];
  const load = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(provider);

      const network = await provider.getNetwork();
      console.log("Network:", network);

      const Contract = new ethers.Contract(conttractAddress, abi, provider);
      setContract(Contract);

      // Fetch items concurrently
      const items = await Promise.all(
        Array.from({ length: 9 }, (_, i) =>
          Contract.items(i + 1).catch(() => null) // Handle missing items gracefully
        )
      );

      // Filter out null responses and categorize
      const validItems = items.filter((item) => item);
      setElectronics(validItems.filter((item) => item.category === "electronics"));
      setClothing(validItems.filter((item) => item.category === "clothing"));
      setToys(validItems.filter((item) => item.category === "toys"));

      console.log("Electronics:", electronics);
      console.log("Clothing:", clothing);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false); // Set loading to false after fetch completes
    }
  };

  useEffect(() => {
    load();
  }, []);
  

  return (
    <>
      <div className='' >
        <Navbar account={account} setAccount={setAccount}/>
        <h3 className='text-center'>OokoStores Best Sellers</h3>
        {loading ? (
        <p className="text-center spinner-border text-primary d-flex align-items-center m-5">Loading products...</p>
      ) : (
        <>
          {electronics.length > 0 && (
            <Section
              title={"Electronics"}
              items={electronics}
              togglePop={togglePop}
            />
          )}
          {clothing.length > 0 && (
            <Section
              title={"Clothing and Jewelry"}
              items={clothing}
              togglePop={togglePop}
            />
          )}
          {toys.length > 0 && (
            <Section title={"Toys"} items={toys} togglePop={togglePop} />
          )}
        </>
      )}

        {toggle && (<Product item={item} provider={provider} contract={contract} account={account} togglePop={togglePop}/>)}        
      </div>
    </>
  )
}

export default App
