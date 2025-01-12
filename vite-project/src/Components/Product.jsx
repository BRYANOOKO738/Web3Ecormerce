import React,{useState, useEffect} from 'react'
import Rating from './Rating'
import { ethers } from 'ethers'
import close from '../assets/close.svg'

const Product = ({item,provider, account,contract, togglePop}) => {
    const [order, setOrder] = useState(null)
    const [loading, setLoading] = useState(false);
  const [hasBought, setHasBought] = useState(false)
  if (!contract) {
    console.log("Contract not initialized");
    return;
  }


  const fetchDetails = async () => {
    const events = await contract.queryFilter("buy")
    const orders = events.filter(
      (event) => event.args.buyer === account && event.args.itemId.toString() === item.id.toString()
    )

    if (orders.length === 0) return

    const order = await contract.orders(account, orders[0].args.orderId)
    setOrder(order)
  }

  const buyHandler = async () => {
    try {
      console.log("Initiating purchase...");
      setLoading(true); // Add a loading state if you haven't
  
      // Get signer
      const signer = await provider.getSigner();
  
      // Check if user has enough ETH
      const balance = await signer.getBalance();
      if (balance.lt(item.cost)) {
        alert("Insufficient funds!");
        return;
      }
  
      // Execute purchase
      const transaction = await contract.connect(signer).buy(item.id, {
        value: item.cost
       
      });
  
      console.log("Transaction submitted:", transaction.hash);
  
      // Wait for transaction confirmation
      const receipt = await transaction.wait();
      console.log("Transaction confirmed:", receipt);
  
      // Update UI
      setHasBought(true);
      
    } catch (error) {
      console.error("Error during purchase:", error);
      alert(error.message || "Transaction failed!");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  useEffect(() => {
    fetchDetails()
  }, [hasBought])
  return (
    <div className="product bg-light m-5 rounded w-100" >
      <div className="product__details">
        <div className="product__image">
          <img src={item.image} alt="Product" />
        </div>
        <div className="product__overview">
          <h1>{item.name}</h1>

          <Rating value={item.rating} />

          <hr />

          <p>{item.address}</p>

          <h2>{item?.cost ? ethers.utils.formatUnits(item.cost.toString(), 'ether') : '0'} ETH</h2>

          <hr />

          <h2>Overview</h2>

          <p>
            {item.description}

            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima rem, iusto,
            consectetur inventore quod soluta quos qui assumenda aperiam, eveniet doloribus
            commodi error modi eaque! Iure repudiandae temporibus ex? Optio!
          </p>
        </div>

        <div className="product__order">
          <h1>{item?.cost ? ethers.utils.formatUnits(item.cost.toString(), 'ether') : '0'} ETH</h1>

          <p>
            FREE delivery <br />
            <strong>
              {new Date(Date.now() + 345600000).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
            </strong>
          </p>

          {item.stock > 0 ? (
            <p>In Stock.</p>
          ) : (
            <p>Out of Stock.</p>
          )}

          <button className='product__buy bg-warning' onClick={buyHandler} disabled={loading || hasBought}>
          {loading ? 'Processing...' : hasBought ? 'Purchased' : 'Buy'}
          </button>

          <p><small>Ships from</small> OokoStores</p>
          <p><small>Sold by</small> OokoStores</p>

          {order && (
  <div className='product__bought'>
    Item bought on <br />
    <strong>
      {new Date(order.time.toNumber() * 1000).toLocaleDateString(
        undefined,
        {
          weekday: 'long',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric'
        }
      )}
    </strong>
  </div>
)}
        </div>


        <button onClick={togglePop} className="product__close">
          <img src={close} alt="Close" />
        </button>
      </div>
    </div >
  )
}

export default Product