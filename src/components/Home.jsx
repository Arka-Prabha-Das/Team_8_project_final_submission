/* eslint-disable react/no-unknown-property */

import ownerBackground from "../assets/background.jpg";
import working from "../assets/working.jpeg";
import audi from "../assets/audi.jpg";
import bmw from "../assets/bmw.jpeg";
import cooper from "../assets/cooper.jpeg";
import lexus from "../assets/lexus.jpeg";
import porshe from "../assets/porshe.jpeg";
import benz from "../assets/benz.jpeg";
import coupe from "../assets/coupe.jpeg";
import sedan from "../assets/sedan.jpeg";
import xuv from "../assets/xuv.jpeg";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const navigate = useNavigate();
  const user = useSelector(store => store.user);
  const [isCustomer, setISCustomer] = useState(true);
  useEffect(() => {
    if (user?.role === 1) {
      setISCustomer(false);
    }
    else { setISCustomer(true) }
  }, [user])
  return (
    <div>
      {isCustomer ?
        <>
          <div className="w-full h-[100vh] mx-auto">
            <div className="bg-[rgba(250,250,250,0.7)] h-[20vh] mb-5 flex flex-col justify-between w-full">
              <Header />
            </div>
            <div className="flex flex-col w-[90%] ml-20 lg:ml-0 lg:w-[45%]  justify-end lg:absolute lg:top-0 right-0 -z-10">
              <img src="/src/assets/hero-bg.png" alt="" />
            </div>
            <div className="flex w-[100%] px-4 flex-col-reverse lg:px-32 lg:mt-16 lg:flex-row">
              <div className="flex flex-col text-center lg:mt-16 lg:text-start">
                <span className="lg:text-2xl font-extrabold mt-6">Plan your trip now</span>
                <span className=" text-xl lg:text-6xl leading-12 font-extrabold mt-4">Save big with our car rental</span>
                <span className="mt-4 text-gray-400">Rent the car of your dreams. Unbeatable prices, unlimited miles, flexible pick-up options and much more.</span>
                <div className="mt-8">
                  <button className="p-4 px-8 rounded-sm shadow-sm bg-[#1247e6] text-white" onClick={() => { user && navigate("/cars") }}>Book Ride</button>
                </div>
              </div>
              <div>
                <img src="/src/assets/main-car.png" alt="" />
              </div>
            </div>
          </div>
          <div className="text-center text-black">
            <h1 className="text-4xl font-bold">First Class Rental Services</h1>
            <h1 className="text-gray-400">We offer professional car rental & limousine services in our range of high-end vehicles</h1>
            <div className="flex flex-wrap gap-10 justify-center my-10">
              <div
                className="bg-cover bg-center w-96 h-80 rounded-md text-2xl font-bold text-white hover:shadow-md hover:-translate-y-1"
                style={{ backgroundImage: `url(${audi})` }}
                onClick={() => { user && navigate("/cars", { state: { "brand": "audi", "type": "" } }) }}
              ><div className="bg-[rgb(0,0,0,0.3)] w-[100%] h-[100%] rounded-md flex  flex-col justify-end text-start p-4">Audi</div></div>
              <div
                className="bg-cover bg-center w-96 h-80 rounded-md text-2xl font-bold text-white hover:shadow-md hover:-translate-y-1"
                style={{ backgroundImage: `url(${bmw})` }}
                onClick={() => { user && navigate("/cars", { state: { "brand": "bmw", "type": "" } }) }}
              ><div className="bg-[rgb(0,0,0,0.3)] w-[100%] h-[100%]  rounded-md flex  flex-col justify-end text-start p-4">BMW</div></div>
              <div
                className="bg-cover bg-center w-96 h-80 rounded-md text-2xl font-bold text-white hover:shadow-md hover:-translate-y-1"
                style={{ backgroundImage: `url(${cooper})` }}
                onClick={() => { user && navigate("/cars", { state: { "brand": "mini", "type": "" } }) }}
              ><div className="bg-[rgb(0,0,0,0.3)] w-[100%] h-[100%] rounded-md flex  flex-col justify-end text-start p-4">Mini</div></div>
              <div
                className="bg-cover bg-center w-96 h-80 rounded-md text-2xl font-bold text-white hover:shadow-md hover:-translate-y-1"
                style={{ backgroundImage: `url(${lexus})` }}
                onClick={() => { user && navigate("/cars", { state: { "brand": "lexus", "type": "" } }) }}><div className="bg-[rgb(0,0,0,0.3)] w-[100%] h-[100%] rounded-md flex  flex-col justify-end text-start p-4">Lexus</div></div>
              <div
                className="bg-cover bg-center w-96 h-80 rounded-md text-2xl font-bold text-white hover:shadow-md hover:-translate-y-1"
                style={{ backgroundImage: `url(${porshe})` }}
                onClick={() => { user && navigate("/cars", { state: { "brand": "porsche", "type": "" } }) }}
              ><div className="bg-[rgb(0,0,0,0.3)] w-[100%] h-[100%] rounded-md flex  flex-col justify-end text-start p-4">Porshe</div></div>
              <div
                className="bg-cover bg-center w-96 h-80 rounded-md text-2xl font-bold text-white hover:shadow-md hover:-translate-y-1"
                style={{ backgroundImage: `url(${benz})` }}
                onClick={() => { user && navigate("/cars", { state: { "brand": "benz", "type": "" } }) }}
              ><div className="bg-[rgb(0,0,0,0.3)] w-[100%] h-[100%] rounded-md flex  flex-col justify-end text-start p-4">Benz</div></div>
            </div>
          </div>
          <div className="text-center text-black mt-10">
            <h1 className="text-4xl font-bold">Find Car by Type</h1>
            <h1 className="text-gray-400">We offer professional car rental & limousine services in our range of high-end vehicles</h1>
            <div className="flex flex-wrap gap-10 justify-center my-10">

              <div
                className="bg-cover bg-center w-96 h-80 rounded-md text-2xl font-bold text-white hover:shadow-md hover:-translate-y-1"
                style={{ backgroundImage: `url(${coupe})` }}
                onClick={() => navigate("/cars", { state: { "brand": "", "type": "coupe" } })}
              ><div className="bg-[rgb(0,0,0,0.3)] w-[100%] h-[100%] rounded-md flex  flex-col justify-end text-start p-4">Coupe</div></div>
              <div
                className="bg-cover bg-center w-96 h-80 rounded-md text-2xl font-bold text-white hover:shadow-md hover:-translate-y-1"
                style={{ backgroundImage: `url(${sedan})` }}
                onClick={() => navigate("/cars", { state: { "brand": "", "type": "sedan" } })}
              ><div className="bg-[rgb(0,0,0,0.3)] w-[100%] h-[100%]  rounded-md flex  flex-col justify-end text-start p-4">Sedan</div></div>
              <div
                className="bg-cover bg-center w-96 h-80 rounded-md text-2xl font-bold text-white hover:shadow-md hover:-translate-y-1"
                style={{ backgroundImage: `url(${xuv})` }}
                onClick={() => navigate("/cars", { state: { "brand": "", "type": "suv" } })}
              ><div className="bg-[rgb(0,0,0,0.3)] w-[100%] h-[100%] rounded-md flex  flex-col justify-end text-start p-4">SUV</div></div>
            </div>
          </div>
          <div className="bg-cover bg-center w-[100vw] h-[60vh]"
            style={{ backgroundImage: `url(${working})` }} >
            <div className="bg-[rgb(0,0,0,0.5)] w-[100%] h-[100%] text-center flex flex-col justify-center">
              <div className="text-4xl font-semibold text-white">HOW DOES OUR RENTAL WORK</div>
              <div className="mt-20 flex gap-10 justify-center align-middle">
                <div className="text-white flex h-12 w-[20%]">
                  <svg xmlns="//www.w3.org/2000/svg" height="80" viewBox="0 0 512 512" width="100" fill="white"><g id="outline"><path d="m88.014 339.7a174.75 174.75 0 0 0 119.832 47.242c2.113 0 4.237-.038 6.359-.112a174.716 174.716 0 0 0 98.621-34.469l119.174 111.05q.559.52 1.139 1.013a31.737 31.737 0 0 0 20.649 7.576c.384 0 .771-.006 1.156-.02a32 32 0 0 0 20.688-55.391l-119.174-111.054a176.085 176.085 0 0 0 -28.471-223.36c-71-66.162-182.587-62.225-248.747 8.773a176 176 0 0 0 8.774 248.752zm376.71 88.6a16 16 0 0 1 -21.816 23.411l-81.938-76.361 21.815-23.411zm-93.644-87.269-21.816 23.412-23.941-22.31q5.928-5.32 11.438-11.212t10.378-12.2zm-280.135-239.175c60.148-64.544 161.589-68.122 226.134-7.976a160.059 160.059 0 0 1 22.589 208.006c-.05.065-.094.134-.141.2a162.384 162.384 0 0 1 -31.458 33.726l-.04.034a160.014 160.014 0 0 1 -217.084-233.99z"></path><path d="m88 218.935h17.013a32 32 0 0 0 61.974 0h74.026a32 32 0 0 0 62.423-2.046l19.094-6.365a8 8 0 0 0 5.47-7.589v-24a32.053 32.053 0 0 0 -26.849-31.586l-8.191-16.384a28.843 28.843 0 0 0 -25.939-16.03h-80.521a29.136 29.136 0 0 0 -23.2 11.6l-15.662 20.882-39.607 4.951a32.05 32.05 0 0 0 -28.031 31.753v26.814a8 8 0 0 0 8 8zm48 8a16 16 0 1 1 16-16 16.019 16.019 0 0 1 -16 16zm136 0a16 16 0 1 1 16-16 16.019 16.019 0 0 1 -16 16zm-24-96h19.021a12.927 12.927 0 0 1 11.628 7.186l4.407 8.814h-35.056zm-71.9 5.2a13.058 13.058 0 0 1 10.4-5.2h45.5v16h-64zm-80.1 47.986a16.025 16.025 0 0 1 14.016-15.876l42.48-5.31h143.504a16.018 16.018 0 0 1 16 16v18.233l-9.78 3.261a32 32 0 0 0 -61.207 2.506h-74.026a32 32 0 0 0 -61.974 0h-9.013z"></path><path d="m296 258.935h-176a8 8 0 0 0 -8 8v32a8 8 0 0 0 8 8h176a8 8 0 0 0 8-8v-32a8 8 0 0 0 -8-8zm-40 32h-128v-16h128zm32 0h-16v-16h16z"></path></g></svg>
                  <h1>Find Car</h1>
                </div>
                <svg xmlns="//www.w3.org/2000/svg" id="svg10654" height="40" viewBox="0 0 6.3499999 6.3500002" width="40" fill="white"><g id="layer1" transform="translate(0 -290.65)"><path id="path9429" d="m2.2580394 291.96502a.26460982.26460982 0 0 0 -.1741496.46871l1.6190225 1.38699-1.6190225 1.38648a.26460982.26460982 0 1 0 .3436483.40049l1.8536335-1.58595a.26460982.26460982 0 0 0 0-.40256l-1.8536335-1.5875a.26460982.26460982 0 0 0 -.1694987-.0667z"></path></g></svg>
                <div className="text-white flex h-12 w-[20%]">
                  <svg xmlns="//www.w3.org/2000/svg" viewBox="0 0 64 64" width="80" height="80" fill="white"><g id="car"><path d="M32,55h0a1,1,0,0,1-.8945-.5527L25.7607,43.7661a2.8958,2.8958,0,0,0-1.4062-1.3667,19.0022,19.0022,0,1,1,15.3047-.0063,2.9214,2.9214,0,0,0-1.419,1.3725L32.8945,54.4478A1.0009,1.0009,0,0,1,32,55ZM31.9766,7.9985A16.8064,16.8064,0,0,0,20.666,12.33a17.005,17.005,0,0,0,4.4951,28.24A4.9056,4.9056,0,0,1,27.55,42.8716L32,51.7656l4.4512-8.895a4.9281,4.9281,0,0,1,2.4-2.3071A17.0056,17.0056,0,0,0,33.9482,8.1079,17.9157,17.9157,0,0,0,31.9766,7.9985Z"></path><path d="M32,39A14,14,0,1,1,46,25,14.0158,14.0158,0,0,1,32,39Zm0-26A12,12,0,1,0,44,25,12.0134,12.0134,0,0,0,32,13Z"></path><path d="M32,59c-8.9932,0-26-1.3584-26-6.5,0-4.2554,12.12-6.1343,22.5-6.45a1.0242,1.0242,0,0,1,1.03.9692,1.0007,1.0007,0,0,1-.97,1.03C14.8711,48.4658,8,51.127,8,52.5,8,54.0273,16.4707,57,32,57s24-2.9727,24-4.5c0-1.373-6.8672-4.0342-20.55-4.4507a1,1,0,0,1,.0293-2l.0312.0005C45.8857,46.3662,58,48.2446,58,52.5,58,57.6416,40.9932,59,32,59Z"></path><path d="M38,30H26a2.0023,2.0023,0,0,1-2-2V24a2.0023,2.0023,0,0,1,2-2H38a2.0023,2.0023,0,0,1,2,2v4A2.0023,2.0023,0,0,1,38,30ZM26,24v4H38.001L38,24Z"></path><path d="M37,24H27a1,1,0,0,1-.9863-1.1646l.5547-3.3286A2.9918,2.9918,0,0,1,29.5273,17h4.9454a2.9918,2.9918,0,0,1,2.9589,2.5063l.5547,3.3291A1,1,0,0,1,37,24Zm-8.8193-2h7.6386l-.36-2.1641A.9977.9977,0,0,0,34.4727,19H29.5273a.9977.9977,0,0,0-.9863.8364Z"></path><path d="M25.8555,23.854a.9989.9989,0,0,1-.9092-.5815L24.3594,22H24a1,1,0,0,1,0-2h1a1,1,0,0,1,.9082.5815l.8545,1.854a1,1,0,0,1-.9072,1.4185Z"></path><path d="M38.1445,23.854a1,1,0,0,1-.9072-1.4185l.8545-1.854A1,1,0,0,1,39,20h1a1,1,0,0,1,0,2h-.3594l-.5869,1.2725A1,1,0,0,1,38.1445,23.854Z"></path><circle cx="28" cy="26" r="1"></circle><circle cx="36" cy="26" r="1"></circle><path d="M28.75,33h-1.5A2.2528,2.2528,0,0,1,25,30.75V29a1,1,0,0,1,1-1h4a1,1,0,0,1,1,1v1.75A2.2528,2.2528,0,0,1,28.75,33ZM27,30v.75a.25.25,0,0,0,.25.25h1.5a.25.25,0,0,0,.25-.25V30Z"></path><path d="M36.75,33h-1.5A2.2528,2.2528,0,0,1,33,30.75V29a1,1,0,0,1,1-1h4a1,1,0,0,1,1,1v1.75A2.2528,2.2528,0,0,1,36.75,33ZM35,30v.75a.25.25,0,0,0,.25.25h1.5a.25.25,0,0,0,.25-.25V30Z"></path><path d="M33,27H31a1,1,0,0,1,0-2h2a1,1,0,0,1,0,2Z"></path></g></svg>
                  <h1> Select location</h1>
                </div>
                <svg xmlns="//www.w3.org/2000/svg" id="svg10654" height="40" viewBox="0 0 6.3499999 6.3500002" width="40" fill="white"><g id="layer1" transform="translate(0 -290.65)"><path id="path9429" d="m2.2580394 291.96502a.26460982.26460982 0 0 0 -.1741496.46871l1.6190225 1.38699-1.6190225 1.38648a.26460982.26460982 0 1 0 .3436483.40049l1.8536335-1.58595a.26460982.26460982 0 0 0 0-.40256l-1.8536335-1.5875a.26460982.26460982 0 0 0 -.1694987-.0667z"></path></g></svg>
                <div className="text-white flex h-12 w-[20%]">
                  <svg xmlns="//www.w3.org/2000/svg" id="Layer_1" height="80" viewBox="0 0 124 124" width="100" fill="white"><path d="m118.052 26.953-88.813-15.842c-3.892-.7-7.673 2.023-8.348 5.894l-5.72 32.814h-8.171c-3.86 0-7 3.141-7 7v49.18c0 3.859 3.14 7 7 7h90.587c3.86 0 7-3.141 7-7v-17.293c2.595.463 5.1 1.009 7.499-.426 1.8-1.077 3.091-2.934 3.452-5.003l8.352-47.916c.687-3.941-1.932-7.713-5.838-8.408zm-93.22-9.261c.3-1.719 1.968-2.954 3.705-2.644l88.813 15.842c1.743.311 2.909 2.008 2.6 3.783l-1.378 7.91-95.122-16.966zm75.755 88.307c0 1.654-1.346 3-3 3h-90.587c-1.654 0-3-1.346-3-3v-49.18c0-1.654 1.346-3 3-3h90.587c1.654 0 3 1.346 3 3zm11.011-23.409c-.622 3.557-4.572 2.488-7.011 2.053v-27.824c0-3.859-3.14-7-7-7h-78.355l3.531-20.262 5.794 1.033 89.327 15.933z"></path><path d="m47.119 101.003h-11.5c-1.104 0-2-.896-2-2s.896-2 2-2h11.5c1.104 0 2 .896 2 2s-.895 2-2 2z"></path><path d="m25.271 101.003h-11.5c-1.104 0-2-.896-2-2s.896-2 2-2h11.5c1.104 0 2 .896 2 2s-.896 2-2 2z"></path><path d="m68.967 101.003h-11.5c-1.104 0-2-.896-2-2s.896-2 2-2h11.5c1.104 0 2 .896 2 2s-.895 2-2 2z"></path><path d="m90.816 101.003h-11.5c-1.104 0-2-.896-2-2s.896-2 2-2h11.5c1.104 0 2 .896 2 2s-.896 2-2 2z"></path><path d="m30.438 90.627h-14.486c-2.757 0-5-2.243-5-5v-5.744c0-2.757 2.243-5 5-5h14.486c2.757 0 5 2.243 5 5v5.744c0 2.756-2.244 5-5 5zm-14.486-11.745c-.551 0-1 .448-1 1v5.744c0 .552.449 1 1 1h14.486c.551 0 1-.448 1-1v-5.744c0-.552-.449-1-1-1z"></path></svg>
                  <h1>Place your Order</h1>
                </div>
              </div>
            </div>

          </div> 
          </> :
        <div>
          <div
            className="bg-cover bg-center  flex flex-col gap-[30%] w-[100vw] h-[90vh]"
            style={{ backgroundImage: `url(${ownerBackground})` }}
          >
            <div className="bg-[rgba(250,250,250,0.7)] h-[20vh] flex flex-col justify-between">
              <Header />
            </div>
            <div>
              <div className="w-[100%] text-center text-white">
                <h1 className="text-3xl lg:text-8xl font-semibold ">RENT YOUR CAR </h1>
                <h1 className="lg:text-xl mt-2">Use our service to rent your car and start earning</h1>
                <button className="py-4 px-3 bg-green-200 rounded-md mt-10 text-black" onClick={() => { user && navigate("/cars") }}>Get Started</button>
              </div>
            </div>
          </div>
          <div className="text-center text-black mt-10">
            <h1 className="text-4xl font-bold">Find Car by Type</h1>
            <h1 className="text-gray-400">We offer professional car rental & limousine services in our range of high-end vehicles</h1>
            <div className="flex flex-wrap gap-10 justify-center my-10">

              <div
                className="bg-cover bg-center w-96 h-80 rounded-md text-2xl font-bold text-white hover:shadow-md hover:-translate-y-1"
                style={{ backgroundImage: `url(${coupe})` }}
                onClick={() => navigate("/cars", { state: { "brand": "", "type": "coupe" } })}
              ><div className="bg-[rgb(0,0,0,0.3)] w-[100%] h-[100%] rounded-md flex  flex-col justify-end text-start p-4">Coupe</div></div>
              <div
                className="bg-cover bg-center w-96 h-80 rounded-md text-2xl font-bold text-white hover:shadow-md hover:-translate-y-1"
                style={{ backgroundImage: `url(${sedan})` }}
                onClick={() => navigate("/cars", { state: { "brand": "", "type": "sedan" } })}
              ><div className="bg-[rgb(0,0,0,0.3)] w-[100%] h-[100%]  rounded-md flex  flex-col justify-end text-start p-4">Sedan</div></div>
              <div
                className="bg-cover bg-center w-96 h-80 rounded-md text-2xl font-bold text-white hover:shadow-md hover:-translate-y-1"
                style={{ backgroundImage: `url(${xuv})` }}
                onClick={() => navigate("/cars", { state: { "brand": "", "type": "suv" } })}
              ><div className="bg-[rgb(0,0,0,0.3)] w-[100%] h-[100%] rounded-md flex  flex-col justify-end text-start p-4">SUV</div></div>
            </div>
          </div>
          <div className="bg-cover bg-center w-[100vw] h-[60vh]"
            style={{ backgroundImage: `url(${working})` }} >
            <div className="bg-[rgb(0,0,0,0.5)] w-[100%] h-[100%] text-center flex flex-col justify-center">
              <div className="text-4xl font-semibold text-white">HOW DOES OUR RENTAL WORK</div>
              <div className="mt-20 flex gap-10 justify-center align-middle">
                <div className="text-white flex h-12 w-[20%]">
                  <svg xmlns="//www.w3.org/2000/svg" height="80" viewBox="0 0 512 512" width="100" fill="white"><g id="outline"><path d="m88.014 339.7a174.75 174.75 0 0 0 119.832 47.242c2.113 0 4.237-.038 6.359-.112a174.716 174.716 0 0 0 98.621-34.469l119.174 111.05q.559.52 1.139 1.013a31.737 31.737 0 0 0 20.649 7.576c.384 0 .771-.006 1.156-.02a32 32 0 0 0 20.688-55.391l-119.174-111.054a176.085 176.085 0 0 0 -28.471-223.36c-71-66.162-182.587-62.225-248.747 8.773a176 176 0 0 0 8.774 248.752zm376.71 88.6a16 16 0 0 1 -21.816 23.411l-81.938-76.361 21.815-23.411zm-93.644-87.269-21.816 23.412-23.941-22.31q5.928-5.32 11.438-11.212t10.378-12.2zm-280.135-239.175c60.148-64.544 161.589-68.122 226.134-7.976a160.059 160.059 0 0 1 22.589 208.006c-.05.065-.094.134-.141.2a162.384 162.384 0 0 1 -31.458 33.726l-.04.034a160.014 160.014 0 0 1 -217.084-233.99z"></path><path d="m88 218.935h17.013a32 32 0 0 0 61.974 0h74.026a32 32 0 0 0 62.423-2.046l19.094-6.365a8 8 0 0 0 5.47-7.589v-24a32.053 32.053 0 0 0 -26.849-31.586l-8.191-16.384a28.843 28.843 0 0 0 -25.939-16.03h-80.521a29.136 29.136 0 0 0 -23.2 11.6l-15.662 20.882-39.607 4.951a32.05 32.05 0 0 0 -28.031 31.753v26.814a8 8 0 0 0 8 8zm48 8a16 16 0 1 1 16-16 16.019 16.019 0 0 1 -16 16zm136 0a16 16 0 1 1 16-16 16.019 16.019 0 0 1 -16 16zm-24-96h19.021a12.927 12.927 0 0 1 11.628 7.186l4.407 8.814h-35.056zm-71.9 5.2a13.058 13.058 0 0 1 10.4-5.2h45.5v16h-64zm-80.1 47.986a16.025 16.025 0 0 1 14.016-15.876l42.48-5.31h143.504a16.018 16.018 0 0 1 16 16v18.233l-9.78 3.261a32 32 0 0 0 -61.207 2.506h-74.026a32 32 0 0 0 -61.974 0h-9.013z"></path><path d="m296 258.935h-176a8 8 0 0 0 -8 8v32a8 8 0 0 0 8 8h176a8 8 0 0 0 8-8v-32a8 8 0 0 0 -8-8zm-40 32h-128v-16h128zm32 0h-16v-16h16z"></path></g></svg>
                  <h1>Find Car</h1>
                </div>
                <svg xmlns="//www.w3.org/2000/svg" id="svg10654" height="40" viewBox="0 0 6.3499999 6.3500002" width="40" fill="white"><g id="layer1" transform="translate(0 -290.65)"><path id="path9429" d="m2.2580394 291.96502a.26460982.26460982 0 0 0 -.1741496.46871l1.6190225 1.38699-1.6190225 1.38648a.26460982.26460982 0 1 0 .3436483.40049l1.8536335-1.58595a.26460982.26460982 0 0 0 0-.40256l-1.8536335-1.5875a.26460982.26460982 0 0 0 -.1694987-.0667z"></path></g></svg>
                <div className="text-white flex h-12 w-[20%]">
                  <svg xmlns="//www.w3.org/2000/svg" viewBox="0 0 64 64" width="80" height="80" fill="white"><g id="car"><path d="M32,55h0a1,1,0,0,1-.8945-.5527L25.7607,43.7661a2.8958,2.8958,0,0,0-1.4062-1.3667,19.0022,19.0022,0,1,1,15.3047-.0063,2.9214,2.9214,0,0,0-1.419,1.3725L32.8945,54.4478A1.0009,1.0009,0,0,1,32,55ZM31.9766,7.9985A16.8064,16.8064,0,0,0,20.666,12.33a17.005,17.005,0,0,0,4.4951,28.24A4.9056,4.9056,0,0,1,27.55,42.8716L32,51.7656l4.4512-8.895a4.9281,4.9281,0,0,1,2.4-2.3071A17.0056,17.0056,0,0,0,33.9482,8.1079,17.9157,17.9157,0,0,0,31.9766,7.9985Z"></path><path d="M32,39A14,14,0,1,1,46,25,14.0158,14.0158,0,0,1,32,39Zm0-26A12,12,0,1,0,44,25,12.0134,12.0134,0,0,0,32,13Z"></path><path d="M32,59c-8.9932,0-26-1.3584-26-6.5,0-4.2554,12.12-6.1343,22.5-6.45a1.0242,1.0242,0,0,1,1.03.9692,1.0007,1.0007,0,0,1-.97,1.03C14.8711,48.4658,8,51.127,8,52.5,8,54.0273,16.4707,57,32,57s24-2.9727,24-4.5c0-1.373-6.8672-4.0342-20.55-4.4507a1,1,0,0,1,.0293-2l.0312.0005C45.8857,46.3662,58,48.2446,58,52.5,58,57.6416,40.9932,59,32,59Z"></path><path d="M38,30H26a2.0023,2.0023,0,0,1-2-2V24a2.0023,2.0023,0,0,1,2-2H38a2.0023,2.0023,0,0,1,2,2v4A2.0023,2.0023,0,0,1,38,30ZM26,24v4H38.001L38,24Z"></path><path d="M37,24H27a1,1,0,0,1-.9863-1.1646l.5547-3.3286A2.9918,2.9918,0,0,1,29.5273,17h4.9454a2.9918,2.9918,0,0,1,2.9589,2.5063l.5547,3.3291A1,1,0,0,1,37,24Zm-8.8193-2h7.6386l-.36-2.1641A.9977.9977,0,0,0,34.4727,19H29.5273a.9977.9977,0,0,0-.9863.8364Z"></path><path d="M25.8555,23.854a.9989.9989,0,0,1-.9092-.5815L24.3594,22H24a1,1,0,0,1,0-2h1a1,1,0,0,1,.9082.5815l.8545,1.854a1,1,0,0,1-.9072,1.4185Z"></path><path d="M38.1445,23.854a1,1,0,0,1-.9072-1.4185l.8545-1.854A1,1,0,0,1,39,20h1a1,1,0,0,1,0,2h-.3594l-.5869,1.2725A1,1,0,0,1,38.1445,23.854Z"></path><circle cx="28" cy="26" r="1"></circle><circle cx="36" cy="26" r="1"></circle><path d="M28.75,33h-1.5A2.2528,2.2528,0,0,1,25,30.75V29a1,1,0,0,1,1-1h4a1,1,0,0,1,1,1v1.75A2.2528,2.2528,0,0,1,28.75,33ZM27,30v.75a.25.25,0,0,0,.25.25h1.5a.25.25,0,0,0,.25-.25V30Z"></path><path d="M36.75,33h-1.5A2.2528,2.2528,0,0,1,33,30.75V29a1,1,0,0,1,1-1h4a1,1,0,0,1,1,1v1.75A2.2528,2.2528,0,0,1,36.75,33ZM35,30v.75a.25.25,0,0,0,.25.25h1.5a.25.25,0,0,0,.25-.25V30Z"></path><path d="M33,27H31a1,1,0,0,1,0-2h2a1,1,0,0,1,0,2Z"></path></g></svg>
                  <h1> Select location</h1>
                </div>
                <svg xmlns="//www.w3.org/2000/svg" id="svg10654" height="40" viewBox="0 0 6.3499999 6.3500002" width="40" fill="white"><g id="layer1" transform="translate(0 -290.65)"><path id="path9429" d="m2.2580394 291.96502a.26460982.26460982 0 0 0 -.1741496.46871l1.6190225 1.38699-1.6190225 1.38648a.26460982.26460982 0 1 0 .3436483.40049l1.8536335-1.58595a.26460982.26460982 0 0 0 0-.40256l-1.8536335-1.5875a.26460982.26460982 0 0 0 -.1694987-.0667z"></path></g></svg>
                <div className="text-white flex h-12 w-[20%]">
                  <svg xmlns="//www.w3.org/2000/svg" id="Layer_1" height="80" viewBox="0 0 124 124" width="100" fill="white"><path d="m118.052 26.953-88.813-15.842c-3.892-.7-7.673 2.023-8.348 5.894l-5.72 32.814h-8.171c-3.86 0-7 3.141-7 7v49.18c0 3.859 3.14 7 7 7h90.587c3.86 0 7-3.141 7-7v-17.293c2.595.463 5.1 1.009 7.499-.426 1.8-1.077 3.091-2.934 3.452-5.003l8.352-47.916c.687-3.941-1.932-7.713-5.838-8.408zm-93.22-9.261c.3-1.719 1.968-2.954 3.705-2.644l88.813 15.842c1.743.311 2.909 2.008 2.6 3.783l-1.378 7.91-95.122-16.966zm75.755 88.307c0 1.654-1.346 3-3 3h-90.587c-1.654 0-3-1.346-3-3v-49.18c0-1.654 1.346-3 3-3h90.587c1.654 0 3 1.346 3 3zm11.011-23.409c-.622 3.557-4.572 2.488-7.011 2.053v-27.824c0-3.859-3.14-7-7-7h-78.355l3.531-20.262 5.794 1.033 89.327 15.933z"></path><path d="m47.119 101.003h-11.5c-1.104 0-2-.896-2-2s.896-2 2-2h11.5c1.104 0 2 .896 2 2s-.895 2-2 2z"></path><path d="m25.271 101.003h-11.5c-1.104 0-2-.896-2-2s.896-2 2-2h11.5c1.104 0 2 .896 2 2s-.896 2-2 2z"></path><path d="m68.967 101.003h-11.5c-1.104 0-2-.896-2-2s.896-2 2-2h11.5c1.104 0 2 .896 2 2s-.895 2-2 2z"></path><path d="m90.816 101.003h-11.5c-1.104 0-2-.896-2-2s.896-2 2-2h11.5c1.104 0 2 .896 2 2s-.896 2-2 2z"></path><path d="m30.438 90.627h-14.486c-2.757 0-5-2.243-5-5v-5.744c0-2.757 2.243-5 5-5h14.486c2.757 0 5 2.243 5 5v5.744c0 2.756-2.244 5-5 5zm-14.486-11.745c-.551 0-1 .448-1 1v5.744c0 .552.449 1 1 1h14.486c.551 0 1-.448 1-1v-5.744c0-.552-.449-1-1-1z"></path></svg>
                  <h1>Place your Order</h1>
                </div>
              </div>
            </div>

          </div>

        </div>
      }
    </div>
  );
};

export default Home;