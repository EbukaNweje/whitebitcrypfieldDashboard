import {FaHandHoldingDollar} from "react-icons/fa6";
import {FaAngleDown} from "react-icons/fa";
import "./TradingPlans.css";
import {IoWalletOutline} from "react-icons/io5";
import {useEffect, useState} from "react";
import {useSelector} from 'react-redux'
import { useNavigate, useParams } from "react-router";


const TradingPlans = () => {
    const [showSelect, setShowSelect] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState(null)
    const[planPrice, setPlanPrice] = useState(0)
    console.log(planPrice)
    // const [boxPrice, setBoxPrice] = useState(0)
    // console.log(selectedPackage.name)
    
    const userData = useSelector((state) => state.persisitedReducer.user)

    const handleShowSelect = () => {
        setShowSelect(!showSelect);
    };

    const [disabledBtn, setDisabledBtn] = useState(false);
    const [info, setInfo] = useState('')
    const [error, setError] = useState(false)

    const packageDatas = [
        {
            name: 'Starter Package',
            duration: 42,
            price: "100,000",
            minimumDeposit: "10,000",
            maximunDeposit: "100,000",
            minimumReturn: "200",
            maximumReturn: "350",
            // bonus: 0,
            selected: true,
        },
        {
            name: 'Premium Package',
            duration: 35,
            price: "500,000",
            minimumDeposit: "110,000",
            maximunDeposit: "500,000",
            minimumReturn: "350",
            maximumReturn: "600",
            // bonus: 0,
            selected: true,
        },
        {
            name: 'Deluxe Package',
            duration: 28,
            price: "1,000,000",
            minimumDeposit: "510000",
            maximunDeposit: "1,000,000",
            minimumReturn: "600",
            maximumReturn: "1,100",
            // bonus: 0,
            selected: true,
        },
    ]

    const [currentPackage, setCurrentPackage] = useState("")
    console.log(currentPackage)

    const nav = useNavigate()
    const { id } = useParams();

        const checkAmount = () => {
            if(!planPrice){
                alert("Please input a deposit amount")
            }else if (!selectedPackage) {
            alert("Please select a package");
            } else {
            const planPriceNumber = parseFloat(planPrice.replace(/,/g, ''));
            const minDepositNumber = parseFloat(selectedPackage.minimumDeposit.replace(/,/g, ''));
        
            if (isNaN(planPriceNumber) || isNaN(minDepositNumber)) {
                alert("Invalid plan price or minimum deposit");
            } else if (planPriceNumber < minDepositNumber) {
                alert(`${selectedPackage.name} minimum deposit should be at least $${minDepositNumber}`);
            } else {
                console.log("Making Plan...");
                alert("Success.....");
                window.location.reload()
            }
            }
        };

    // const amountBox = [
    //     100,
    //     250,
    //     500,
    //     1000,
    //     1500,
    //     2000,
    // ]

    const validateSubmit = () =>{
        if(userData.accountBalance <= 3){
            setDisabledBtn(true)
            setInfo('Insufficient funds')
            setError(true)
        } else if (planPrice > userData.us){
            setDisabledBtn(true)
            setInfo('Insufficient funds')
            setError(true)
        }else {
            setDisabledBtn(false)
            setInfo('')
            setError(false)
        }
    }

    useEffect(()=>{
        validateSubmit()
    },[])


    return (
        <>
            <div className="TradingPlansBody">
                <h1>Get started with your investment</h1>
                <div className="TradingPlansContent">
                    <div className="TradingPlansLeft">
                        <div className="TradingPlansLeftBoxA">
                            <div
                                className="TradingPlansLeftBoxAMain"
                                onClick={handleShowSelect}
                            >
                                <h3>
                                    <span>
                                        <FaHandHoldingDollar />
                                    </span>
                                    {
                                        selectedPackage !== null ? `${selectedPackage.name}` : 'SELECT PACKAGE'
                                    }
                                </h3>
                                <p
                                    className={`Angle ${
                                        showSelect ? "active" : ""
                                    }`}
                                >
                                    <FaAngleDown />
                                </p>
                            </div>
                            <div
                                className={`TradingPlansLeftBoxADrop ${
                                    showSelect ? "active" : ""
                                }`}
                            >
                                {
                                    packageDatas?.map((item, index)=>(
                                        <div key={index} className="TradingPlansLeftBoxADropItem" onClick={()=>{
                                            handleShowSelect()
                                            setSelectedPackage(item);
                                            if(item.name === "Starter Package"){
                                                setCurrentPackage("Starter Package")
                                            }else if (item.name === "Premium Package"){
                                                setCurrentPackage("Premium Package")
                                            }else if (item.name === "Deluxe Package"){
                                                setCurrentPackage("Deluxe Package")
                                            }else {
                                                setCurrentPackage("");
                                            }
                                        }}>
                                    <h3>
                                        <span>
                                            <FaHandHoldingDollar />
                                        </span>
                                        {item.name}
                                    </h3>
                                </div>
                                    ))
                                }
                                
                                {/* <div className="TradingPlansLeftBoxADropItem" onClick={handleShowSelect}>
                                    <h3>
                                        <span>
                                            <FaHandHoldingDollar />
                                        </span>
                                        DELUXE PACKAGE
                                    </h3>
                                </div>
                                <div className="TradingPlansLeftBoxADropItem" onClick={handleShowSelect}>
                                    <h3>
                                        <span>
                                            <FaHandHoldingDollar />
                                        </span>
                                        ULTIMATE PACKAGE
                                    </h3>
                                </div> */}
                            </div>
                        </div>

                        {/* <div className="TradingPlansLeftBoxB">
                            <p>Choose Quick Amount to Invest</p>
                            <div className="TradingPlansLeftBoxBItem">
                                {
                                    amountBox.map((item, index) =>(
                                        <div key={index} className="TradingPlansLeftBoxBAmount" onClick={()=>{
                                            setBoxPrice(item)
                                            setPlanPrice(item)
                                        }
                                        }>
                                    ${item}
                                </div>
                                    ))
                                }
                                
                            </div>
                        </div> */}
                        
                        <div className="TradingPlansLeftBoxC">
                            <p>Enter Your Amount</p>
                            <input type="number" min={0} placeholder="0" onChange={(e)=> {
                                setPlanPrice(e.target.value)
                            }
                            }/>
                        </div>
                        <div className="TradingPlansLeftBoxD">
                            <p>Available balance <span style={{color: 'red'}}>{error ? `${info}` : null}</span></p>
                            <div className="TradingPlansLeftBoxDDiv">
                                <div className="TradingPlansLeftBoxDItem">
                                    <IoWalletOutline className="IoWalletOutline" />
                                    <p>
                                        Account Balance <span >${userData?.accountBalance}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="TradingPlansRight">
                        <h3>Your Investment Details</h3>
                        <div className="TradingPlansRightBox">
                            {
                                selectedPackage && (<>
                                    <div className="TradingPlansRightBoxRow1">
                                <div className="TradingPlansRightBoxRow1L">
                                    <h5>Name of plan</h5>
                                    <p>{selectedPackage.name}</p>
                                </div>
                                <div className="TradingPlansRightBoxRow1R">
                                    <h5>Plan Price</h5>
                                    <p>{selectedPackage.price}</p>
                                </div>
                            </div>
                            {/* <div className="TradingPlansRightBoxRow1">
                                <div className="TradingPlansRightBoxRow1L">
                                    <h5>Duration</h5>
                                    <p>{selectedPackage.duration} Days</p>
                                </div>
                                <div className="TradingPlansRightBoxRow1R">
                                    <h5>Profit</h5>
                                    <p>{selectedPackage.profit}% Daily</p>
                                </div>
                            </div> */}
                            <div className="TradingPlansRightBoxRow1">
                                <div className="TradingPlansRightBoxRow1L">
                                    <h5>Minimum Deposit</h5>
                                    <p>${selectedPackage.minimumDeposit}</p>
                                </div>
                                <div className="TradingPlansRightBoxRow1R">
                                    <h5>Maximum Deposit</h5>
                                    <p>${selectedPackage.maximunDeposit}</p>
                                </div>
                            </div>
                            <div className="TradingPlansRightBoxRow1">
                                <div className="TradingPlansRightBoxRow1L">
                                    <h5>Minimum Return</h5>
                                    <p>{selectedPackage.minimumReturn}%</p>
                                </div>
                                <div className="TradingPlansRightBoxRow1R">
                                    <h5>Maximum Return</h5>
                                    <p>{selectedPackage.maximumReturn}%</p>
                                </div>
                            </div>
                            <div className="TradingPlansRightBoxRow2">
                                <div className="TradingPlansRightBoxRow1L">
                                <h5>Duration</h5>
                                <p>{selectedPackage.duration} Days</p>
                                </div>
                            </div>
                                </>)
                            }
                            
                        </div>
                        <div className="TradingPlansRightBoxPay">
                            <div className="TradingPlansRightBoxPayTop">
                                <p>
                                    Payment method: <span>Account Balance</span>
                                </p>
                            </div>
                            <div className="TradingPlansRightBoxPayDown">
                                <p>
                                    Amount to invest: <span>${planPrice}</span>
                                </p>
                                <button onClick={checkAmount}>Confirm & Invest</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TradingPlans;
