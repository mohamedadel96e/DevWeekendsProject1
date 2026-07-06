import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const DoctorProfile = () => {

    const { dToken, profileData, setProfileData, getProfileData } = useContext(DoctorContext)
    const { currency, backendUrl } = useContext(AppContext)
    const [isEdit, setIsEdit] = useState(false)
    const [image, setImage] = useState(false)

    const updateProfile = async () => {

        try {

            const formData = new FormData()
            formData.append('address', JSON.stringify(profileData.address))
            formData.append('fees', profileData.fees)
            formData.append('about', profileData.about)
            formData.append('available', profileData.available)
            image && formData.append('image', image)

            const { data } = await axios.post(backendUrl + '/api/doctor/update-profile', formData, { headers: { dToken } })

            if (data.success) {
                toast.success(data.message)
                setIsEdit(false)
                setImage(false)
                getProfileData()
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }

    }

    useEffect(() => {
        if (dToken) {
            getProfileData()
        }
    }, [dToken])

    return profileData && (
        <div>
            <div className='m-5'>
                <div className='flex flex-col bg-white/60 backdrop-blur-xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-3xl p-8 md:p-12 w-full'>
                    
                    {/* Photo Section */}
                    <div className='w-full flex justify-center mb-10'>
                        <div className='w-56 h-56 md:w-64 md:h-64 flex-shrink-0'>
                            {isEdit ? (
                                <label htmlFor='image'>
                                    <div className='rounded-[2rem] overflow-hidden shadow-2xl relative cursor-pointer group w-full h-full'>
                                        <img className='bg-primary/80 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105' src={image ? URL.createObjectURL(image) : profileData.image} alt="" />
                                        <div className='absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                                            <p className='text-white font-medium text-sm bg-black/30 px-5 py-2 rounded-full backdrop-blur-md shadow-md'>Upload Photo</p>
                                        </div>
                                    </div>
                                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
                                </label>
                            ) : (
                                <div className='rounded-[2rem] overflow-hidden shadow-2xl w-full h-full'>
                                    <img className='bg-primary/80 w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500' src={profileData.image} alt="" />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Details Section in Two Columns */}
                    <div className='w-full grid grid-cols-1 lg:grid-cols-2 gap-12'>
                        
                        {/* Left Column: Name, Speciality, About */}
                        <div className='flex flex-col justify-start'>
                            <p className='flex items-center gap-2 text-4xl font-bold text-gray-800'>{profileData.name}</p>
                            <div className='flex items-center gap-3 mt-3 text-gray-600 font-medium'>
                                <p className='text-lg'>{profileData.degree} - {profileData.speciality}</p>
                                <button className='py-1 px-3 border border-gray-300 text-xs rounded-full bg-gray-50 shadow-sm'>{profileData.experience}</button>
                            </div>

                            <div className='mt-10 w-full'>
                                <p className='flex items-center gap-2 text-lg font-bold text-[#262626] mb-3'>About</p>
                                <div className='text-base text-gray-600 w-full'>
                                    {
                                        isEdit
                                            ? <textarea onChange={(e) => setProfileData(prev => ({ ...prev, about: e.target.value }))} type='text' className='w-full border border-gray-300 rounded-xl p-4 focus:outline-primary focus:ring-2 focus:ring-primary/50 shadow-sm transition-shadow' rows={6} value={profileData.about} />
                                            : <p className='leading-relaxed'>{profileData.about}</p>
                                    }
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Fees, Address, Available */}
                        <div className='flex flex-col justify-start'>
                            <div className='w-full'>
                                <p className='text-gray-600 font-semibold flex flex-col gap-2'>
                                    Appointment fee: 
                                    <span className='text-gray-800 text-xl flex items-center w-fit gap-1 bg-gray-50 px-4 py-2 rounded-xl border border-gray-200 mt-1'>
                                        {currency} 
                                        {isEdit ? <input type='number' className='border border-gray-300 rounded-md px-2 py-1 focus:outline-primary shadow-sm w-24 bg-white' onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))} value={profileData.fees} /> : profileData.fees}
                                    </span>
                                </p>
                            </div>

                            <div className='flex flex-col gap-3 py-6 mt-6 border-t border-gray-200 w-full'>
                                <p className='font-semibold text-gray-600'>Address:</p>
                                <div className='text-base text-gray-600 flex flex-col gap-4'>
                                    {isEdit ? <input type='text' className='border border-gray-300 rounded-xl px-4 py-2 focus:outline-primary shadow-sm w-full' onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={profileData.address.line1} /> : <p>{profileData.address.line1}</p>}
                                    {isEdit ? <input type='text' className='border border-gray-300 rounded-xl px-4 py-2 focus:outline-primary shadow-sm w-full' onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={profileData.address.line2} /> : <p>{profileData.address.line2}</p>}
                                </div>
                            </div>

                            <div className='flex items-center gap-3 pt-4 border-t border-gray-200 w-full'>
                                <input type="checkbox" id="available-checkbox" className='w-5 h-5 cursor-pointer accent-primary' onChange={() => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))} checked={profileData.available} />
                                <label htmlFor="available-checkbox" className='font-bold text-gray-700 cursor-pointer text-lg'>Available</label>
                            </div>
                        </div>

                    </div>

                    <div className='mt-12 w-full flex justify-center'>
                        {
                            isEdit
                                ? <button onClick={updateProfile} className='px-12 py-3 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 hover:shadow-lg transition-all shadow-md'>Save Changes</button>
                                : <button onClick={() => setIsEdit(prev => !prev)} className='px-12 py-3 bg-white border border-primary text-primary font-semibold rounded-full hover:bg-primary hover:text-white hover:shadow-lg transition-all shadow-sm'>Edit Profile</button>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DoctorProfile