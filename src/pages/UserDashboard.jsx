import { useSelector } from 'react-redux';
import React, { useState, useEffect } from "react";
import axios from 'axios';

const UserDashboard = () => {
  const [selectedTab, setSelectedTab] = useState("general");
  const { user } = useSelector((state) => state.Auth);
  const [donations, setDonations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false); // loading state
  const[adoptions,setAdoptions] = useState([])
  const[currentPageAdoption,setCurrentPageAdoption] = useState(1);
  const[totalPagesAdoptions,setTotalPagesAdoptions] = useState(1);
  const [loadingAdoption, setLoadingAdoption] = useState(false); // loading state
  console.log(selectedTab)
  const fetchDonations = async (page = 1) => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/api/payment/user/${user._id}/donations?page=${page}`);
      setDonations(data?.donations || []);
      setTotalPages(data?.totalPages || 1);
    } catch (error) {
      console.error(error.message);
      setDonations([]);
      alert("Failed to fetch donations. Please try again later.");// User feedback 
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  };
  const fetchAdoption = async (page = 1) => {
    console.log('enter')
    setLoadingAdoption(true);
    try {
      const { data } = await axios.get(`/api/payment/user/${user._id}/adoptions?page=${page}`);
      console.log(data)
      setAdoptions(data?.donations || []);
      setTotalPagesAdoptions(data?.totalPagesAdoptions || 1);
    } catch (error) {
      console.error(error.message);
      setAdoptions([]);
      alert("Failed to fetch adoptions. Please try again later.");// User feedback 
    } finally {
      setLoadingAdoption(false); // Set loading to false after fetching data
    }
  };

  useEffect(() => {
    if (selectedTab === "donation") {
      fetchDonations(currentPage);
    }
  }, [selectedTab, currentPage]);
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };



  useEffect(() => {
    if (selectedTab === "adoptions") {
      fetchAdoption(currentPageAdoption);
    }
  }, [selectedTab, currentPageAdoption]);
  const handleNextPageAdoption = () => {
    if (currentPageAdoption < totalPagesAdoptions) {
      setCurrentPageAdoption(currentPageAdoption + 1);
    }
  };

  const handlePreviousPageAdoption = () => {
    if (currentPageAdoption > 1) {
      setCurrentPageAdoption(currentPageAdoption - 1);
    }
  };

  return (
    <div className="container mx-auto p-6 sm:p-4 my-10 text-black">
      <h2 className="font-bold py-3 mb-4 mt-10">User Dashboard</h2>
      <div className="bg-white shadow-lg overflow-hidden">

        {/* dropdown */}
        <div className="block md:hidden mb-6">
          <select
            className="w-full p-2 border rounded-md"
            value={selectedTab}
            onChange={(e) => setSelectedTab(e.target.value)}
          >
            <option value="general">General</option>
            <option value="donation">Donations</option>
            <option value="Adoptions">Adoptions</option>
          </select>
        </div>

        {/* Sidebar  */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-12">
          <div className="col-span-2 w-full md:w-auto">
            <div className="list-group flex flex-col space-y-12 bg-gray-100 rounded-md">
              <button
                className={`block p-4 sm:p-2 cursor-pointer ${selectedTab === "general" ? "font-bold text-gray-900" : ""}`}
                onClick={() => setSelectedTab("general")}
              >
                General
              </button>
              <button
                className={`block p-4 sm:p-2 cursor-pointer ${selectedTab === "donation" ? "font-bold text-gray-900" : ""}`}
                onClick={() => setSelectedTab("donation")}
              >
                Adoption
              </button>
              <button
                className={`block p-4 sm:p-2 cursor-pointer ${selectedTab === "adoptions" ? "font-bold text-gray-900" : ""}`}
                onClick={() => setSelectedTab("adoptions")}
              >
                Donation
              </button>
            </div>
          </div>


          <div className="col-span-9 mx-0 md:mx-10 w-full">
            {selectedTab === "general" && (
              <div id="account-general">
                <div className="mt-4">
                  <label className="block text-sm font-bold mb-3">Username</label>
                  <h2 className='mb-2'>{user.name + "@321"}</h2>
                  <label className="block text-sm font-bold mb-3">Name</label>
                  <h2 className='mb-2'>{user.name}</h2>
                  <label className="block text-sm font-bold mb-2">E-mail</label>
                  <h2>{user.email}</h2>
                  <div className="text-green-600 bg-green-100 p-2 mt-2">
                    Your email is confirmed. Please check your inbox.
                  </div>
                </div>
                <div className="text-right p-4 bg-gray-100">
                  <button className="btn bg-green-700 hover:bg-green-800 text-white p-2 rounded">Save changes</button>
                  <button className="btn bg-gray-500 text-white p-2 rounded ml-2">Cancel</button>
                </div>
              </div>
            )}

            {selectedTab === "donation" && (
              <div id="account-donations">
                <h2 className="text-xl font-semibold mb-4">Previous Adoptions</h2>
                {loading ? (
                  <p>Loading donations...</p>
                ) : donations.length === 0 ? (
                  <p>No donations found.</p>
                ) : (
                  donations.map((donation, i) => (
                    <div key={i} className="p-4 border rounded-md shadow-sm flex flex-col sm:flex-row items-center space-x-4 bg-gray-50">
                      <div className="w-full sm:w-24 h-24">
                        {donation.cover_photo__c ? (
                          <img
                            src={donation.cover_photo__c}
                            alt={donation.name}
                            className="w-full h-full object-cover rounded-md"
                          />
                        ) : (
                          <div className="bg-gray-300 w-full h-full rounded-md flex items-center justify-center text-gray-500">
                            No Image
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg">{donation.name}</h3>
                        <p className="text-sm">Order ID: {donation.order_id}</p>
                        <p className="text-sm">Amount: ₹{donation.amount}</p>
                        <p className="text-sm">Status: {donation.status}</p>
                        <p className="text-sm">Date: {new Date(donation.created_at).toLocaleString()}</p>
                      </div>
                    </div>
                  ))
                )}
                <div className="flex flex-col sm:flex-row justify-between items-center mt-6">
                  <button
                    className="px-4 py-2 w-full sm:w-auto bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:opacity-50"
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  <span>
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    className="px-4 py-2 w-full sm:w-auto bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:opacity-50"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {selectedTab === "adoptions" && (
               <div id="Adoptions">
               <h2 className="text-xl font-semibold mb-4">Previous Donations</h2>
               {loadingAdoption ? (
                 <p>Loading Adoption...</p>
               ) : adoptions.length === 0 ? (
                 <p>No Adoption found.</p>
               ) : (
                 adoptions.map((adoption, i) => (
                   <div key={i} className="p-4 border rounded-md shadow-sm flex flex-col sm:flex-row items-center space-x-4 bg-gray-50">
                     <div className="flex-1">
                       <h3 className="font-bold text-lg">Amount : ₹{adoption.amount}</h3>
                       <p className="text-sm">Order ID: {adoption.order_id}</p>
                       <p className="text-sm">Currency: {adoption.currency}</p>
                       <p className="text-sm">Status: {adoption.status}</p>
                       <p className="text-sm">Date: {new Date(adoption.created_at).toLocaleString()}</p>
                     </div>
                   </div>
                 ))
               )}
               <div className="flex flex-col sm:flex-row justify-between items-center mt-6">
                 <button
                   className="px-4 py-2 w-full sm:w-auto bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:opacity-50"
                   onClick={handlePreviousPageAdoption}
                   disabled={currentPageAdoption === 1}
                 >
                   Previous
                 </button>
                 <span>
                   Page {currentPageAdoption} of {totalPagesAdoptions}
                 </span>
                 <button
                   className="px-4 py-2 w-full sm:w-auto bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:opacity-50"
                   onClick={handleNextPageAdoption}
                   disabled={currentPageAdoption === totalPagesAdoptions}
                 >
                   Next
                 </button>
               </div>
             </div>
            )}
          </div>
        </div>
      </div>
      {/* small devices */}
      <div className="md:hidden">
        {selectedTab === "general" && (
          <div id="account-general">
            <div className="mt-4">
              <label className="block text-sm font-bold mb-3">Username</label>
              <h2 className='mb-2'>{user.name + "@321"}</h2>
              <label className="block text-sm font-bold mb-3">Name</label>
              <h2 className='mb-2'>{user.name}</h2>
              <label className="block text-sm font-bold mb-2">E-mail</label>
              <h2>{user.email}</h2>
              <div className="text-green-600 bg-green-100 p-2 mt-2">
                Your email is confirmed. Please check your inbox.
              </div>
            </div>
            <div className="text-right p-4 bg-gray-100">
              <button className="btn bg-green-700 hover:bg-green-800 text-white p-2 rounded">Save changes</button>
              <button className="btn bg-gray-500 text-white p-2 rounded ml-2">Cancel</button>
            </div>
          </div>
        )}

        {selectedTab === "donation" && (
          <div id="account-donations">
            <h2 className="text-xl font-semibold mb-4">Previous Donations</h2>
            {loading ? (
              <p>Loading donations...</p>
            ) : donations.length === 0 ? (
              <p>No donations found.</p>
            ) : (
              donations.map((donation, i) => (
                <div key={i} className="p-4 border rounded-md shadow-sm flex flex-col sm:flex-row items-center space-x-4 bg-gray-50">
                  <div className="w-full sm:w-24 h-24">
                    {donation.cover_photo__c ? (
                      <img
                        src={donation.cover_photo__c}
                        alt={donation.name}
                        className="w-full h-full object-cover rounded-md"
                      />
                    ) : (
                      <div className="bg-gray-300 w-full h-full rounded-md flex items-center justify-center text-gray-500">
                        No Image
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{donation.name}</h3>
                    <p className="text-sm">Order ID: {donation.order_id}</p>
                    <p className="text-sm">Amount: ₹{donation.amount}</p>
                    <p className="text-sm">Status: {donation.status}</p>
                    <p className="text-sm">Date: {new Date(donation.created_at).toLocaleString()}</p>
                  </div>
                </div>
              ))
            )}
            <div className="flex flex-col sm:flex-row justify-between items-center mt-6">
              <button
                className="px-4 py-2 w-full sm:w-auto bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:opacity-50"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="px-4 py-2 w-full sm:w-auto bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:opacity-50"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {selectedTab === "Adoptions" && (
          <div id="Adoptions">
            <h2>Adoptions</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
